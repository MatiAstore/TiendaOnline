from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.documentation import include_docs_urls
from .views import ProductsViewSet

router = routers.DefaultRouter()
router.register(r"products", ProductsViewSet,"products")

urlpatterns = [
    path("api/", include(router.urls)), 
    path('api/auth/', obtain_auth_token, name='api_token_auth'), 
    path("docs/", include_docs_urls(title="Products API")),  
]
