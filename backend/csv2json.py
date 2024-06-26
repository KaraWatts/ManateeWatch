import csv
from datetime import datetime
import os
import django

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'manateewatch_proj.settings')

# Setup Django
django.setup()


# Now import Django models
from map_app.models import Sighting_Data  
from profile_app.models import User_Profile

def import_sightings(file_path):
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:

            num_adults = int(row['NUMBER_ADULT_MANATEES']) if row['NUMBER_ADULT_MANATEES'] != 'Null' else None
            num_calf = int(row['NUMBER_CALF_MANATEES']) if row['NUMBER_CALF_MANATEES'] != 'Null' else None
            user = User_Profile.objects.get(display_name="Data Source")

            Sighting_Data.objects.create(
                lat=row['lat'],
                lon=row['lon'],
                user=user,
                data_source=row['data_source'],
                num_Adults=num_adults,
                num_Calf=num_calf,
                activity=row['ACTIVITY'],
                comments=row['COMMENTS'],
                sighting_date=row['SIGHTINGDATE'],
                created_date=row['DATECREATED'],
                image=row['Image']
            )

if __name__ == '__main__':
    csv_file_path = '/Users/kWatts/Repos/ManateeWatch/backend/map_app/fixtures/Manatee_Sightings.csv'  # Replace with your actual file path
    import_sightings(csv_file_path)
