# Generated by Django 5.0.3 on 2024-04-15 13:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reactions_app', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reactions',
            old_name='comments',
            new_name='comment',
        ),
        migrations.RenameField(
            model_name='reactions',
            old_name='commenter',
            new_name='user',
        ),
    ]
