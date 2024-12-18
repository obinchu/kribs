# Generated by Django 5.1.3 on 2024-12-11 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('property', '0007_alter_property_cover_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='propertyimage',
            name='image_url',
        ),
        migrations.AddField(
            model_name='propertyimage',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='property_images/'),
        ),
        migrations.AlterField(
            model_name='property',
            name='cover_image',
            field=models.ImageField(blank=True, null=True, upload_to='property_covers/'),
        ),
    ]
