from rest_framework import serializers
from .models import User_Profile
from map_app.serializers import ProfileSightingSerializer

class ProfileSerializer(serializers.ModelSerializer):
    sightings = ProfileSightingSerializer(many=True)
    num_sightings = serializers.SerializerMethodField()
    ranking = serializers.SerializerMethodField()

    class Meta:
        model = User_Profile
        fields = ["display_name", "id", "profile_picture", "sightings", "num_sightings", "ranking"]

    def get_num_sightings(self, instance):
        total_count = len(instance.sightings.all())
        return total_count
    
    def get_ranking(self, instance):
        num_sightings = self.get_num_sightings(instance)
        match num_sightings:
            case n if n <= 10:
                return "Baby Manatee"
            case n if n <= 25:
                return "Manatee Scout"
            case n if n <= 50:
                return "Manatee Master Tracker"
            case n if n <= 100:
                return "Manatee Whisperer"
            case _:
                return "Manatee Magnet"

class UserResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = User_Profile
        fields = ['display_name']
   