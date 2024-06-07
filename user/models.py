from django.utils import timezone
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)


class UserManager(BaseUserManager):
    """Manager for users""" 

    def create_user(self, email, password=None, **extra_fields):
        """Create, save and return a new user"""
        
        if not email:
            raise ValueError("User must have an email adress")
        
        user = self.model(email = self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save()
        
        return user
    
    def create_superuser(self, email, password):
        """Create, save and return a new user"""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        
        return user

class User(AbstractBaseUser, PermissionsMixin):
    """User in system"""
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255, null=False)
    last_name = models.CharField(max_length=255, null=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self) -> str:
        return f'{self.first_name} {self.last_name}'