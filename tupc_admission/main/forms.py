from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User


class RegistrationCredetials(UserCreationForm):
    email = forms.EmailField(label="Email", max_length=255, required=True)
    username = forms.CharField(label="Username", max_length=255, required=True)
    password1 = forms.CharField(label="Password", max_length=255, required=True, widget=forms.PasswordInput)
    password2 = forms.CharField(label="Confirm Password", max_length=255, required=True, widget=forms.PasswordInput)
    

    class Meta:
        model = User
        fields = ['email', 'username', 'password1', 'password2']
