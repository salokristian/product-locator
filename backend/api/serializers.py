from rest_framework import serializers
from api.models import Store, Floor, Shelf, Product, ProductInfo, ShoppingList


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


class BasicProductInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductInfo
        fields = ('id', 'name', 'brand', 'description',
                  'image', 'weight', 'volume', 'type')


class ProductSerializer(serializers.ModelSerializer):
    product_info = BasicProductInfoSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'price', 'on_discount', 'discount_price',
                  'instock', 'shelf', 'product_info')


class ShoppingListSerializer(serializers.ModelSerializer):
    store = serializers.SerializerMethodField()

    # TODO: Could be turned into a manager method
    def get_store(self, obj):
        """Get the store of the shopping list by looking at the products' location."""
        products = obj.products.all()

        if len(products) > 0:
            shelf = products[0].shelf
            store = Store.objects.get(floors__shelves__id=shelf.pk)

            return BasicStoreSerializer(store).data

    class Meta:
        model = ShoppingList
        fields = ('id', 'name', 'description', 'created_at', 'modified_at', 'creator', 'store')
