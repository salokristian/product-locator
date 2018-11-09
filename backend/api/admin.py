from django.contrib import admin

from .forms import FloorForm
from .models import (Store, Location, Shelf, Floor, Product, ProductInfo, ProductType,
                     ShoppingList)


class FloorAdmin(admin.ModelAdmin):
    form = FloorForm


class ProductInline(admin.TabularInline):
    """
    An inline model is needed because django doesn't display admin widgets
    by default when a through model is used.
    """
    model = Product
    extra = 1


class ProductInfoAdmin(admin.ModelAdmin):
    inlines = (ProductInline,)


admin.site.register(Store)
admin.site.register(Location)
admin.site.register(Floor, FloorAdmin)
admin.site.register(Shelf)
admin.site.register(Product)
admin.site.register(ProductInfo, ProductInfoAdmin)
admin.site.register(ProductType)
admin.site.register(ShoppingList)
