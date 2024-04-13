from rest_framework import serializers
from .models import Reactions



class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reactions
        fields = "__all__"



