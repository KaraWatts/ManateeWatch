from django.shortcuts import render
from user_app.views import TokenReq
from rest_framework.views import APIView

# Create your views here.
class ViewAllProfiles(APIView):
    pass

class View_Profile(APIView):
    pass

class EditProfile(TokenReq):
    pass