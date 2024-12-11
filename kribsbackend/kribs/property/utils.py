from django.utils.text import slugify
import uuid

def generate_slug(title):
    """
    Generates a unique slug using the title and a random UUID.
    """
    base_slug = slugify(title)  # Converts title to a slug
    unique_id = str(uuid.uuid4())[:8]  # Short unique identifier
    return f"{base_slug}-{unique_id}"
