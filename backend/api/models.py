from django.db import models
from django.contrib.postgres.fields import ArrayField


class Location(models.Model):
    '''
    A model for storing locations.

    ``lat_dd`` and ``lon_dd``contain desimal degree representations of the address'
    latitude and longitude, respectively. They allow storing down to ~1m accuracies.
    '''
    street = models.CharField(max_length=40)
    house_number = models.CharField(max_length=20)
    lat_dd = models.DecimalField(max_digits=8, decimal_places=5, blank=True, null=True)
    lon_dd = models.DecimalField(max_digits=8, decimal_places=5, blank=True, null=True)
    city = models.CharField(max_length=40)
    country = models.CharField(max_length=40, blank=True, default='Finland')
    description = models.TextField()

    def __str__(self):
        return '{} {}, {}'.format(self.street, self.house_number, self.city)


class Store(models.Model):
    '''A model for a store.'''
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    description = models.TextField()
    location = models.ForeignKey(
        'Location',
        models.PROTECT,
        'stores'
    )

    def __str__(self):
        return self.name


class Floor(models.Model):
    '''
    A model for describing a floor in a store.

    ``points`` is an array containing [x_point, y_point] arrays, which limit the floor's area.
    The unit of these coordinates is centimeters.
    '''
    number = models.IntegerField()
    description = models.TextField(blank=True)
    points = ArrayField(
        ArrayField(
            models.PositiveIntegerField(),
            size=2)
    )
    store = models.ForeignKey(
        Store,
        models.PROTECT,
        'floors'
    )

    def __str__(self):
        return str(self.number)


class Shelf(models.Model):
    '''
    A model for a shelf in a floor.

    The ``x_location``, ``y_location``, ``width`` and ``height`` fields are in centimeters.
    '''
    SHELF = 'SHELF'
    BIN = 'BIN'
    FRIDGE = 'FRIDGE'
    FREEZER = 'FREEZER'

    TYPE_CHOICES = (
        (SHELF, 'Shelf'),
        (BIN, 'Bin'),
        (FRIDGE, 'Fridge'),
        (FREEZER, 'Freezer')
    )

    type = models.CharField(
        max_length=255,
        choices=TYPE_CHOICES,
        default=SHELF,
        blank=True
    )
    x_location = models.PositiveIntegerField()
    y_location = models.PositiveIntegerField()
    width = models.PositiveIntegerField()
    height = models.PositiveIntegerField()

    floor = models.ForeignKey(
        Floor,
        models.PROTECT,
        'shelves',
        null=True
    )

    class Meta:
        verbose_name_plural = 'shelves'

    def __str__(self):
        return '({},{})cm {}cm x {}cm'.format(
            self.x_location,
            self.y_location,
            self.width,
            self.height
        )


class Product(models.Model):
    '''
    An intermediate model between ProductInfo and Shelf.
    Contains properties that are specifically related to a relationship between
    a store and a product. The price is in euros.
    '''
    price = models.DecimalField(max_digits=9, decimal_places=2)
    on_discount = models.BooleanField(blank=True, default=False)
    discount_price = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        blank=True,
        null=True
    )
    instock = models.PositiveIntegerField(blank=True, null=True)

    shelf = models.ForeignKey(
        Shelf,
        models.PROTECT,
        '+',
    )
    product_info = models.ForeignKey(
        'ProductInfo',
        models.PROTECT,
        '+'
    )

    def __str__(self):
        return '{} in shelf {}'.format(self.product_info, self.shelf)


class ProductType(models.Model):
    '''
    A model for giving products a type, enabling users to use the same shopping list
    in different stores with different products. A type can be e.g. "maito" or "omena".
    '''
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class ProductInfo(models.Model):
    '''A model for storing products' static information which is the same in all stores.'''
    name = models.CharField(max_length=255)
    brand = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.URLField(max_length=255, blank=True)
    weight = models.PositiveIntegerField(blank=True, null=True)
    volume = models.PositiveIntegerField(blank=True, null=True)

    type = models.ForeignKey(
        ProductType,
        models.PROTECT,
        'products'
    )
    shelves = models.ManyToManyField(
        Shelf,
        'products',
        through=Product
    )

    def __str__(self):
        return '{}, {}'.format(self.name, self.brand)


class ShoppingList(models.Model):
    '''A model for storing data about a customer's shopping list.'''
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    products = models.ManyToManyField(
        Product,
        'shoppings_lists'
    )
    creator = models.ForeignKey(
        'users.Customer',
        models.CASCADE,
        'shoppings_lists'
    )

    def __str__(self):
        return '{} by {}'.format(self.name, self.cretor)
