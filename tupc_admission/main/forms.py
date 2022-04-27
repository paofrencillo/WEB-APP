from random import choices
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import MedicalResult, User


class RegistrationCredetials(UserCreationForm):
    first_name = forms.CharField(label="First Name",
                                widget=forms.TextInput(attrs={'placeholder': 'Juan', 
                                                            'onkeyup': 'saveValue(this)'}),
                                max_length=255,
                                required=True)
                    
    last_name = forms.CharField(label="Last Name",
                                widget=forms.TextInput(attrs={'placeholder': 'Dela Cruz', 
                                                            'onkeyup': 'saveValue(this)'}),
                                max_length=255,
                                required=True)

    email = forms.EmailField(label="Email",
                            widget=forms.EmailInput(attrs={'placeholder': 'you@email.com', 
                                                        'onkeyup': 'saveValue(this)'}),
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
    
    USERTYPES = [('COORDINATOR', 'COORDINATOR'),
                ('INTERVIEWER', 'INTERVIEWER'),
                ('NURSE', 'NURSE')]

    user_type = forms.CharField(label='Role Type',
                                max_length=11,
                                widget=forms.Select(choices=USERTYPES))
                                
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'username', 'password1', 'password2', 'user_type']


class UpdateNurseTable(forms.ModelForm):
    CHOICES=[('PASSED','PASSED'),
            ('FAILED','FAILED')]

    medical_result = forms.CharField(label='Medical Result', widget=forms.RadioSelect(choices=CHOICES))
    medical_file = forms.FileField(allow_empty_file=True, widget=forms.ClearableFileInput())
    

    class Meta:
        model = MedicalResult
        fields = ['medical_result', 'medical_file']