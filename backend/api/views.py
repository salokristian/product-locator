from rest_framework import generics, permissions, views, response, renderers
from django.shortcuts import get_object_or_404

from api.models import Store, Product, ShoppingList
from api.serializers import (BasicStoreSerializer, NestedStoreSerializer,
                             ProductSerializer, ShoppingListSerializer,
                             ShoppingListDetailSerializer)
import api.permissions as custom_perms
import api.pathfinding.route as route


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


class ShoppingListDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Get, modify or delete a user's shopping list.
    """
    serializer_class = ShoppingListSerializer
    permission_classes = (permissions.IsAuthenticated, custom_perms.IsCreator)
    queryset = ShoppingList


class ShoppingListRoute(views.APIView):
    """
    Get the optimal route for fetching all the products in a shopping list.
    """
    permission_classes = (permissions.IsAuthenticated, custom_perms.IsCreator)

    # TODO: Kutsu has_object_perms

    def get(self, request, *args, **kwargs):
        params = {'pk': kwargs['pk']}

        shopping_list = get_object_or_404(ShoppingList, **params)
        self.check_object_permissions(request, shopping_list)
        serialized_shopping_list = ShoppingListDetailSerializer(shopping_list).data

        shelves = [product['shelf'] for product in serialized_shopping_list['products']]
        floor = serialized_shopping_list['products'][0]['shelf']['floor']

        opt_route = get_optimal_route(shelves, floor)
        print(floor)
        # dict.pop()
        return response.Response(serialized_shopping_list)
