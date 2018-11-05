from django.contrib import admin

from .forms import FloorForm
from .models import (Store, Location, Shelf, Floor, Product, ProductInfo, ProductType,
                     ShoppingList)


class FloorAdmin(admin.ModelAdmin):
    form = FloorForm


admin.site.register(Store)
admin.site.register(Location)
admin.site.register(Floor, FloorAdmin)
admin.site.register(Shelf)
admin.site.register(Product)
admin.site.register(ProductInfo)
admin.site.register(ProductType)
admin.site.register(ShoppingList)
