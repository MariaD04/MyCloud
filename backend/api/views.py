from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView, RetrieveAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, File
from .serializers import UserRegistrationSerializer, UserWithFilesSerializer, UserSerializer, FileSerializer

class UserRegistrationView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer

class UserView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserWithFilesSerializer
    permission_classes = (IsAuthenticated,)

class UsersWithFilesView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserWithFilesSerializer
    permission_classes = (IsAuthenticated,)

class UserDeleteView(DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

class UserLogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class FileView(RetrieveAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = (IsAuthenticated,)

class FileUpdateView(UpdateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = (IsAuthenticated,)

class FilesView(APIView):
    permission_classes = (IsAuthenticated,) 

    def get(self, request, pk):
        files = File.objects.filter(owner_id=pk)  
        serializer = FileSerializer(files, many=True) 
        return Response(serializer.data)  

    def post(self, request, *args, **kwargs):
        print(request.data)  
        file = request.FILES['path']  
        file_comment = request.data['comment']  
        filename = request.data['fileName']
        size = request.data['size']  
        owner_id = request.data['id'] 
        newFile = File(owner_id=owner_id, path=file, comment=file_comment, size=size, filename=filename)  
        newFile.save()  
        return Response('OK') 

class FileDeleteView(DestroyAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = (IsAuthenticated,)



