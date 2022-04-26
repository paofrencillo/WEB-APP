from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import MedicalResult, User


class RegistrationCredetials(UserCreationForm):
    first_name = forms.CharField(label="First Name",
                                widget=forms.TextInput(attrs={'placeholder':'Juan'}),
                                max_length=255,
                                required=True)
                    
    last_name = forms.CharField(label="Last Name",
                                widget=forms.TextInput(attrs={'placeholder':'Dela Cruz'}),
                                max_length=255,
                                required=True)

    email = forms.EmailField(label="Email",
                            max_length=255,
                            required=True)

    username = forms.CharField(label="Username",
                            max_length=255,
                            required=True)
                            
    password1 = forms.CharField(label="Password",
                            max_length=255,
                            required=True,
                            widget=forms.PasswordInput)

    password2 = forms.CharField(label="Confirm Password",
                            max_length=255,
                            required=True,
                            widget=forms.PasswordInput)
    

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'username', 'password1', 'password2']


class UpdateNurseTable(forms.ModelForm):
    CHOICES=[('PASSED','PASSED'),
            ('FAILED','FAILED')]

    medical_result = forms.CharField(label='Medical Result', widget=forms.RadioSelect(choices=CHOICES))
    medical_file = forms.FileField(allow_empty_file=True, widget=forms.ClearableFileInput())
    

    class Meta:
        model = MedicalResult
        fields = ['medical_result', 'medical_file']