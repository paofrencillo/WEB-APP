from django.urls import path
from . import views


urlpatterns = [
    # Home Page
    path('', views.home, name='home'),
    # Applicant Login Page
    path('applicant-login/', views.applicant_login, name='applicant-login'),
    # Applicant Registration Page
    path('applicant-registration/', views.applicant_registration, name='applicant-registration'),
    # Applicant Result Page
    path('applicant-result/', views.applicant_result, name='applicant-result'),
    # Coordinator Login Page
    path('coordinator-login/', views.coordinator_login, name='coordinator-login'),
    # Medical Login Page
    path('medical-login/', views.medical_login, name='nurse-login'),
    # Medical table Page
    path('medical-table/', views.medical_table, name='nurse-table'),
    # Interview Login Page
    path('interviewer-login/', views.interviewer_login, name='interviewer-login'),
    # Interview table Page
    path('interviewer-table/', views.interviewer_table, name='interviewer-table'),
]