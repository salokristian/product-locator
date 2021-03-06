# Generated by Django 2.1.2 on 2018-11-04 09:13

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Floor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('description', models.TextField(blank=True)),
                ('points', django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.PositiveIntegerField(), size=2), size=None)),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street', models.CharField(max_length=40)),
                ('house_number', models.CharField(max_length=20)),
                ('lat_dd', models.DecimalField(blank=True, decimal_places=5, max_digits=8, null=True)),
                ('lon_dd', models.DecimalField(blank=True, decimal_places=5, max_digits=8, null=True)),
                ('city', models.CharField(max_length=40)),
                ('country', models.CharField(blank=True, default='Finland', max_length=40)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=9)),
                ('on_discount', models.BooleanField(blank=True, default=False)),
                ('discount_price', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('instock', models.PositiveIntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProductInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('brand', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True)),
                ('image', models.URLField(blank=True, max_length=255)),
                ('weight', models.PositiveIntegerField(blank=True, null=True)),
                ('volume', models.PositiveIntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProductType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Shelf',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(blank=True, choices=[('SHELF', 'Shelf'), ('BIN', 'Bin'), ('FRIDGE', 'Fridge'), ('FREEZER', 'Freezer')], default='SHELF', max_length=255)),
                ('x_location', models.PositiveIntegerField()),
                ('y_location', models.PositiveIntegerField()),
                ('width', models.PositiveIntegerField()),
                ('height', models.PositiveIntegerField()),
                ('floor', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='shelves', to='api.Floor')),
            ],
            options={
                'verbose_name_plural': 'shelves',
            },
        ),
        migrations.CreateModel(
            name='Store',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('phone', models.CharField(max_length=20)),
                ('description', models.TextField()),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='stores', to='api.Location')),
            ],
        ),
        migrations.AddField(
            model_name='productinfo',
            name='stores',
            field=models.ManyToManyField(related_name='products', through='api.Product', to='api.Shelf'),
        ),
        migrations.AddField(
            model_name='productinfo',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='products', to='api.ProductType'),
        ),
        migrations.AddField(
            model_name='product',
            name='product_info',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='+', to='api.ProductInfo'),
        ),
        migrations.AddField(
            model_name='product',
            name='shelf',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='+', to='api.Shelf'),
        ),
        migrations.AddField(
            model_name='floor',
            name='store',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='floors', to='api.Store'),
        ),
    ]
