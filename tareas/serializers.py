from rest_framework import serializers 
from.models import Products
 
class ProductsSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Products
        fields = ("id", "title", "descripcion", "precio", "stock", "imagen", "categoria")
        read_only_fields = ['created_at'] 
