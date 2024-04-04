from django.shortcuts import render
from rest_framework.views import APIView
from .models import Sighting_Data
from .serializers import SightingSerializer
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK
)


# Create your views here.
class AllSightings(APIView):
    '''Get all sighting data'''
    def get(self, request):
        sightings = Sighting_Data.objects.all()
        ser_sightings = SightingSerializer(sightings, many=True)
        print(ser_sightings.data)
        return Response(ser_sightings.data, status=HTTP_200_OK)
