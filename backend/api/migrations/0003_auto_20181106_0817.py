# Generated by Django 2.1.2 on 2018-11-06 08:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_shoppinglist'),
    ]

    operations = [
        migrations.RenameField(
            model_name='productinfo',
            old_name='stores',
            new_name='shelves',
        ),
    ]
