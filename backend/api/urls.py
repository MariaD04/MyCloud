from django.conf import settings
from django.urls import path
from api.views import *

urlpatterns = [
    path('registration/', UserRegistrationView.as_view(), name='registration'),
    path('users/', UsersWithFilesView.as_view(), name='users'),
    path('users/<int:pk>/', UserView.as_view(), name='user'),
    path('file/<pk>/', FileView.as_view(), name='file'),
    path('users/<pk>/files/', FilesView.as_view(), name='files'),
    path('update/<pk>/', UpdateAPIView.as_view(), name='update'),
    path('delete_file/<pk>', FileDeleteView.as_view(), name='delete_file'),
    path('delete_user/<int:pk>/', UserDeleteView.as_view(), name='delete_user'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
]