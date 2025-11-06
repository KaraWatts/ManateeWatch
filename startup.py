import os
import subprocess
import sys
import tempfile

def run(cmd, check=True):
    print(f"\n>>> {cmd}")
    result = subprocess.run(cmd, shell=True)
    if check and result.returncode != 0:
        print(f"Command failed: {cmd}")
        sys.exit(result.returncode)

def main():
    # Check if in a virtual environment
    if sys.prefix == sys.base_prefix:
        print("WARNING: You are not in a virtual environment. Activate it before running this script.")
    
    # --- FRONTEND SECTION ---
    # Ask which backend to use
    print("\nWhich backend environment should the frontend use?")
    print("1) Local backend (http://localhost:8000)")
    print("2) Production backend (https://manateewatch.com)")
    backend_choice = input("Enter 1 or 2: ").strip()
    if backend_choice == "2":
        api_url = "https://manateewatch.com"
    else:
        api_url = "http://localhost:8000"

    # If local backend is chosen, start backend first
    if backend_choice != "2":
        # Change to backend directory
        os.chdir(os.path.join(os.path.dirname(__file__), 'backend'))

        # Install requirements
        run("pip install -r requirements.txt")

        # Run migrations
        run("python manage.py migrate")


        # Check if database has data
        check_db_cmd = 'python manage.py shell -c "from map_app.models import Sighting_Data; print(Sighting_Data.objects.exists())"'
        result = subprocess.run(check_db_cmd, shell=True, capture_output=True, text=True)
        
        if result.returncode == 0 and "True" in result.stdout:
            print("\nDatabase has data. Do you want to reset and create fresh test data?")
            reset_choice = input("Enter y to reset, or n to keep existing data: ").strip().lower()
            if reset_choice == "y":
                print("Flushing existing data...")
                run('python manage.py flush --noinput')
                print("Creating fresh test data...")
                run('python manage.py create_test_data --users 5 --sightings 20')
        else:
            print("\nDatabase is empty. Creating test data...")
            run('python manage.py create_test_data --users 5 --sightings 20')

        # Prompt to create additional superuser
        create_super = input("Do you want to create an additional Django superuser? (y/n): ").strip().lower()
        if create_super == "y":
            run("python manage.py createsuperuser", check=False)

        # Start the server (in a new terminal tab)
        print("\nOpening a new terminal window/tab to run the Django backend server...")
        backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
        
        # Create a temporary script file to avoid escaping issues
        with tempfile.NamedTemporaryFile(mode='w', suffix='.sh', delete=False) as f:
            f.write(f"""#!/bin/bash
cd "{backend_dir}"
python manage.py runserver
""")
            backend_script = f.name
        
        # Make script executable
        os.chmod(backend_script, 0o755)
        
        # Use a different approach - execute the script directly in a new terminal
        applescript = f'''
        tell application "Terminal"
            do script "/bin/bash {backend_script}"
        end tell
        '''
        
        with tempfile.NamedTemporaryFile(mode='w', suffix='.scpt', delete=False) as f:
            f.write(applescript)
            applescript_file = f.name
        
        subprocess.Popen(['osascript', applescript_file])
        print(f"\nBackend starting in new terminal (script: {backend_script})")

    # Path to frontend directory
    frontend_dir = os.path.join(os.path.dirname(__file__), 'frontend')
    
    print(f"\nOpening a new terminal window/tab to run the frontend with REACT_APP_API_URL={api_url} ...")
    
    # Create a temporary script file to avoid escaping issues
    with tempfile.NamedTemporaryFile(mode='w', suffix='.sh', delete=False) as f:
        f.write(f"""#!/bin/bash
cd "{frontend_dir}"
export REACT_APP_API_URL="{api_url}"
npm start
""")
        frontend_script = f.name
    
    # Make script executable
    os.chmod(frontend_script, 0o755)
    
    # Use the same approach for frontend
    applescript = f'''
    tell application "Terminal"
        do script "/bin/bash {frontend_script}"
    end tell
    '''
    
    with tempfile.NamedTemporaryFile(mode='w', suffix='.scpt', delete=False) as f:
        f.write(applescript)
        applescript_file = f.name
    
    subprocess.Popen(['osascript', applescript_file])
    print(f"\nFrontend starting in new terminal (script: {frontend_script})")

if __name__ == '__main__':
    main()
