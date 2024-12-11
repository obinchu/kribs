from django.db import models
import json  # Import json module to serialize and deserialize lists
from .utils import generate_slug

class Property(models.Model):
    # Choices for property types, categories, and status
    PROPERTY_TYPES = [
        ('apartment', 'Apartment'),
        ('condo', 'Condo'),
        ('office', 'Office'),
        ('studio', 'Studio'),
        ('store', 'Store')
    ]
    
    CATEGORIES = [
        ('residential', 'Residential'),
        ('commercial', 'Commercial'),
        ('rental', 'Rental')
    ]
    
    STATUS_CHOICES = [
        ('buy', 'Buy'),
        ('rent', 'Rent')
    ]
    
    # Property model fields
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    location = models.CharField(max_length=255)
    property_type = models.CharField(max_length=50, choices=PROPERTY_TYPES)
    category = models.CharField(max_length=50, choices=CATEGORIES)
    description = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    cover_image = models.URLField(blank=True)  # To store the cover image URL
    features = models.TextField(default="[]")  # Store features as a JSON string (default is empty list)
    amenities = models.TextField(default="[]")
    likes = models.ManyToManyField('auth.User', related_name='liked_properties', blank=True)
    
    # Additional fields for price, bedrooms, bathrooms, and area
    price = models.DecimalField(max_digits=12, decimal_places=2)  # To store the price of the property
    bedrooms = models.IntegerField()  # To store the number of bedrooms
    bathrooms = models.IntegerField()  # To store the number of bathrooms
    area = models.DecimalField(max_digits=10, decimal_places=2)  # To store the area of the property (e.g., in square meters)
    
    def save(self, *args, **kwargs):
        if not self.slug:  # Generate slug if not set
            self.slug = generate_slug(self.title)  # Use the utility function
        
        # Ensure features and amenities are stored as JSON strings
        self.features = json.dumps(self.features) if isinstance(self.features, list) else self.features
        self.amenities = json.dumps(self.amenities) if isinstance(self.amenities, list) else self.amenListingities

        # Prepend Ngrok URL to cover_image (replace 'YOUR_NGROK_URL' with the actual Ngrok URL)
        if self.cover_image:
            # Remove the protocol (http:// or https://) while keeping the rest of the URL intact
            self.cover_image = self.cover_image.replace('http://', '').replace('https://', '')
            # Prepend the Ngrok URL to the image URL
            self.cover_image = f' https://b81e-102-218-124-142.ngrok-free.app/{self.cover_image}'

        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    # Method to retrieve features as a list
    def get_features(self):
        return json.loads(self.features) if self.features else []

    # Method to retrieve amenities as a list
    def get_amenities(self):
        return json.loads(self.amenities) if self.amenities else []

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, related_name='other_images', on_delete=models.CASCADE)
    image_url = models.URLField()  # Store the image URL

    def save(self, *args, **kwargs):
        # Prepend Ngrok URL to image_url (replace 'YOUR_NGROK_URL' with the actual Ngrok URL)
        if self.image_url:
            # Remove the protocol (http:// or https://) while keeping the rest of the URL intact
            self.image_url = self.image_url.replace('http://', '').replace('https://', '')
            # Prepend the Ngrok URL to the image URL
            self.image_url = f' https://b81e-102-218-124-142.ngrok-free.app/{self.image_url}'
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Image for {self.property.title}"
