# Generated by Django 3.2.12 on 2024-04-07 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='paint',
            name='image',
        ),
        migrations.AddField(
            model_name='paint',
            name='image_path',
            field=models.CharField(default='exit', max_length=255),
            preserve_default=False,
        ),
    ]
