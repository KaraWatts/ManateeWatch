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
            #  # Parse and format date strings
            # try:
            #     sighting_date = datetime.strptime(row['SIGHTINGDATE'], '%Y-%m-%dT%H:%M:%S%z')
            #     created_date = datetime.strptime(row['DATECREATED'], '%Y-%m-%dT%H:%M:%S%z')
            # except:
            #     sighting_date = datetime.strptime(row['SIGHTINGDATE'], '%Y-%m-%d %H:%M:%S %Z')
            #     created_date = datetime.strptime(row['DATECREATED'], '%Y-%m-%d %H:%M:%S %Z')

            # Convert "null" strings to None
            num_adults = int(row['NUMBER_ADULT_MANATEES']) if row['NUMBER_ADULT_MANATEES'] != 'Null' else None
            num_calf = int(row['NUMBER_CALF_MANATEES']) if row['NUMBER_CALF_MANATEES'] != 'Null' else None


            Sighting_Data.objects.create(
                lat=row['lat'],
                lon=row['lon'],
                User_ID=row['User_ID'],
                Num_Adults=num_adults,
                Num_Calf=num_calf,
                Activity=row['ACTIVITY'],
                Comments=row['COMMENTS'],
                Sighting_date=row['SIGHTINGDATE'],
                Created_date=row['DATECREATED'],
                Image=row['Image']
            )

if __name__ == '__main__':
    csv_file_path = '/Users/kWatts/Repos/ManateeWatch/backend/map_app/fixtures/Manatee_Sightings.csv'  # Replace with your actual file path
    import_sightings(csv_file_path)
