from django.shortcuts import render
from rest_framework.views import APIView
from .models import Sighting_Data
from .serializers import SightingSerializer
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_406_NOT_ACCEPTABLE
)
from manateewatch_proj.settings import env
import requests
from django.http import JsonResponse
from user_app.views import TokenReq


# Create your views here.
class AllSightings(APIView):
    '''Get all sighting data'''
    def get(self, request):
        sightings = Sighting_Data.objects.all()
        ser_sightings = SightingSerializer(sightings, many=True)
        return Response(ser_sightings.data, status=HTTP_200_OK)
    
class NewSighting(APIView):
    def post(self, request):
        data = request.data.copy()

        return Response(data)









    

class ModerateImage(APIView):
    '''send request to ModerateContent API'''
    def post(self, request):
        data = request.data.copy()

        encoded_image = data.get("url")
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        key = env.get("MODERATOR_KEY")
        data = {"base64": "true",
                  "key": key,
                  "url": encoded_image
                  }
        
        endpoint = f"https://api.moderatecontent.com/moderate/"

        response = requests.post(endpoint, data=data, headers=headers)
        responseJSON = response.json()
        
        if responseJSON and responseJSON["predictions"]["everyone"] > 99:
            return Response("GOOD TO GO!", status=HTTP_200_OK)
        return Response("Innapropriate Content Warning!", status=HTTP_406_NOT_ACCEPTABLE)
    

