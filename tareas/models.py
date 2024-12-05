from django.db import models

# Create your models here.

categoria_status = [
    (1, "T Shirts"),
    (2, "Shorts"),
    (3, "Pants"),
    (4, "Hoodies"),
    (5, "Accessories"),
]


class Products(models.Model):
    title = models.CharField(max_length= 250) 
    descripcion = models.TextField()
    categoria = models.IntegerField(
        null= False, blank = False,
        choices= categoria_status,
        default=1
    )
    precio = models.DecimalField(max_digits=10, decimal_places=2)  # Precio del producto
    stock = models.PositiveIntegerField(null = False)  # Cantidad en stock
    imagen = models.ImageField(upload_to='productos/', blank=True, null=True)  # Imagen del producto
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self): 
        return self.title 

