# Generated by Django 2.1.2 on 2018-11-04 09:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('store', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='employees', to='api.Store')),
            ],
        ),
        migrations.AddField(
            model_name='customuser',
            name='types',
            field=models.CharField(choices=[('MANAGER', 'Manager'), ('EMPLOYEE', 'Employee'), ('CUSTOMER', 'Customer')], default='CUSTOMER', max_length=15),
            preserve_default=False,
        ),
    ]
