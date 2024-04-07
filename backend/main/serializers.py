from rest_framework import serializers
from .models import Admin, Painter, Customer,Paint

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

class PainterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Painter
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'
 
 
from rest_framework import serializers
from .models import Paint

class PaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paint
        fields = ['id', 'name', 'image', 'genre', 'price']
