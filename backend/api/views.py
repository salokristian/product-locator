from rest_framework import generics, permissions

from api.models import Store, Product, ShoppingList
from api.serializers import (BasicStoreSerializer, NestedStoreSerializer,
                             ProductSerializer, ShoppingListSerializer)


class StoreList(generics.ListAPIView):
    """
    List all stores. Nested fields such as "floors" are not included.

    Query param `search` filters the stores by name.
    """
    serializer_class = BasicStoreSerializer

    def get_queryset(self):
        stores = Store.objects.all()
        store_name = self.request.query_params.get('search')

        if store_name is not None:
            stores = Store.objects.filter(name__icontains=store_name)

        return stores


class StoreDetail(generics.RetrieveAPIView):
    """
    Fetch a single store.
    """
    serializer_class = NestedStoreSerializer
    queryset = Store


class ProductList(generics.ListAPIView):
    """
    List all products in a store.

    Query param `search` can be used to filter the products by name.
    """
    serializer_class = ProductSerializer

    def get_queryset(self):
        store_pk = self.kwargs['pk']

        products = Product.objects.filter(shelf__floor__store=store_pk)
        product_name = self.request.query_params.get('search')

        if product_name is not None:
            products = products.filter(product_info__name__icontains=product_name)

        return products


class ShoppingListList(generics.ListCreateAPIView):
    """
    List all user's shopping lists or create a new one.
    """
    serializer_class = ShoppingListSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user_pk = self.request.user.pk
        shopping_lists = ShoppingList.objects.filter(creator=user_pk)

        return shopping_lists

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user.customer)

