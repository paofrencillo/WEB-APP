
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import ApplicantDetails, MedicalResult, User


class RegistrationCredetialsForm(UserCreationForm):
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


class ApplicantDetailsForm(forms.ModelForm):
    SEX = [('', ''),
        ('MALE', 'Male'),
        ('FEMALE', 'Female')]

    STATUS = [('', ''),
            ('FRESHMEN', 'Freshmen'),
            ('TRANSFEREE', 'Transferee'),
            ('RETURNEE', 'Returnee'),
            ('CROSS-ENROLEE', 'Cross-Enrollee'),
            ('ALS', 'Alternative Learning System (ALS)')]

    COURSES = [('', ''),
            ('BSCE', 'BS - Civil Engineering'),
            ('BSEE', 'BS - Electrical Engineering'),
            ('BSME', 'BS - Mechanical Engineering'),
            ('BET-ET', 'BET - Electrical Technology'),
            ('BET-ESET', 'BET - Electronics Technology Track: Industrial Automation Technology'),
            ('BET-COET', 'BET - Computer Engineering Technology'),
            ('BET-CT', 'BET - Civil Technology'),
            ('BET-MT', 'BET - Mechanical Technology'),
            ('BET-AT', 'BET - Mechanical Engineering Technology Track: Automative Technology'),
            ('BET-PPT', 'BET - Mechanical Engineering Technology Track: Power Plant Technology'),
            ('BSIE-ICT', 'BSIE - Information and Communication Technology'),
            ('BTTE-AU', 'BTTE - Automative'),
            ('BTTE-EL', 'BTTE - Electrical'),
            ('BTTE-E', 'BTTE - Electronics'),
            ('BTTE-HVACT', 'BTTE - Heating, Ventilation, and Air Conditioning'),
            ('BTTE-CP', 'BTTE - Computer Programming')]

    applicant_id_id = forms.IntegerField(widget=forms.NumberInput(attrs={'type': 'hidden',
                                                                    'value': '0'}))

    middle_name = forms.CharField(label='Middle Name',
                                widget=forms.TextInput(attrs={'placeholder': 'Type N/A if not applicable', 
                                                'onkeyup': 'saveValue(this)'}),
                                max_length=255,                               
                                required=True)
    
    suffix = forms.CharField(label='Suffix',
                            widget=forms.TextInput(attrs={'placeholder': 'Type N/A if not applicable', 
                                                'onkeyup': 'saveValue(this)'}),
                            max_length=255,                               
                            required=True)

    birth_date = forms.DateField(label='Birthdate',
                                widget=forms.DateInput(format='%Y-%m-%d',
                                                    attrs={'onmouseleave': 'saveValue(this)',
                                                            'type': 'date'}),
                                input_formats=['%Y-%m-%d'],
                                required=True)

    sex = forms.CharField(label='Sex',
                        max_length=6,
                        widget=forms.Select(choices=SEX,
                                            attrs={'onclick': 'saveValue(this)'}),
                        required=True)

    status = forms.CharField(label='Admission Status',
                    max_length=35,
                    widget=forms.Select(choices=STATUS,
                                        attrs={'onclick': 'saveValue(this)'}),
                    required=True)

    course = forms.CharField(label='Course (1st Choice)',
                        max_length=100,
                        widget=forms.Select(choices=COURSES,
                                            attrs={'onclick': 'saveValue(this)'}),
                        required=True)

    shs_strand = forms.CharField(label='Senior High School Strand',
                        max_length=100,
                        widget=forms.TextInput(attrs={'placeholder': 'Science, Engineering, Technology and Mathematics', 
                                                'onkeyup': 'saveValue(this)'}),
                        required=True)

    class Meta:
        model = ApplicantDetails
        fields = ['applicant_id_id', 'middle_name', 'suffix', 'birth_date', 'sex', 'status', 'course', 'shs_strand']


class UpdateNurseTableForm(forms.ModelForm):
    CHOICES=[('', ''),
            ('PASSED','PASSED'),
            ('FAILED','FAILED')]


    applicant_id_id = forms.CharField(widget=forms.TextInput(attrs={'type': 'hidden'}))
    medical_result = forms.CharField(label='Medical Result', widget=forms.Select(choices=CHOICES))
    medical_file = forms.FileField(label='Medical File')
    

    class Meta:
        model = MedicalResult
        fields = ['medical_result', 'medical_file']