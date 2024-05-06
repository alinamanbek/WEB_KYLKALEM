from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    register,
    login,
    reset_password,
    reset_password_confirm,
    forgot_password,
    get_recent_paintings,
    get_all_paintings,
    create_paint,
    get_paintings,
    update_or_delete_paint,
    get_user_account_details,
    edit_user_account_details,
    get_painting_detail,
   OrderCreateAPIView, 
   OrderRetrieveUpdateDestroyAPIView,
     
)

urlpatterns = [
    path('api/register/', register, name='register'),
    path('api/login/', login, name='login'),
    path('reset-password/', reset_password, name='reset_password'),
    path('reset-password/<uidb64>/<token>/', reset_password_confirm, name='reset_password_confirm'),
    path('api/forgot-password/', forgot_password, name='forgot_password'),
    path('api/paintings/', get_paintings, name='get_paintings'),
    path('api/all_paintings/', get_all_paintings, name='all_paintings'),
    path('api/paintings/<int:pk>/', update_or_delete_paint, name='delete_paint'),
    path('api/recent_paintings/', get_recent_paintings, name='get_recent_paintings'),
    path('api/create_paint/', create_paint, name='create_paint'),
    path('api/get_user_account_details/', get_user_account_details, name='get_user_account_details'),
    path('api/edit_user_account_details/', edit_user_account_details, name='edit_user_account_details'),
    path('api/detail/<int:pk>/', get_painting_detail, name='painting_detail'),
    path('orders/', OrderCreateAPIView.as_view(), name='order-list-create'),
    path('orders/<int:pk>/', OrderRetrieveUpdateDestroyAPIView.as_view(), name='order-detail'),
     

]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
