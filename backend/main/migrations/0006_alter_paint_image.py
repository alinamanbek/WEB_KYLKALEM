# Generated by Django 3.2.12 on 2024-04-07 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_alter_paint_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paint',
            name='image',
            field=models.ImageField(upload_to='pictures/'),
        ),
    ]