# Generated by Django 5.0.3 on 2024-04-13 01:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('map_app', '0015_alter_sighting_data_comments'),
        ('profile_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reactions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comments', models.TextField(max_length=500)),
                ('commenter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='profile_app.user_profile')),
                ('sighting', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reactions', to='map_app.sighting_data')),
            ],
        ),
    ]