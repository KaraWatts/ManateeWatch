# Generated by Django 5.0.3 on 2024-04-12 00:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('map_app', '0009_alter_sighting_data_num_adults_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sighting_data',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
