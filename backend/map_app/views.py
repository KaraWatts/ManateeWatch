import os
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from .models import Sighting_Data
from .serializers import SightingSerializer, NewSightingSerializer
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_406_NOT_ACCEPTABLE,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_204_NO_CONTENT,
    HTTP_401_UNAUTHORIZED,
)
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
    '''create new sighting'''
    def post(self, request):
        requestData = request.data.copy()
        data = requestData['requestData']
        data['user'] = request.user.id
        ser_data = NewSightingSerializer(data = data)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=HTTP_201_CREATED)
        print(ser_data.errors)
        return Response(ser_data.errors, status=HTTP_400_BAD_REQUEST)
    
class A_Sighting(TokenReq):
    '''users can delete sighting by id if associated with their own account'''
    def delete(self, request, sighting_id):

        sighting = get_object_or_404(Sighting_Data, id=sighting_id)
        sightingData = SightingSerializer(sighting).data
 
        if sightingData["user"]['user_id'] == request.user.id:
            sighting.delete()
            return Response(f"sighting was deleted", status=HTTP_204_NO_CONTENT)
        return Response(f"Access Denied to user {request.user.id}", status=HTTP_401_UNAUTHORIZED)

    '''users can edit sighting by id if associated with their own account'''
    def put(self, request, sighting_id):
        sighting = get_object_or_404(id=sighting_id)
        data = request.data.copy()
        edit_sighting = SightingSerializer(sighting, data=data, partial=True)
        if edit_sighting.is_valid():
            edit_sighting.save()
            return Response(edit_sighting.data, status=HTTP_201_CREATED)
        print(edit_sighting.errors)
        return Response(edit_sighting.errors, status=HTTP_400_BAD_REQUEST)


class ModerateImage(TokenReq):
    '''send request to ModerateContent API'''
    def post(self, request):
        data = request.data.copy()

        encoded_image = data.get("url")
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        key = os.environ.get("MODERATOR_KEY")
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
    

