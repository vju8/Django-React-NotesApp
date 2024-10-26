from django.db import models
from django.contrib.auth.models import User 



# create model for Note 
class Note(models.Model): 
    title = models.CharField(max_length=250)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")   # you can access all notes of a user by: User.notes 

    def __str__(self):
        return self.title
    

