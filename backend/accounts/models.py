from django.db import models
from django.contrib.auth.models import AbstractUser
from cloudinary.models import CloudinaryField

class User(AbstractUser):
    name = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
