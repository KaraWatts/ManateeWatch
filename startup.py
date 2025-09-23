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
    
    # Change to backend directory
    os.chdir(os.path.join(os.path.dirname(__file__), 'backend'))

    # Install requirements
    run("pip install -r requirements.txt")
    
    # Run migrations
    run("python manage.py migrate")
    
    # Prompt to create superuser
    create_super = input("Do you want to create a Django superuser? (y/n): ").strip().lower()
    if create_super == "y":
        run("python manage.py createsuperuser", check=False)
    
    # Start the server
    print("\nStarting Django development server...")
    run("python manage.py runserver", check=False)

if __name__ == '__main__':
    main()
