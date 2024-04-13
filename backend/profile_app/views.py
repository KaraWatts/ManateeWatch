from django.shortcuts import get_object_or_404
from user_app.views import TokenReq
from rest_framework.views import APIView
from .models import User_Profile
from .serializers import ProfileSerializer
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_406_NOT_ACCEPTABLE,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from manateewatch_proj.settings import env
import requests
from django.http import JsonResponse

# Create your views here.
class ViewProfile(TokenReq):
    def get(self, request):
        user = request.user.id
        profile = get_object_or_404(User_Profile, id=user)
        ser_profile = ProfileSerializer(profile)
        return Response(ser_profile.data, status=HTTP_200_OK)

    def put(self, request):
        data = request.data.copy()
        user = request.user.id
        profile = get_object_or_404(User_Profile, id=user)
        edit_profile = ProfileSerializer(profile, data=data, partial=True)
        if edit_profile.is_valid():
            edit_profile.save()
            return Response(data, status=HTTP_201_CREATED)
        print(edit_profile.errors)
        return Response(edit_profile.errors, status=HTTP_400_BAD_REQUEST)