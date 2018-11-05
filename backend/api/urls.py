from django.urls import path
from api import views


urlpatterns = [
    path('stores', views.StoreList.as_view()),
    path('stores/<int:pk>', views.StoreDetail.as_view())
]
