"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from api.views import CreatUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView    # built-in views for obtaining Access & Refresh Tokens and to refresh access token upon expiration

urlpatterns = [
    path("admin/", admin.site.urls),
    # URL-pattern for registering new user 
    path("api/user/register/", CreatUserView.as_view(), name="register"),
    # URL-pattern for getting tokens (JSON form => access & refresh tokens)
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    # URL-pattern for refreshing token (refresh token needs to be passed and a JSON with a new active token generated)
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
]
