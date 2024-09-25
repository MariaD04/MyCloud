from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator, MaxLengthValidator

class User(AbstractUser):
    username = models.CharField(max_length=20, unique=True, validators=[
        MinLengthValidator(4),
        MaxLengthValidator(20)
    ])
    fullname = models.CharField(max_length=25, validators=[
        MinLengthValidator(2),
        MaxLengthValidator(25)
    ])
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    path = models.CharField(max_length=255, blank=True, default='', null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super(User, self).save()
        if not self.path:
            self.path = 'media/user_' + str(self.id)
            self.save()

def file_path(instance, filename):
    return 'user_{0}/{1}'.format(instance.owner.id, filename)

class File(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owners')
    filename = models.CharField(max_length=255, unique=True)
    comment = models.TextField()
    size = models.CharField()
    created_at = models.DateTimeField(auto_now_add=True)
    download_date = models.DateTimeField(auto_now=True)
    path = models.FileField(upload_to=file_path)
