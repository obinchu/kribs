from django.contrib import admin
from .models import Property, PropertyImage


class PropertyAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'property_type', 'status', 'price')
    prepopulated_fields = {"slug": ("title",)}  # Automatically populate slug field based on title


class PropertyImageAdmin(admin.ModelAdmin):
    # Fixing the issue with image_url
    list_display = ('property', 'image_preview')

    def image_preview(self, obj):
        # Display a preview of the image in the admin panel
        if obj.image:
            return f'<img src="{obj.image.url}" style="width: 50px; height: auto;" />'
        return "No image available"
    image_preview.allow_tags = True  # Allows the HTML to render
    image_preview.short_description = "Image Preview"  # Description for the column in the admin panel


# Register the models with their respective admins
admin.site.register(Property, PropertyAdmin)
admin.site.register(PropertyImage, PropertyImageAdmin)
