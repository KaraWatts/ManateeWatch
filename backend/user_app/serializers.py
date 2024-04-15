from rest_framework import serializers
from .models import Client
from profile_app.serializers import ProfileSerializer

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Client
        fields = "__all__"


    