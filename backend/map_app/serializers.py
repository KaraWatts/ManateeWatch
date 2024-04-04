from rest_framework import serializers
from .models import Sighting_Data

class SightingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sighting_Data
        fields = "__all__"