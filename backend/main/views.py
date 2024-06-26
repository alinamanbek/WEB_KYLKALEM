from django.urls import reverse
 
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_decode
from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from .forms import PasswordResetForm  # Import the PasswordResetForm
from .models import Admin, Painter, Customer

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        registration_data = request.data
        
        # Process registration data and create User instance
        user = User.objects.create_user(username=registration_data['username'], email=registration_data['email'], password=registration_data['password'])
        
        # Check the user_type
        user_type = registration_data.get('user_type')
        if user_type == 'painter':
            # If user_type is painter, create a Painter instance
            painter_data = request.data
            painter = Painter.objects.create(user=user)
            return Response({'message': 'Painter created successfully'}, status=status.HTTP_201_CREATED)
        elif user_type == 'customer':
            # If user_type is customer, create a Customer instance
            customer_data = request.data
            customer = Customer.objects.create(user=user)
            return Response({'message': 'Customer created successfully'}, status=status.HTTP_201_CREATED)
        elif user_type == 'admin':
            # If user_type is admin, create an Admin instance
            admin_data = request.data
            admin = Admin.objects.create(user=user)
            return Response({'message': 'Admin created successfully'}, status=status.HTTP_201_CREATED)
        else:
            # If user_type is not specified, just return a success response
            login_link = reverse('login')
            message = 'User registered successfully. Please <a href="{}">log in</a>.'.format(login_link)
            return Response({'message': message}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Authenticate user
        user = authenticate(username=username, password=password)
        
        if user:
            # Generate or retrieve token
            token, created = Token.objects.get_or_create(user=user)
            
            # Check which type of user is logging in
            user_type = None
            if hasattr(user, 'admin'):
                user_type = 'admin'
            elif hasattr(user, 'painter'):
                user_type = 'painter'
            elif hasattr(user, 'customer'):
                user_type = 'customer'
            
            return Response({'token': token.key, 'userType': user_type, 'message': 'Logged in successfully'}, status=status.HTTP_200_OK)

        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)







from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth.forms import PasswordResetForm
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator

token_generator = PasswordResetTokenGenerator()

def reset_password(request):
    if request.method == 'POST':
        form = PasswordResetForm(request.POST)
        if form.is_valid():
            # Process form data and reset password
            # Assuming you have the logic to reset the password here
            return redirect('login')  # Redirect to login page after successful password reset
    else:
        form = PasswordResetForm()
    return render(request, 'reset_password_form.html', {'form': form})

def reset_password_confirm(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and token_generator.check_token(user, token):
        # Token is valid, display password reset form
        if request.method == 'POST':
            form = PasswordResetForm(request.POST)
            if form.is_valid():
                # Set new password and redirect to login page
                user.set_password(form.cleaned_data['password'])
                user.save()
                return redirect('login')  # Redirect to login page after successful password reset
        else:
            form = PasswordResetForm()
        return render(request, 'reset_password_form.html', {'form': form})
    else:
        # Invalid token, show an error message
        return render(request, 'password_reset_invalid_token.html')


from django.core.mail import send_mail
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator

def forgot_password(request):
    if request.method == 'POST':
        email = request.POST.get('email')

        # Check if the email exists in the database
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User with this email does not exist'}, status=400)

        # Generate a password reset token
        token = default_token_generator.make_token(user)

        # Construct the password reset link
        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        reset_url = reverse('reset_password_confirm', kwargs={'uidb64': uidb64, 'token': token})
        reset_link = request.build_absolute_uri(reset_url)

        # Send the reset link to the user's email
        send_mail(
            'Password Reset Request',
            f'Hello,\n\nYou requested a password reset for your account. '
            f'Please click the following link to reset your password:\n\n{reset_link}',
            'your@example.com',  # Sender's email address
            [email],  # List of recipient(s)
            fail_silently=False,
        )

        return JsonResponse({'message': 'Password reset link has been sent to your email'}, status=200)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 #CRUD PAINT
 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Paint
from .serializers import PaintSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
 
 
# CReate
@api_view(['POST'])
def create_paint(request):
    if request.method == 'POST':
        serializer = PaintSerializer(data=request.data)
        if serializer.is_valid():
            # Assign the painter based on the logged-in user
            serializer.save(painter=request.user.painter)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#get for painter account
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_paintings(request):
    if request.method == 'GET':
        # Filter paintings by the logged-in user
        paintings = Paint.objects.filter(painter__user=request.user)
        serializer = PaintSerializer(paintings, many=True)
        return Response(serializer.data)




# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def update_paint(request, pk):
#     try:
#         paint = Paint.objects.get(pk=pk)
#     except Paint.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.user != paint.painter.user:
#         return Response({'message': 'You do not have permission to update this paint'}, status=status.HTTP_403_FORBIDDEN)

#     serializer = PaintSerializer(paint, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def delete_paint(request, pk):
#     try:
#         paint = Paint.objects.get(pk=pk)
#     except Paint.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.user != paint.painter.user:
#         return Response({'message': 'You do not have permission to delete this paint'}, status=status.HTTP_403_FORBIDDEN)

#     paint.delete()
#     return Response({'message': 'Paint deleted successfully'}, status=status.HTTP_204_NO_CONTENT)






#home
@api_view(['GET'])
def get_recent_paintings(request):
    recent_paintings = Paint.objects.order_by('-created_time')[:6]
    serializer = PaintSerializer(recent_paintings, many=True)
    return Response(serializer.data)

#catalog
@api_view(['GET'])
def get_all_paintings(request):
    paintings = Paint.objects.all()
    serializer = PaintSerializer(paintings, many=True)
    return Response(serializer.data)



 #edit 
 
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_or_delete_paint(request, pk):
    paint = get_object_or_404(Paint, pk=pk)
    if request.method == 'GET':
        serializer = PaintSerializer(paint)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = PaintSerializer(paint, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        paint.delete()
        return Response({'message': 'Paint deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


 

 

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Paint
from .serializers import PaintSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

@api_view(['POST', 'PUT'])
@permission_classes([IsAuthenticated])
def create_or_update_paint(request, pk=None):
    if request.method == 'POST' or request.method == 'PUT':
        if pk:  # If pk exists, it's an update
            paint = get_object_or_404(Paint, pk=pk)
            serializer = PaintSerializer(paint, data=request.data)
        else:  # It's a create request
            serializer = PaintSerializer(data=request.data)
        if serializer.is_valid():
            # Assign the painter based on the logged-in user
            serializer.save(painter=request.user.painter)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
