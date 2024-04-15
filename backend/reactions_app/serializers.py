from rest_framework import serializers
from .models import Reactions




class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Reactions
        exclude = ['sighting']


    def get_user(self, obj):
        return {
                'user_id': obj.user.user_id,
                'display_name': obj.user.display_name,
                'profile_picture': obj.user.profile_picture
            }
        


