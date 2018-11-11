from django.urls import path
from api import views
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('token', obtain_jwt_token),
    path('stores', views.StoreList.as_view()),
    path('stores/<int:pk>', views.StoreDetail.as_view()),
    path('stores/<int:pk>/products', views.ProductList.as_view()),
    path('shopping-lists/me', views.ShoppingListList.as_view()),
]
