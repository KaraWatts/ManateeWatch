# Generated by Django 5.0.3 on 2024-04-12 00:26

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('map_app', '0006_alter_sighting_data_activity_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='sighting_data',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='sightings', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='sighting_data',
            name='User_ID',
            field=models.CharField(null=True),
        ),
    ]
