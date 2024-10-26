from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

# create serializer 
# Django uses ORM (object relational mapping) = maps python object to correcponding code that needs to be executed to make a change in the DB

class UserSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}  # accept the password when creting user, but dont return password when giving information about user 

    
    def create(self, validated_data): 
        user = User.objects.create_user(**validated_data)
        return user 
    


class NoteSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}     # only read the    