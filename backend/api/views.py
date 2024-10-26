from django.shortcuts import render
from django.contrib.auth.models import User 
from rest_framework import generics 
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note



# class view for creating user
class CreatUserView(generics.CreateAPIView): # generic view built-in django to automatically create new user 
    queryset = User.objects.all()         # make sure no double users created
    serializer_class = UserSerializer     # tells which data to accept for creating users
    permission_classes = [AllowAny]       # specify who can call this 


# class view for creating note list
class NoteListCreate(generics.ListCreateAPIView): 
    serializer_class = NoteSerializer       
    permission_classes = [IsAuthenticated]    # only authenticated users can access

    # method for querying all notes from DB
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)   # only view notes created by the specific user (also logged in user)
    
    # method for creating note list
    def perform_create(self, serializer): 
        if serializer.is_valid():   # check validity of the serializer
            serializer.save(author=self.request.user)    # save note
        else:
            print(serializer.errors)


# class view for deleting note
class NoteDelete(generics.DestroyAPIView): 
    serializer_class = NoteSerializer       
    permission_classes = [IsAuthenticated]    # only authenticated users can access
    
    # method for deleting note
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)   # only view notes created by the specific user (also logged in user) 
    