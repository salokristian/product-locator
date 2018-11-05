from api.models import Store
from api.serializers import BasicStoreSerializer, NestedStoreSerializer
from rest_framework import generics


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
