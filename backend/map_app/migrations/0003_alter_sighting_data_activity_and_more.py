# Generated by Django 5.0.3 on 2024-04-04 22:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('map_app', '0002_alter_sighting_data_activity_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sighting_data',
            name='Activity',
            field=models.CharField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sighting_data',
            name='Comments',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sighting_data',
            name='Num_Adults',
            field=models.SmallIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sighting_data',
            name='Num_Calf',
            field=models.SmallIntegerField(blank=True, null=True),
        ),
    ]