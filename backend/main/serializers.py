from rest_framework import serializers
from .models import Admin, Painter, Customer,Paint

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

from rest_framework import serializers
from .models import Painter, Customer

class PainterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Painter
        fields = ['name', 'image', 'AboutPainter', 'workExperience', 'education']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['name', 'phone_number']


from rest_framework import serializers
from .models import Paint

class PaintSerializer(serializers.ModelSerializer):
    painter_name = serializers.CharField(source='painter.name', read_only=True)

    class Meta:
        model = Paint
        fields = ['id', 'name', 'image', 'genre', 'price', 'about_paint', 'painter_name']


