from rest_framework import serializers
from .models import Sighting_Data

class SightingSerializer(serializers.ModelSerializer):
    Sighting_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    Created_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    class Meta:
        model = Sighting_Data
        fields = "__all__"