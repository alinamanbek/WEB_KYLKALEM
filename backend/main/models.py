
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
 
    
class Customer(models.Model):
 
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.TextField()
    created_time = models.DateTimeField(auto_now_add=True)
    phone_number = models.CharField(max_length=20)

class Paint(models.Model):
    
    name = models.CharField(max_length=255)
    created_time = models.DateTimeField(auto_now_add=True)
    painter = models.ForeignKey(Painter, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='pictures/')
    genre = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
  

class Basket(models.Model):
    id = models.AutoField(primary_key=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    paint = models.ForeignKey(Paint, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
