# Generated by Django 3.2.12 on 2024-05-06 11:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_paint_about_paint'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.customer')),
                ('painter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.painter')),
                ('painting', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.paint')),
            ],
        ),
        migrations.DeleteModel(
            name='Basket',
        ),
    ]