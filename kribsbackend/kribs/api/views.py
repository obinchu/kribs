from rest_framework.response import Response
from rest_framework.decorators import api_view
from property.models import Property
from .serializers import PropertySerializer

@api_view(['GET'])
def getPropertiesData(request):
    properties = Property.objects.all()
    serializer = PropertySerializer(properties,many=True)
    return Response(serializer.data) 