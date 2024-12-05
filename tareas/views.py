from rest_framework import viewsets
from .serializers import ProductsSerializer
from .models import Products
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied 


class ProductsViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
    
    #Dependiendo de la accion "self.action" se dan ciertos permisos
    def get_permissions(self): 
        print(f"Acción solicitada: {self.action}, Usuario: {self.request.user}")
        if self.action in ['list', 'retrieve']:  # GET requests
            permission_classes = [AllowAny]
        else:  # POST, PUT, DELETE, etc.
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes] #se crean instnacias de permission para cada permiso en permission_classes 
    
    #metodo llamado cuando se realiza POST, se chequea que el usuario sea is_staff (o sea, admin), si lo es se guarda el productoe en la BD
    def perform_create(self, serializer):
        if not self.request.user.is_staff:
            raise PermissionDenied("No tienes permisos para crear productos.")
        serializer.save()

    #metodo llamado cuando se realiza PUT, al iagual que el anterior, chequea si es admin y si lo es, permite actualizar
    def perform_update(self, serializer):
        if not self.request.user.is_staff:
            raise PermissionDenied("No tienes permisos para editar productos.")
        serializer.save()

    #metodo llamado cuando se realiza DELETE, cheque si es admin y si es asi, permite borrar una instancia. 
    def perform_destroy(self, instance):
        print(f"Usuario: {self.request.user}, is_staff: {self.request.user.is_staff}, is_superuser: {self.request.user.is_superuser}")
        if not self.request.user.is_staff:
            raise PermissionDenied("No tienes permisos para eliminar productos.")
        instance.delete()

