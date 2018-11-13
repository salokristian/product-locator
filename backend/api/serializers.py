from rest_framework import serializers
from api.models import Store, Floor, Shelf, Product, ProductInfo, ShoppingList


class ShelfSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shelf
        fields = ('id', 'type', 'x_location', 'y_location',
                  'width', 'height', 'product_side', 'floor')


class FloorSerializer(serializers.ModelSerializer):
    shelves = ShelfSerializer(many=True, read_only=True)

    class Meta:
        model = Floor
        fields = ('id', 'number', 'description', 'points',
                  'entrances', 'checkouts', 'store', 'shelves')


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

    def validate_products(self, products):
        """Check that all products belong to the same store."""
        shelf_ids = [p.shelf.id for p in products]
        store_count = Store.objects.filter(floors__shelves__id__in=shelf_ids).count()

        if store_count != 1:
            raise serializers.ValidationError('All products should belong to the same store.')
        return products

    class Meta:
        model = ShoppingList
        fields = ('id', 'name', 'description', 'created_at',
                  'modified_at', 'creator', 'store', 'products')

        # The creator field is read only because it is added in the view from JWT
        read_only_fields = ('created_at', 'modified_at', 'creator', 'store')


class ShoppingListDetailSerializer(serializers.ModelSerializer):
    """This is a horrible hack to fetch a lot of nested data. Works, but should be fixed. """
    class NestedProductSerializer(serializers.ModelSerializer):

        class NestedShelfSerializer(serializers.ModelSerializer):

            class FloorSerializer(serializers.ModelSerializer):
                class Meta:
                    model = Floor
                    fields = ('id', 'points', 'entrances', 'checkouts')

            floor = FloorSerializer(read_only=True)

            class Meta:
                model = Shelf
                fields = ('id', 'type', 'x_location', 'y_location',
                          'width', 'height', 'product_side', 'floor')

        product_info = BasicProductInfoSerializer(read_only=True)
        shelf = NestedShelfSerializer(read_only=True)

        class Meta:
            model = Product
            fields = ('id', 'price', 'on_discount', 'discount_price',
                      'instock', 'shelf', 'product_info')

    products = NestedProductSerializer(many=True, read_only=True)

    class Meta:
        model = ShoppingList
        fields = ('id', 'name', 'description', 'created_at',
                  'modified_at', 'creator', 'products')
