from rest_framework import serializers
from api.models import Store, Floor, Shelf


class ShelfSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shelf
        fields = ('id', 'type', 'x_location', 'y_location', 'width', 'height', 'floor')


class FloorSerializer(serializers.ModelSerializer):
    shelves = ShelfSerializer(many=True, read_only=True)

    class Meta:
        model = Floor
        fields = ('id', 'number', 'description', 'points', 'store', 'shelves')


class BasicStoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ('id', 'name', 'description', 'location', 'phone')


class NestedStoreSerializer(serializers.ModelSerializer):
    floors = FloorSerializer(many=True, read_only=True)

    class Meta:
        model = Store
        fields = ('id', 'name', 'description', 'location', 'phone', 'floors')
