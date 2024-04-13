from django.shortcuts import render
from rest_framework.views import APIView
from .models import Sighting_Data
from .serializers import SightingSerializer, NewSightingSerializer
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_406_NOT_ACCEPTABLE,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_204_NO_CONTENT
)
from manateewatch_proj.settings import env
import requests
from django.http import JsonResponse
from user_app.views import TokenReq


# Create your views here.
class AllSightings(APIView):
    '''Get all sighting data'''
    def get(self, request):
        sightings = Sighting_Data.objects.order_by('-sighting_date')
        ser_sightings = SightingSerializer(sightings, many=True)
        return Response(ser_sightings.data, status=HTTP_200_OK)
    
class NewSighting(TokenReq):
    def post(self, request):
        requestData = request.data.copy()
        data = requestData['requestData']
        data['user'] = request.user.id
        ser_data = NewSightingSerializer(data = data)
        if ser_data.is_valid():
            ser_data.save()
            return Response(data, status=HTTP_201_CREATED)
        print(ser_data.errors)
        return Response(ser_data.errors, status=HTTP_400_BAD_REQUEST)
    
class A_Sighting(APIView):
    def delete(self, request, sighting_id):
        sighting = Sighting_Data.objects.get(sighting_id)
        sighting.delete()
        return Response("sighting was deleted", status=HTTP_204_NO_CONTENT)

    

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
            return Response("Photo Accepted", status=HTTP_200_OK)
        return Response("Innapropriate Content Warning!", status=HTTP_406_NOT_ACCEPTABLE)
    

