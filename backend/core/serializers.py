from rest_framework import serializers
from .models import Product, ProductImage
from cloudinary.utils import cloudinary_url

class ProductImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ['id', 'image_url', 'alt_text', 'created_at']

    def get_image_url(self, obj):
        if obj.image:
            return cloudinary_url(obj.image.public_id, secure=True)[0]
        return None

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
			'id', 
			'name', 
			'price', 
			'category', 
			'created_at', 
			'updated_at', 
			'images'
		]
