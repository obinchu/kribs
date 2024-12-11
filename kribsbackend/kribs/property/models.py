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
        ('store', 'Store'),
    ]

    CATEGORIES = [
        ('residential', 'Residential'),
        ('commercial', 'Commercial'),
        ('rental', 'Rental'),
    ]

    STATUS_CHOICES = [
        ('buy', 'Buy'),
        ('rent', 'Rent'),
    ]

    # Property model fields
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    location = models.CharField(max_length=255)
    property_type = models.CharField(max_length=50, choices=PROPERTY_TYPES)
    category = models.CharField(max_length=50, choices=CATEGORIES)
    description = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    cover_image = models.ImageField(upload_to='property_covers/', blank=True, null=True)  # Store uploaded cover images
    features = models.TextField(default="[]")  # Store features as a JSON string (default is an empty list)
    amenities = models.TextField(default="[]")  # Store amenities as a JSON string
    likes = models.ManyToManyField('auth.User', related_name='liked_properties', blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2)  # To store the price of the property
    bedrooms = models.IntegerField()  # To store the number of bedrooms
    bathrooms = models.IntegerField()  # To store the number of bathrooms
    area = models.DecimalField(max_digits=10, decimal_places=2)  # To store the area of the property (e.g., in square meters)

    def save(self, *args, **kwargs):
        if not self.slug:  # Generate slug if not set
            self.slug = generate_slug(self.title)  # Use the utility function

        # Ensure features and amenities are stored as JSON strings
        self.features = json.dumps(self.features) if isinstance(self.features, list) else self.features
        self.amenities = json.dumps(self.amenities) if isinstance(self.amenities, list) else self.amenities

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
    image = models.ImageField(upload_to='property_images/', blank=True, null=True)  # Make the field nullable

    def __str__(self):
        return f"Image for {self.property.title}"

