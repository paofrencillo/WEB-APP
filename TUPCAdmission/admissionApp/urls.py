from django.urls import path
from . import views


urlpatterns = [
    # Home Page
    path('', views.home, name='home'),
    # Applicant Login Page
    path('applicant/', views.home, name='home'),
    # Coordinator Login Page
    path('coordinator/', views.coordinator_login, name='coordinator'),
    # Medical Login Page
    path('medical/', views.home, name='home'),
    # Interview Login Page
    path('interviewer/', views.home, name='home'),
]