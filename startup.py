import os
import subprocess
import sys

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


        # Check if database exists by trying to query the User model
        check_db_cmd = 'python manage.py shell -c "from django.contrib.auth import get_user_model; print(get_user_model().objects.exists())"'
        result = subprocess.run(check_db_cmd, shell=True)
        if result.returncode != 0:
            print("\nDatabase does not exist or is not initialized. Loading data fixture...")
            run(f"python manage.py loaddata all_data.json")
        else:
            print("\nDatabase exists. Starting fresh! Flushing all data and loading data fixture...")
            # Flush all data from the database (including users)
            run('python manage.py flush --noinput')
            run(f"python manage.py loaddata all_data.json")

        # Prompt to create superuser
        create_super = input("Do you want to create a Django superuser? (y/n): ").strip().lower()
        if create_super == "y":
            run("python manage.py createsuperuser", check=False)

        # Start the server (in a new terminal tab)
        print("\nOpening a new terminal window/tab to run the Django backend server...")
        backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
        backend_command = f'cd \"{backend_dir}\" && python manage.py runserver'
        backend_command_escaped = backend_command.replace('"', '\\"')
        osa_backend = f'osascript -e \'tell application "Terminal" to do script "{backend_command_escaped}"\''
        subprocess.Popen(osa_backend, shell=True)
        print("\nBackend should be starting in a new Terminal window/tab.")

    # Path to frontend directory
    frontend_dir = os.path.join(os.path.dirname(__file__), 'frontend')
    # Command to run in new terminal
    command = f'cd \"{frontend_dir}\" && REACT_APP_API_URL=\"{api_url}\" npm start'
    command_escaped = command.replace('"', '\\"')

    print(f"\nOpening a new terminal window/tab to run the frontend with REACT_APP_API_URL={api_url} ...")

    # macOS: open new Terminal tab and run the command
    osa_command = f'osascript -e \'tell application "Terminal" to do script "{command_escaped}"\''
    subprocess.Popen(osa_command, shell=True)
    print("\nFrontend should be starting in a new Terminal window/tab.")

if __name__ == '__main__':
    main()
