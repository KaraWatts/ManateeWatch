from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from map_app.models import Sighting_Data
from profile_app.models import User_Profile
from reactions_app.models import Reactions
from decimal import Decimal
import random
from datetime import datetime, timedelta
from django.utils import timezone

User = get_user_model()

class Command(BaseCommand):
    help = 'Create sample test data for development'

    def add_arguments(self, parser):
        parser.add_argument(
            '--users',
            type=int,
            default=5,
            help='Number of users to create (default: 5)',
        )
        parser.add_argument(
            '--sightings',
            type=int,
            default=20,
            help='Number of sightings to create (default: 20)',
        )

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Creating test data...'))
        
        # Create test users (returns profiles)
        profiles = self.create_users(options['users'])
        
        # Create test sightings
        sightings = self.create_sightings(profiles, options['sightings'])
        
        # Create some comments
        self.create_comments(profiles, sightings)
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully created {len(profiles)} users, {len(sightings)} sightings, and sample comments'
            )
        )

    def create_users(self, count):
        users = []
        profiles = []
        
        # Create superuser if it doesn't exist
        if not User.objects.filter(email='admin@manateewatch.com').exists():
            admin = User.objects.create_superuser(
                email='admin@manateewatch.com',
                password='admin123'
            )
            admin_profile = User_Profile.objects.create(
                user=admin,
                display_name='Admin User'
            )
            users.append(admin)
            profiles.append(admin_profile)
            self.stdout.write(f'Created superuser: admin@manateewatch.com')

        # Create test users
        for i in range(count):
            email = f'user{i+1}@test.com'
            if not User.objects.filter(email=email).exists():
                user = User.objects.create_user(
                    email=email,
                    password='password123'
                )
                profile = User_Profile.objects.create(
                    user=user,
                    display_name=f'Test User {i+1}'
                )
                users.append(user)
                profiles.append(profile)
                self.stdout.write(f'Created user: {email}')
        
        return profiles  # Return profiles instead of users

    def create_sightings(self, profiles, count):
        sightings = []
        
        # Sample Florida coastal coordinates
        locations = [
            (28.0636, -80.5928),  # Brevard County
            (27.7676, -82.6403),  # Tampa Bay
            (25.7617, -80.1918),  # Miami
            (30.4383, -84.2807),  # Tallahassee area
            (29.6516, -82.3248),  # Gainesville area
        ]
        
        activities = [
            'Feeding', 'Swimming', 'Resting', 'Playing', 
            'Traveling', 'Socializing', 'Breathing'
        ]
        
        for i in range(count):
            location = random.choice(locations)
            profile = random.choice(profiles)
            
            # Random date within last 6 months
            days_ago = random.randint(1, 180)
            sighting_datetime = timezone.now() - timedelta(days=days_ago)
            
            # Use the actual field names from the model
            sighting = Sighting_Data.objects.create(
                user=profile,  # Use profile instead of user
                lat=Decimal(str(location[0] + random.uniform(-0.1, 0.1))),
                lon=Decimal(str(location[1] + random.uniform(-0.1, 0.1))),
                sighting_date=sighting_datetime,  # Now timezone-aware
                activity=random.choice(activities),
                num_Adults=random.randint(1, 3),
                num_Calf=random.randint(0, 2),
                comments=f'Sample manatee sighting #{i+1}. Spotted manatees {random.choice(activities).lower()}.',
                image=None,  # No image for test data
                data_source='Test Data'
            )
            sightings.append(sighting)
        
        self.stdout.write(f'Created {count} sightings')
        return sightings

    def create_comments(self, profiles, sightings):
        comment_texts = [
            "Great sighting! Thanks for sharing.",
            "I was there too! Amazing to see them up close.",
            "Beautiful creatures. Hope they stay safe.",
            "This location is known for manatee activity.",
            "Did you notify the wildlife authorities?",
            "Wonderful photo! What time of day was this?",
        ]
        
        # Add 1-3 comments to random sightings
        for sighting in random.sample(sightings, min(len(sightings), 10)):
            num_comments = random.randint(1, 3)
            for _ in range(num_comments):
                profile = random.choice(profiles)
                comment_text = random.choice(comment_texts)
                
                Reactions.objects.create(
                    user=profile,
                    sighting=sighting,
                    comment=comment_text,
                    date=timezone.now() - timedelta(hours=random.randint(1, 72))  # Random time within last 3 days
                )
        
        self.stdout.write('Created sample comments')