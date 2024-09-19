from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = models.CharField(min_length=4, max_length=20, unique=True)
    first_name = models.CharField(min_length=2, max_length=25)
    email = models.CharField(max_length=55, unique=True)
    password = models.CharField(min_length=4, max_length=55)
    path = models.CharField(max_length=55, blank=True, default='', null=True)

    def save(self, *args, **kwargs):
        super(User, self).save()
        if not self.path:
            self.path = 'media/user' + str(self.id)
            self.save()

def path(instance, filename):
    return 'user_{0}/{1}'.format(instance.owner.id, filename)

class File(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner')
    filename = models.CharField(max_length=55, unique=True)
    size = models.CharField()
    created_at = models.DateTimeField(auto_now_add=True)
    download_date = models.DateTimeField(auto_now=True)
    comment = models.TextField()
    path = models.FileField(upload_to=path)