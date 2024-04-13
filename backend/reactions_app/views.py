
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_204_NO_CONTENT,
)
from manateewatch_proj.settings import env
from user_app.views import TokenReq
from map_app.models import Sighting_Data
from django.shortcuts import get_object_or_404
from profile_app.models import User_Profile
from .models import Reactions
from .serializers import CommentSerializer


# Create your views here.
class AllComments(TokenReq):
    '''create new comments associated with commenting users and sightings'''
    def post(self, request, sighting_id):
        data = request.data.copy()
        data["sighting"] = sighting_id
        data['user'] = request.user.id
        ser_data = CommentSerializer(data=data)
        if ser_data.is_valid():
            ser_data.save()
            return Response(data, status=HTTP_201_CREATED)
        print(ser_data.errors)
        return Response(ser_data.errors, status=HTTP_400_BAD_REQUEST)
    
class A_Comment(TokenReq):
    '''allow comment author to delete their own comments and original sighting author to delete any comments on their post'''
    def delete(self, request, id):
        comment = get_object_or_404(Reactions, id=id)
        comment.delete()
        return Response('comment was deleted', status=HTTP_204_NO_CONTENT)
    
    '''allow users to edit their own comments'''
    def put(self, request, id):
        comment = get_object_or_404(Reactions, id=id)
        data = request.data.copy()
        edit_comment = CommentSerializer(comment, data=data, partial=True)
        if edit_comment.is_valid():
            edit_comment.save()
            return Response(data, status=HTTP_201_CREATED)
        print(edit_comment.errors)
        return Response(edit_comment.errors, status=HTTP_400_BAD_REQUEST)
    