from rest_framework import serializers
from .models import Sighting_Data

class SightingSerializer(serializers.ModelSerializer):
    sighting_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    created_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    class Meta:
        model = Sighting_Data
        fields = "__all__"

class NewSightingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sighting_Data
        fields = "__all__"