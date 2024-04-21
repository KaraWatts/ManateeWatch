
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_204_NO_CONTENT,
    HTTP_401_UNAUTHORIZED
)
from manateewatch_proj.settings import env
from user_app.views import TokenReq
from django.shortcuts import get_object_or_404
from .models import Reactions
from .serializers import CommentSerializer, NewCommentSerializer


# Create your views here.
class AllComments(TokenReq):
    '''create new comments associated with commenting users and sightings'''
    def post(self, request, sighting_id):
        data = request.data.copy()
        data["sighting"] = sighting_id
        data['user'] = request.user.id
        ser_data = NewCommentSerializer(data=data)
        if ser_data.is_valid():
            new_comment = ser_data.save()
            newPost = CommentSerializer(new_comment).data
            return Response(newPost, status=HTTP_201_CREATED)
        print(ser_data.errors)
        return Response(ser_data.errors, status=HTTP_400_BAD_REQUEST)
    
class A_Comment(TokenReq):
    '''allow comment author to delete their own comments and original sighting author to delete any comments on their post'''
    def delete(self, request, comment_id, sighting_id):
        user = request.user.id
        comment = get_object_or_404(Reactions, id=comment_id)
        commentData = NewCommentSerializer(comment).data
        print(commentData['user'], user)
        if (user == commentData['user']):
            comment.delete()
            
            return Response('comment was deleted', status=HTTP_204_NO_CONTENT)
        return Response("Unauthorized access", status=HTTP_401_UNAUTHORIZED)
    
    '''allow users to edit their own comments'''
    def put(self, request, comment_id, sighting_id):
        comment = get_object_or_404(Reactions, id=comment_id)
        data = request.data.copy()
        edit_comment = CommentSerializer(comment, data=data, partial=True)
        if edit_comment.is_valid():
            edit_comment.save()
            return Response(edit_comment.data, status=HTTP_201_CREATED)
        print(edit_comment.errors)
        return Response(edit_comment.errors, status=HTTP_400_BAD_REQUEST)
    