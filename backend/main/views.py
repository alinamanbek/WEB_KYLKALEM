from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_decode
from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from .forms import PasswordResetForm   
from .models import Admin, Painter, Customer, Paint,Order
from .serializers import PaintSerializer,OrderSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework import generics
from django.http import Http404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from django.contrib.auth.forms import PasswordResetForm
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator


# from rest_framework.decorators import api_view
# from .models import Order
# from rest_framework.decorators import api_view
# from django.contrib.auth.tokens import PasswordResetTokenGenerator
# from django.http import JsonResponse
# from django.contrib.auth.models import User
# from django.urls import reverse
# from django.utils.http import urlsafe_base64_encode
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
 

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        registration_data = request.data
        
        username = registration_data.get('username')
        email = registration_data.get('email')
        password = registration_data.get('password')
        user_type = registration_data.get('user_type')
        
        if not username or not email or not password or not user_type:
            return Response({'error': 'Incomplete registration data'}, status=status.HTTP_400_BAD_REQUEST)
        
        if user_type not in ['admin', 'painter', 'customer']:
            return Response({'error': 'Invalid user type'}, status=status.HTTP_400_BAD_REQUEST)
        
        additional_data = {}
        if user_type == 'painter':
            additional_data = {
                'image': registration_data.get('image'),
                'AboutPainter': registration_data.get('AboutPainter'),
                'workExperience': registration_data.get('workExperience'),
                'education': registration_data.get('education'),
                'name': registration_data.get('name')
            }
        elif user_type == 'customer':
            additional_data = {
                'name': registration_data.get('name'),
                'phone_number': registration_data.get('phone_number')
            }
        
        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            if user_type == 'painter':
                painter = Painter.objects.create(user=user, **additional_data)
                return Response({'user_type': 'painter', 'message': 'Painter created successfully'}, status=status.HTTP_201_CREATED)
            elif user_type == 'customer':
                customer = Customer.objects.create(user=user, **additional_data)
                return Response({'user_type': 'customer', 'message': 'Customer created successfully'}, status=status.HTTP_201_CREATED)
            elif user_type == 'admin':
                admin = Admin.objects.create(user=user)
                return Response({'user_type': 'admin', 'message': 'Admin created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(username=username, password=password)
        
        if user:
            token, created = Token.objects.get_or_create(user=user)
            customer_id = None
            if hasattr(user, 'customer'):
                customer_id = user.customer.id
            
            user_type = None
            if hasattr(user, 'admin'):
                user_type = 'admin'
            elif hasattr(user, 'painter'):
                user_type = 'painter'
            elif hasattr(user, 'customer'):
                user_type = 'customer'
            
            return Response({'token': token.key, 'userType': user_type, 'customerId': customer_id, 'message': 'Logged in successfully'}, status=status.HTTP_200_OK)

        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
        
token_generator = PasswordResetTokenGenerator()

def reset_password(request):
    if request.method == 'POST':
        form = PasswordResetForm(request.POST)
        if form.is_valid():
            return redirect('login')  
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
        if request.method == 'POST':
            form = PasswordResetForm(request.POST)
            if form.is_valid():
                 
                user.set_password(form.cleaned_data['password'])
                user.save()
                return redirect('login')   
        else:
            form = PasswordResetForm()
        return render(request, 'reset_password_form.html', {'form': form})
    else:
        return render(request, 'password_reset_invalid_token.html')

def forgot_password(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User with this email does not exist'}, status=400)
        token = default_token_generator.make_token(user)

        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        reset_url = reverse('reset_password_confirm', kwargs={'uidb64': uidb64, 'token': token})
        reset_link = request.build_absolute_uri(reset_url)

        send_mail(
            'Password Reset Request',
            f'Hello,\n\nYou requested a password reset for your account. '
            f'Please click the following link to reset your password:\n\n{reset_link}',
            'your@example.com',   
            [email],  
            fail_silently=False,
        )

        return JsonResponse({'message': 'Password reset link has been sent to your email'}, status=200)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

#CRUD PAINT
# CReate
@api_view(['POST'])
def create_paint(request):
    if request.method == 'POST':
        serializer = PaintSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(painter=request.user.painter)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#get for painter account
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_paintings(request):
    if request.method == 'GET':
        paintings = Paint.objects.filter(painter__user=request.user)
        serializer = PaintSerializer(paintings, many=True)
        return Response(serializer.data)
#home
@api_view(['GET'])
def get_recent_paintings(request):
    recent_paintings = Paint.objects.order_by('-created_time')[:6]
    serializer = PaintSerializer(recent_paintings, many=True)
    return Response(serializer.data)

#catalog
@api_view(['GET'])
def get_all_paintings(request):
    paintings = Paint.objects.select_related('painter').all()
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

#update_paint
@api_view(['POST', 'PUT'])
@permission_classes([IsAuthenticated])
def create_or_update_paint(request, pk=None):
    if request.method == 'POST' or request.method == 'PUT':
        if pk:  
            paint = get_object_or_404(Paint, pk=pk)
            serializer = PaintSerializer(paint, data=request.data)
        else:   
            serializer = PaintSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(painter=request.user.painter)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
 #edit accountpainter
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Painter
from .serializers import PainterSerializer
from rest_framework.permissions import IsAuthenticated

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def get_user_account_details(request):
    user = request.user
    if hasattr(user, 'painter'):
        painter = get_object_or_404(Painter, user=user)
        serializer = PainterSerializer(painter)
        return Response(serializer.data)
    else:
        return Response({'error': 'User is not a painter'}, status=status.HTTP_400_BAD_REQUEST)
    
#edit_user_account_details
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_user_account_details(request):
    user = request.user
    if hasattr(user, 'painter'):
        painter = user.painter
        serializer = PainterSerializer(painter, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'User is not a painter'}, status=status.HTTP_400_BAD_REQUEST)

#get_painting_detail
@api_view(['GET'])
def get_painting_detail(request, pk):
    try:
        painting = Paint.objects.get(pk=pk)
        serializer = PaintSerializer(painting)
        
        data = serializer.data
        data['painter_name'] = painting.painter.name
        data['painter_id'] = painting.painter.id
        return Response(data)
    except Paint.DoesNotExist:
        raise Http404
 #create_order
@api_view(['POST'])
def create_order(request):
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()  
    
        painter_id = serializer.validated_data['painter'].id  
        painter = Painter.objects.get(id=painter_id)
        painter.orders.append(serializer.data)
        painter.save()
        
        customer_id = serializer.validated_data['customer'].id
        customer = Customer.objects.get(id=customer_id)
        customer.my_orders.append(serializer.data)
        customer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#create_order
def fetch_customer_orders(request, customer_id=None):
    try:
        if customer_id is None:
           
            return JsonResponse({'error': 'Customer ID is required.'}, status=400)

        orders = Order.objects.filter(customer_id=customer_id).select_related('painting', 'painter')

        orders_data = []
        for order in orders:
            order_data = {
                'painter_name': order.painter.name,
                'message': order.message,
                'paint_image': order.painting.image.url,
                'paint_name': order.painting.name,
                'paint_cost': order.painting.price,
                'created_at': order.created_at.strftime('%Y-%m-%d %H:%M:%S'),   
                'status': order.status  
            }
            orders_data.append(order_data)

        return JsonResponse(orders_data, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
 #claer history of customer
@csrf_exempt
def clear_order_history(request, customer_id=None):
    try:
        if customer_id is None:
            return JsonResponse({'error': 'Customer ID is required.'}, status=400)

        Order.objects.filter(customer_id=customer_id).delete()

        return JsonResponse({'message': 'Order history cleared successfully.'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
 #fetch_painter_orders 
@api_view(['GET', 'PUT'])
def fetch_painter_orders(request, painter_id):
    if request.method == 'GET':
        try:
            orders = Order.objects.filter(painter_id=painter_id).select_related('painting', 'customer').prefetch_related('painting__painter')
            data = []
            for order in orders:
                data.append({
                    'id': order.id,
                    'painting': {
                        'id': order.painting.id,
                        'name': order.painting.name,
                        'price': str(order.painting.price),  
                        'image': order.painting.image.url   
                    },
                    'customer': {
                        'id': order.customer.id,
                        'name': order.customer.name,
                        'phone_number': order.customer.phone_number
                    },
                    'painter': {
                        'id': order.painting.painter.id,
                        'name': order.painting.painter.name
                    },
                    'status': order.status,
                    'created_at': order.created_at,
                    'message': order.message
                })
            return Response(data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
    elif request.method == 'PUT':
        try:
            order_id = painter_id  
            order = Order.objects.get(pk=order_id)
            new_status = request.data.get('status')
            order.status = new_status
            order.save()
            return JsonResponse({'message': 'Order status updated successfully'}, status=200)
        except Order.DoesNotExist:
            return JsonResponse({'error': 'Order not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
 
 #delete_order
@api_view(['DELETE'])
def delete_order(request, order_id):
    try:
        order = Order.objects.get(id=order_id)
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

