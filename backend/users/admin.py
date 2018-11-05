from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser, Customer, Employee


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['email', 'username', 'name', 'types']
    fieldsets = UserAdmin.fieldsets + (('Custom fields', {
        'fields': ('types', 'name')
    }),)


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Employee)
admin.site.register(Customer)
