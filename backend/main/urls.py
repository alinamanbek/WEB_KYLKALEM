# from django.urls import path
# from django.conf import settings
# from django.conf.urls.static import static
# from .views import (
#     register,
#     login,
#     reset_password,
#     reset_password_confirm,
#     forgot_password,
#     create_paint ,
#     get_paintings,
#     delete_paint,
#   get_recent_paintings,
# get_all_paintings,
# update_paint

# )

# urlpatterns = [
#     path('api/register/', register, name='register'),
#     path('api/login/', login, name='login'),
#     path('reset-password/', reset_password, name='reset_password'),
#     path('reset-password/<uidb64>/<token>/', reset_password_confirm, name='reset_password_confirm'),
#     path('api/forgot-password/', forgot_password, name='forgot_password'),
#     path('api/paintings/', get_paintings, name='get_paintings'),
#     path('api/all_paintings/', get_all_paintings, name='all_paintings'), 
#     path('api/create_paint/', create_paint, name='create_paint'),
#     path('api/paintings/<int:pk>/', delete_paint, name='delete_paint'),
#     path('api/recent_paintings/', get_recent_paintings, name='get_recent_paintings'),
#     path('api/paintings/<int:pk>/update/', update_paint, name='update_paint')


# ]
    

# if settings.DEBUG:
#     urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 
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
    create_paint ,
   # create_or_update_paint,
    get_paintings,
    #delete_paint,
   # create_or_get_paint,
    update_or_delete_paint,
   )

urlpatterns = [
    path('api/register/', register, name='register'),
    path('api/login/', login, name='login'),
    path('reset-password/', reset_password, name='reset_password'),
    path('reset-password/<uidb64>/<token>/', reset_password_confirm, name='reset_password_confirm'),
    path('api/forgot-password/', forgot_password, name='forgot_password'),
    path('api/paintings/', get_paintings, name='get_paintings'),
    path('api/all_paintings/', get_all_paintings, name='all_paintings'), 
    
    
    
   # path('api/create_paint/', create_or_get_paint, name='create_paint'),
    path('api/paintings/<int:pk>/', update_or_delete_paint, name='delete_paint'),
    #path('api/paintings/<int:pk>/', create_or_get_paint, name='create_or_update_paint'),
    path('api/recent_paintings/', get_recent_paintings, name='get_recent_paintings'),
    path('api/create_paint/', create_paint, name='create_paint'),
    
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
