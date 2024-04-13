# Generated by Django 5.0.3 on 2024-04-12 03:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('map_app', '0010_alter_sighting_data_created_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sighting_data',
            name='lat',
            field=models.DecimalField(decimal_places=15, max_digits=40),
        ),
        migrations.AlterField(
            model_name='sighting_data',
            name='lon',
            field=models.DecimalField(decimal_places=15, max_digits=40),
        ),
    ]