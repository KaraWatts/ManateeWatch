import csv
from datetime import datetime
from django.utils import timezone
import os
import sys
import django

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'manateewatch_proj.settings')

# Setup Django
django.setup()


# Now import Django models
from map_app.models import Sighting_Data  # Replace 'myapp' with your actual app name


def import_sightings(file_path):
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
             # Parse and format date strings
            sighting_date = datetime.strptime(row['SIGHTINGDATE'], '%Y-%m-%dT%H:%M:%S%z')
            created_date = datetime.strptime(row['DATECREATED'], '%Y-%m-%dT%H:%M:%S%z')



            Sighting_Data.objects.create(
                lat=row['lat'],
                lon=row['lon'],
                User_ID=row['User_ID'],
                Num_Adults=row['NUMBER_ADULT_MANATEES'],
                Num_Calf=row['NUMBER_CALF_MANATEES'],
                Activity=row['ACTIVITY'],
                Comments=row['COMMENTS'],
                Sighting_date=sighting_date.strftime('%Y-%m-%d %H:%M:%S'),  # Format to Django's expected format
                Created_date=created_date.strftime('%Y-%m-%d %H:%M:%S'),  # Format to Django's expected format
                Image=row['Image']
            )

if __name__ == '__main__':
    csv_file_path = '/Users/kWatts/Repos/ManateeWatch/backend/map_app/fixtures/Manatee_Sightings.csv'  # Replace with your actual file path
    import_sightings(csv_file_path)
