# from django.urls import path
# from .views import register, login,reset_password, reset_password_confirm, forgot_password,PaintListCreateAPIView, PaintRetrieveUpdateDestroyAPIView

# urlpatterns = [
#     path('api/register/', register, name='register'),
#     path('api/login/', login, name='login'),
#     path('reset-password/', reset_password, name='reset_password'),
#     path('reset-password/<uidb64>/<token>/', reset_password_confirm, name='reset_password_confirm'),
#     path('api/forgot-password/', forgot_password, name='forgot_password'),
#     path('api/paints/', PaintListCreateAPIView.as_view(), name='paints-list-create'),
#     path('api/paints/<int:pk>/', PaintRetrieveUpdateDestroyAPIView.as_view(), name='paint-detail'),
 
# ]
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    register,
    login,
    reset_password,
    reset_password_confirm,
    forgot_password,
    create_paint ,
    get_paintings,
    delete_paint
)

urlpatterns = [
    path('api/register/', register, name='register'),
    path('api/login/', login, name='login'),
    path('reset-password/', reset_password, name='reset_password'),
    path('reset-password/<uidb64>/<token>/', reset_password_confirm, name='reset_password_confirm'),
    path('api/forgot-password/', forgot_password, name='forgot_password'),
    path('api/paintings/', get_paintings, name='get_paintings'),
    path('api/create_paint/', create_paint, name='create_paint'),
    path('api/paintings/<int:pk>/', delete_paint, name='delete_paint'),
    
]



 