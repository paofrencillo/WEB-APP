
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import ApplicantDetails, ApplicantRequirements, EntranceExamResult, InterviewResult, MedicalResult, User


class RegistrationCredetialsForm(UserCreationForm):
        first_name = forms.CharField(label="First Name",
                                widget=forms.TextInput(attrs={'placeholder': 'Juan',
                                                            'onkeyup': 'saveValue(this)'}),
                                max_length=255,
                                required=True)

        middle_name = forms.CharField(label='Middle Name',
                                widget=forms.TextInput(attrs={'placeholder': 'Type N/A if not applicable',
                                                'onkeyup': 'saveValue(this)'}),
                                max_length=255,
                                required=True)


        last_name = forms.CharField(label="Last Name",
                                widget=forms.TextInput(attrs={'placeholder': 'Dela Cruz',
                                                            'onkeyup': 'saveValue(this)'}),
                                max_length=255,
                                required=True)


        suffix = forms.CharField(label='Suffix',
                            widget=forms.TextInput(attrs={'placeholder': 'Type N/A if not applicable',
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
        

        USERTYPES = [('APPLICANT', 'APPLICANT'),
                ('COORDINATOR', 'COORDINATOR'),
                ('INTERVIEWER', 'INTERVIEWER'),
                ('NURSE', 'NURSE')]

        user_type = forms.CharField(label='Role Type',
                                        max_length=11,
                                        widget=forms.Select(choices=USERTYPES))


        class Meta:
                model = User
                fields = ['first_name', 'middle_name', 'last_name', 'suffix', 'email', 'username', 'password1', 'password2', 'user_type']


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
                fields = ['applicant_id_id', 'birth_date', 'sex', 'status', 'course', 'shs_strand']


class ApplicantChangePasswordForm(forms.ModelForm):
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
                fields = ['password1', 'password2']


class EditUserForm1(forms.ModelForm):
        first_name = forms.CharField(label="First Name",
                                widget=forms.TextInput(attrs={'placeholder': 'Juan'}),
                                max_length=255)

        middle_name = forms.CharField(label='Middle Name',
                                widget=forms.TextInput(attrs={'placeholder': 'Type N/A if not applicable'}),
                                max_length=255)


        last_name = forms.CharField(label="Last Name",
                                widget=forms.TextInput(attrs={'placeholder': 'Dela Cruz'}),
                                max_length=255)


        suffix = forms.CharField(label='Suffix',
                            widget=forms.TextInput(attrs={'placeholder': 'Type N/A if not applicable'}),
                            max_length=255)

        class Meta:
                model = User
                fields = ['first_name', 'middle_name', 'last_name', 'suffix']


class EditUserForm2(forms.ModelForm):
        email = forms.EmailField(label="Email",
                            widget=forms.EmailInput(attrs={'placeholder': 'you@email.com'}),
                            max_length=255)

        username = forms.CharField(label="Username",
                                max_length=255)

        class Meta:
                model = User
                fields = ['email', 'username']


class EditUserForm3(forms.ModelForm):
        first_name = forms.CharField(label="First Name",
                                widget=forms.TextInput(attrs={'placeholder': 'Juan',
                                                        'readonly': ''}),
                                max_length=255,
                                required=False)

        middle_name = forms.CharField(label='Middle Name',
                                widget=forms.TextInput(attrs={'placeholder': 'Type N/A if not applicable',
                                                        'readonly': ''}),
                                max_length=255,
                                required=False)


        last_name = forms.CharField(label="Last Name",
                                widget=forms.TextInput(attrs={'placeholder': 'Dela Cruz',
                                                        'readonly': ''}),
                                max_length=255,
                                required=False)


        suffix = forms.CharField(label='Suffix',
                                widget=forms.TextInput(attrs={'placeholder': 'Type N/A if not applicable',
                                                                'readonly': ''}),
                                max_length=255,
                                required=False)

        email = forms.EmailField(label="Email",
                                widget=forms.EmailInput(attrs={'placeholder': 'you@email.com',
                                                        'readonly': ''}),
                                max_length=255,
                                required=False)

        username = forms.CharField(label="Username",
                                widget=forms.TextInput(attrs={'readonly': ''}),
                                max_length=255,
                                required=False)

        class Meta:
                model = User
                fields = ['first_name', 'middle_name', 'last_name', 'suffix', 'email', 'username']


class ApplicantEditDetailsForm(forms.ModelForm):
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


        birth_date = forms.DateField(label='Birthdate',
                                widget=forms.DateInput(format='%Y-%m-%d',
                                                attrs={'type': 'date'}),
                                input_formats=['%Y-%m-%d'],)

        sex = forms.CharField(label='Sex',
                                max_length=6,
                                widget=forms.Select(choices=SEX))

        status = forms.CharField(label='Admission Status',
                                max_length=35,
                                widget=forms.Select(choices=STATUS))

        course = forms.CharField(label='Course (1st Choice)',
                                max_length=100,
                                widget=forms.Select(choices=COURSES))

        shs_strand = forms.CharField(label='Senior High School Strand',
                                max_length=100,
                                widget=forms.TextInput(attrs={'placeholder': 'Science, Engineering, Technology and Mathematics'}))

        class Meta:
                model = ApplicantDetails
                fields = ['birth_date', 'sex', 'status', 'course', 'shs_strand']


class ApplicantRequirementsForm(forms.ModelForm):
        REMARKS = [('False', 'Not Yet Submitted'),
                ('True', 'Submitted')]

        shs_card = forms.CharField(label='Senior High School Card',
                                max_length=100,
                                widget=forms.Select(choices=REMARKS,
                                                attrs={'disabled': ''}),
                                required=False)

        good_moral_char = forms.CharField(label='Good Moral Character',
                                max_length=100,
                                widget=forms.Select(choices=REMARKS,
                                        attrs={'disabled': ''}),
                                required=False)

        brgy_clearance = forms.CharField(label='Barangay Clearance',
                                max_length=100,
                                widget=forms.Select(choices=REMARKS,
                                        attrs={'disabled': ''}),
                                required=False)

        birth_cert = forms.CharField(label='Birth Certificate',
                                max_length=100,
                                widget=forms.Select(choices=REMARKS,
                                        attrs={'disabled': ''}),
                                required=False)

        class Meta:
                model = ApplicantRequirements
                fields = ['shs_card', 'good_moral_char', 'brgy_clearance', 'birth_cert']


class EntranceExamResultForm(forms.ModelForm):
        RESULT = [('', 'No Result'),
        ('PASSED', 'PASSED'),
        ('FAILED', 'FAILED')]
        
        room = forms.CharField(label='Room Assignment',
                                widget=forms.TextInput(
                                        attrs={'readonly': ''}),
                                max_length=30,
                                required=False)

        date_taken = forms.DateField(label='Date Taken',
                                        widget=forms.DateInput(
                                                format='%Y-%m-%d',
                                                attrs={'readonly': ''}),
                                        input_formats=['%Y-%m-%d'],
                                        required=False)

        time_taken = forms.TimeField(label="Time Taken",
                                        widget=forms.TimeInput(attrs={'type': 'time'}),
                                        required=False)

        time_finished = forms.TimeField(label="Time Finished",
                                        widget=forms.TimeInput(attrs={'type': 'time'}),
                                        required=False)

        score = forms.IntegerField(label="Score",
                                widget=forms.NumberInput(
                                        attrs={'readonly': ''}), 
                                required=False)

        exam_result = forms.CharField(label='Result',
                                        max_length=6,
                                        widget=forms.Select(
                                                choices=RESULT,
                                                attrs={'disabled': ''}),
                                        required=False)

        class Meta:
                model = EntranceExamResult
                fields = ['room', 'date_taken', 'time_taken', 'time_finished', 'score', 'exam_result']


class InterviewResultForm(forms.ModelForm):
        RESULT = [('', 'No Result'),
        ('PASSED', 'PASSED'),
        ('FAILED', 'FAILED')]
        

        date_taken = forms.DateField(label='Date Taken',
                                        widget=forms.DateInput(
                                                format='%Y-%m-%d',
                                                attrs={'readonly': ''}),
                                        input_formats=['%Y-%m-%d'],
                                        required=False)
        
        venue = forms.CharField(label='Venue',
                                max_length=30,
                                widget=forms.TextInput(
                                        attrs={'readonly': ''}),
                                required=False)

        interviewer = forms.CharField(label='Interviewer',
                        max_length=100,
                        widget=forms.TextInput(
                                attrs={'readonly': ''}),
                        required=False)

        interview_result = forms.CharField(label='Result',
                                        max_length=6,
                                        widget=forms.Select(
                                                choices=RESULT,
                                                attrs={'disabled': ''}),
                                        required=False)

        class Meta:
                model = InterviewResult
                fields = ['date_taken', 'venue', 'interviewer', 'interview_result']


class MedicalResultForm(forms.ModelForm):
        CHOICES=[('', 'No Result'),
                ('PASSED','PASSED'),
                ('FAILED','FAILED')]

        medical_result = forms.CharField(label='Medical Result',
                                        widget=forms.Select(choices=CHOICES,
                                                        attrs={'disabled': ''}),
                                        required=False)

        medical_filename = forms.CharField(label='Medical Filename',
                                        widget=forms.TextInput(attrs={'readonly': ''}),
                                        required=False)

        medical_file = forms.FileField(label='Medical File',
                                        widget=forms.FileInput(attrs={'accept':'application/pdf',
                                                        'disabled': ''}),
                                        required=False)
        

        class Meta:
                model = MedicalResult
                fields = ['medical_result', 'medical_filename', 'medical_file']