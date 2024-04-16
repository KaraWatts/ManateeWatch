from rest_framework import serializers
from .models import Sighting_Data
from datetime import datetime, timedelta
from django.utils import timezone
from reactions_app.serializers import CommentSerializer


class SightingSerializer(serializers.ModelSerializer):
    sighting_date = serializers.SerializerMethodField()
    created_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    reactions = CommentSerializer(many=True)
    user = serializers.SerializerMethodField()

    class Meta:
        model = Sighting_Data
        fields = "__all__"

    def get_sighting_date(self, obj):
        # Assuming 'sighting_date' is the field containing the date in your model
        # Adjust to Eastern Time (ET)
        et_offset = timedelta(hours=-4)  # Eastern Time (ET) is UTC-4
        date_time_obj = obj.sighting_date + et_offset
        return date_time_obj.strftime("%Y-%m-%d %H:%M EST")

    def get_user(self, obj):
            return {
                    'user_id': obj.user.id,
                    'display_name': obj.user.display_name,
                    'profile_picture': obj.user.profile_picture,
                }


class NewSightingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sighting_Data
        fields = "__all__"

class ProfileSightingSerializer(serializers.ModelSerializer):

    sighting_date = serializers.SerializerMethodField()
    reactions = CommentSerializer(many=True)

    class Meta:
        model = Sighting_Data
        exclude = ["user", "created_date"]

    def get_sighting_date(self, obj):
        # Assuming 'sighting_date' is the field containing the date in your model
        # Adjust to Eastern Time (ET)
        et_offset = timedelta(hours=-4)  # Eastern Time (ET) is UTC-4
        date_time_obj = obj.sighting_date + et_offset
        return date_time_obj.strftime("%Y-%m-%d %H:%M EST")