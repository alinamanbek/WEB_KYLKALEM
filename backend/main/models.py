
from django.contrib.auth.models import User
from django.db import models

class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_time = models.DateTimeField(auto_now_add=True)


class Painter(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    createdTime = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='account_pictures/')
    AboutPainter = models.TextField()
    workExperience = models.TextField()
    education = models.TextField()
    name = models.TextField()   
    orders = models.JSONField(default=list) 
 
    
class Customer(models.Model):
 
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.TextField()
    created_time = models.DateTimeField(auto_now_add=True)
    phone_number = models.CharField(max_length=20)
    my_orders = models.JSONField(default=list)

class Paint(models.Model):
    
    name = models.CharField(max_length=255)
    created_time = models.DateTimeField(auto_now_add=True)
    painter = models.ForeignKey(Painter, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='pictures/')
    genre = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    about_paint = models.CharField(max_length=255)
  
class Order(models.Model):
    painting = models.ForeignKey(Paint, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    painter = models.ForeignKey(Painter, on_delete=models.CASCADE)
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    message = models.TextField(250)
 