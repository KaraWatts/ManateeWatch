from django.shortcuts import get_object_or_404
from user_app.views import TokenReq
from .models import User_Profile
from .serializers import ProfileSerializer
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from django.http import JsonResponse

# Create your views here.
class ViewProfile(TokenReq):
    '''allow users to view their own profile directly'''
    def get(self, request):
        user = request.user.id
        profile = get_object_or_404(User_Profile, id=user)
        ser_profile = ProfileSerializer(profile)
        return Response(ser_profile.data, status=HTTP_200_OK)

    '''allow users to edit their profile'''
    def put(self, request):
        data = request.data.copy()
        user = request.user.id
        profile = get_object_or_404(User_Profile, id=user)
        edit_profile = ProfileSerializer(profile, data=data, partial=True)
        if edit_profile.is_valid():
            edit_profile.save()
            return Response(edit_profile.data, status=HTTP_201_CREATED)
        print(edit_profile.errors)
        return Response(edit_profile.errors, status=HTTP_400_BAD_REQUEST)
    
class SearchProfile(TokenReq):
    '''search for profile by id'''
    def get(self, request, user_id):
        print(user_id)
        profile = get_object_or_404(User_Profile, id=user_id)
        ser_profile = ProfileSerializer(profile)
        return Response(ser_profile.data, status=HTTP_200_OK)