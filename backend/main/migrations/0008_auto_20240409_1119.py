# Generated by Django 3.2.12 on 2024-04-09 11:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_painter_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='painter',
            name='photoUrl',
        ),
        migrations.AddField(
            model_name='painter',
            name='image',
            field=models.ImageField(default='exit', upload_to='account_pictures/'),
            preserve_default=False,
        ),
    ]
