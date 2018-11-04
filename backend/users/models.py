from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    '''Extension of the base user model.'''
    MANAGER = 'MANAGER'
    EMPLOYEE = 'EMPLOYEE'
    CUSTOMER = 'CUSTOMER'

    TYPE_CHOICES = (
        (MANAGER, 'Manager'),
        (EMPLOYEE, 'Employee'),
        (CUSTOMER, 'Customer')
    )

    types = models.CharField(max_length=15, choices=TYPE_CHOICES)
    name = models.CharField(blank=True, max_length=255)

    def __str__(self):
        return self.email


class Customer(models.Model):
    '''Model for a customer.'''
    user = models.OneToOneField(
        CustomUser,
        models.CASCADE,
        primary_key=True
    )


class Employee(models.Model):
    '''Model for a store's employee.'''
    user = models.OneToOneField(
        CustomUser,
        models.CASCADE,
        primary_key=True
    )
    store = models.ForeignKey(
        'api.Store',
        models.PROTECT,
        'employees'
    )
