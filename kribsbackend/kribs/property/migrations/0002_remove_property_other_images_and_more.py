# Generated by Django 5.1.3 on 2024-12-02 09:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('property', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='property',
            name='other_images',
        ),
        migrations.AlterField(
            model_name='property',
            name='amenities',
            field=models.JSONField(default=list),
        ),
        migrations.AlterField(
            model_name='property',
            name='cover_image',
            field=models.URLField(blank=True),
        ),
        migrations.AlterField(
            model_name='property',
            name='features',
            field=models.JSONField(default=list),
        ),
        migrations.CreateModel(
            name='PropertyImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_url', models.URLField()),
                ('property', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='other_images', to='property.property')),
            ],
        ),
    ]
