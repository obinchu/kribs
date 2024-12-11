from django.contrib import admin
from .models import Property, PropertyImage

class PropertyImageAdmin(admin.ModelAdmin):
    list_display = ('property', 'image_url')

admin.site.register(Property)
admin.site.register(PropertyImage, PropertyImageAdmin)
