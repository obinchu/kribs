from django.urls import path
from . import views  # Import your views module
from django.conf import settings  # Import settings for debug checks
from django.conf.urls.static import static  # Import for serving media files in debug mode

urlpatterns = [
    # Route to fetch property data
    path('properties', views.getPropertiesData, name='get_properties_data'),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
