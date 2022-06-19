
from django.conf import settings
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate, update_session_auth_hash
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import PasswordChangeForm, PasswordResetForm
from django.core.mail import send_mail, BadHeaderError
from django.template.loader import render_to_string
from django.db.models.query_utils import Q
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode
from django.views.decorators.cache import cache_control
from .models import *
from .forms import *


# Create your views here.

# PDF Generation
from django.http import HttpResponse
from django.template.loader import get_template #importing get_template from loader
 
#pisa is a html2pdf converter using the ReportLab Toolkit, the HTML5lib and pyPdf.
from xhtml2pdf import pisa

@login_required(login_url="applicant_login")
def applicant_pdf(request, pk):
    applicant = User.objects.get(id=pk)
    applicant_details = ApplicantDetails.objects.get(applicant_id_id=request.user.pk)
    exam_details = EntranceExamResult.objects.get(applicant_id_id=request.user.pk)
    req_details = ApplicantRequirements.objects.get(applicant_id_id=request.user.pk)
    med_details = MedicalResult.objects.get(applicant_id_id=request.user.pk)
    interv_details = InterviewResult.objects.get(applicant_id_id=request.user.pk)

    res = None
    reqs = [req_details.shs_card, req_details.good_moral_char, req_details.brgy_clearance,
            req_details.birth_cert]
    for i in reqs:
        if i == False:
            res = 'INCOMPLETE'
            break
        else:
            res = 'COMPLETE'

    template_path = "applicant/a-result-pdf.html"

    context = {'a': applicant,
            'ad': applicant_details,
            'ed': exam_details,
            'rq': req_details,
            'res': res,
            'md': med_details,
            'intd': interv_details}

    # Create a Django response object, and specify content_type as pdf
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="{request.user.last_name}.pdf"'
    # find the template and render it.
    template = get_template(template_path)
    html = template.render(context)

    # create a pdf
    pisa_status = pisa.CreatePDF(html, dest=response)
    # if there's an error
    if pisa_status.err:
       return HttpResponse('We had some errors <pre>' + html + '</pre>')
    return response


@login_required(login_url="coordinator_login")
def coordinator_pdf(request, pk):
    coordinator = User.objects.get(id=pk)
    applicant_names = User.objects.filter(user_type='APPLICANT')
    applicant_details = ApplicantDetails.objects.all()
    exam_results = EntranceExamResult.objects.all()
    interview_results = InterviewResult.objects.all()
    medical_results = MedicalResult.objects.all()
    applicant_requirements = ApplicantRequirements.objects.all()
    data = zip(applicant_details, exam_results, medical_results, interview_results, applicant_requirements, applicant_names)
    
    template_path = "coordinator/c-result-pdf.html"

    context = {'data': data, "c": coordinator}

    # Create a Django response object, and specify content_type as pdf
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="{request.user.user_type}.pdf"'
    # find the template and render it.
    template = get_template(template_path)
    html = template.render(context)

    # create a pdf
    pisa_status = pisa.CreatePDF(html, dest=response)
    # if error then show some funny view
    if pisa_status.err:
       return HttpResponse('We had some errors <pre>' + html + '</pre>')
    return response


@login_required(login_url="interviewer_login")
def interviewer_pdf(request, pk):
    interviewer = User.objects.get(id=pk)
    applicants = User.objects.filter(user_type='APPLICANT')
    applicants_details = ApplicantDetails.objects.all()
    interview_results = InterviewResult.objects.all()
    data = zip(applicants, applicants_details, interview_results)
    
    template_path = "interviewer/i-result-pdf.html"

    context = {'data': data, "i": interviewer}

    # Create a Django response object, and specify content_type as pdf
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="{request.user.user_type}.pdf"'
    # find the template and render it.
    template = get_template(template_path)
    html = template.render(context)

    # create a pdf
    pisa_status = pisa.CreatePDF(html, dest=response)
    # if error then show some funny view
    if pisa_status.err:
       return HttpResponse('We had some errors <pre>' + html + '</pre>')
    return response


@login_required(login_url="nurse_login")
def nurse_pdf(request, pk):
    nurse = User.objects.get(id=pk)
    applicants = User.objects.filter(user_type='APPLICANT')
    applicants_details = ApplicantDetails.objects.all()
    medical_results = MedicalResult.objects.all()
    data = zip(applicants, applicants_details, medical_results)
    
    template_path = "medical/n-result-pdf.html"

    context = {'data': data, "n": nurse}

    # Create a Django response object, and specify content_type as pdf
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="{request.user.user_type}.pdf"'
    # find the template and render it.
    template = get_template(template_path)
    html = template.render(context)

    # create a pdf
    pisa_status = pisa.CreatePDF(html, dest=response)
    # if error then show some funny view
    if pisa_status.err:
       return HttpResponse('We had some errors <pre>' + html + '</pre>')
    return response


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def login_page(request):
    pk = request.user.pk
    
    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result', pk)
        elif request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')
        
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            if user.user_type == 'APPLICANT':
                return redirect('applicant_result', request.user.pk)
            elif user.user_type == 'COORDINATOR': 
                return redirect('coordinator_table')
            elif user.user_type == 'INTERVIEWER': 
                return redirect('interviewer_table')
            elif user.user_type == 'NURSE': 
                return redirect('nurse_table')

        else:
            messages.add_message(request, messages.ERROR, "Username or password incorrect.")
            return redirect('/')

    return render(request, "applicant/a-login.html")


def create_admissionAccounts(request):
    pk = request.user.pk

    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result', pk)
        elif request.user.user_type is None or request.user.user_type == '':
            return HttpResponse('Forbidden')
        elif request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')

    else:
        if request.method == 'POST':
            form = RegistrationCredetialsForm(request.POST)

            if form.is_valid():
                user_name = form.cleaned_data.get('username')
                _m_name = form.cleaned_data.get('middle_name')
                _suffix = form.cleaned_data.get('suffix')
                
                if _m_name.upper() == 'N/A':
                    form.instance.middle_name = 'N/A'

                if _suffix.upper() == 'N/A':
                    form.instance.suffix = 'N/A'

                form.save()

                new_user = User.objects.get(username=user_name)
                uploaded_img = request.FILES.get('img_upload')
                new_user.user_img = uploaded_img
                new_user.save()  

                messages.add_message(request, messages.SUCCESS, 'Account created successfully!')
                return redirect('/')
                
            else:
                errors = form.error_messages
                for keys in errors:
                    messages.error(request, errors[keys])

        else:
            form = RegistrationCredetialsForm()
    
    context = {'form': form}
        
    return render(request, 'create-accounts.html', context)


def applicant_login(request):
    pk = request.user.pk
    
    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result', pk)
        elif request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')
    
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        
        if user is not None and user.user_type == 'APPLICANT':
            login(request, user)
            return redirect('applicant_result', request.user.pk)

        else:
            messages.add_message(request, messages.ERROR, "Username or password incorrect.")
            return redirect('applicant_login')

    return render(request, "applicant/a-login.html")


def applicant_logout(request):
    logout(request)
    return redirect('applicant_login')


def applicant_registration(request):
    pk = request.user.pk

    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result', pk)
        elif request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')

    else:
        if request.method == 'POST':
            form1 = RegistrationCredetialsForm(request.POST)
            form2 = ApplicantDetailsForm(request.POST)

            if form1.is_valid() and form2.is_valid():
                user_name = form1.cleaned_data.get('username')
                _m_name = form1.cleaned_data.get('middle_name')
                _suffix = form1.cleaned_data.get('suffix')
                
                if _m_name.upper() == 'N/A':
                    form1.instance.middle_name = 'N/A'

                if _suffix.upper() == 'N/A':
                    form1.instance.suffix = 'N/A'

                form1.save()

                new_user = User.objects.get(username=user_name)
                uploaded_img = request.FILES.get('img_upload')
                new_user.user_img = uploaded_img
                new_user.save()     

                form2.instance.applicant_id  = new_user
                form2.save()
                
                ApplicantRequirements.objects.create(applicant_id = new_user)
                EntranceExamResult.objects.create(applicant_id = new_user)
                MedicalResult.objects.create(applicant_id = new_user)
                InterviewResult.objects.create(applicant_id = new_user)

                messages.add_message(request, messages.SUCCESS, "Registration complete.\
                                    You've redirected to applicant login page.")

                return redirect('applicant_login')

            else:
                print(form1.error_messages)

        else:
            form1 = RegistrationCredetialsForm()
            form2 = ApplicantDetailsForm()

    context = {'form1': form1,
                'form2': form2}

    return render(request, 'applicant/a-reg.html', context)
        

@cache_control(no_cache=True, must_revalidate=True, no_store=True)
@login_required(login_url='applicant_login')
def applicant_result(request, pk):
    pk = request.user.pk

    if request.user.is_authenticated:
        if request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')
    
    applicant_details = ApplicantDetails.objects.get(applicant_id_id=pk)
    exam_details = EntranceExamResult.objects.get(applicant_id_id=pk)
    req_details = ApplicantRequirements.objects.get(applicant_id_id=pk)
    med_details = MedicalResult.objects.get(applicant_id_id=pk)
    interv_details = InterviewResult.objects.get(applicant_id_id=pk)

    res = None
    reqs = [req_details.shs_card, req_details.good_moral_char, req_details.brgy_clearance, req_details.birth_cert]
    for i in reqs:
        if i == False:
            res = 'INCOMPLETE'
            break
        else:
            res = 'COMPLETE'

    context = {'ad': applicant_details,
                'ed': exam_details,
                'rq': req_details,
                'res': res,
                'md': med_details,
                'intd': interv_details}

    return render(request, "applicant/a-result.html", context)


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
@login_required(login_url='applicant_login')
def applicant_profile(request, pk, username):
    pk = request.user.pk
    username = request.user.username

    if request.user.is_authenticated:
        if request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')

    applicant_details = ApplicantDetails.objects.get(applicant_id_id=pk)

    context = {'ad': applicant_details}

    return render(request, 'applicant/a-profile.html', context)


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
@login_required(login_url='applicant_login')
def applicant_details(request, pk, username):
    pk = request.user.pk
    username = request.user.username
    if request.user.is_authenticated:
        if request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')

    user_applicant = ApplicantDetails.objects.get(applicant_id_id=pk)

    if request.method == 'POST':
        user_form1 = EditUserForm1(request.POST, instance=request.user)
        details_form = ApplicantEditDetailsForm(request.POST, instance=user_applicant)

        if user_form1.is_valid() and details_form.is_valid():
            user_form1.save()
            details_form.save()

            applicant = User.objects.get(id=pk)
            uploaded_img = request.FILES.get('img_upload')
            
            if uploaded_img:   
                applicant.user_img = uploaded_img
                applicant.save() 

            return redirect('applicant_profile', pk, username)
                
        else:
            for field in user_form1.errors.items():
                for item in user_form1.errors:
                    print(messages.error(request, '{}: {}'.format(field, item)))

    else:       
        user_form1 = EditUserForm1(instance=User.objects.get(id=pk))
        details_form = ApplicantEditDetailsForm(instance=user_applicant)

    context = {'user_form1': user_form1,
            'details_form': details_form}
            
    return render(request, 'applicant/a-details.html', context)


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
@login_required(login_url='applicant_login')
def applicant_credentials(request, pk, username):
    pk = request.user.pk
    username = request.user.username

    if request.user.is_authenticated:
        if request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')

    if request.method == 'POST':
        user_form2 = EditUserForm2(request.POST, instance=request.user)

        if user_form2.is_valid():
            user_form2.save()

            return redirect('applicant_profile', pk, username)
                
        else:
            for field in user_form2.errors.items():
                for item in user_form2.errors:
                    print(messages.error(request, '{}: {}'.format(field, item)))

    else:       
        user_form2 = EditUserForm2(instance=User.objects.get(id=pk))

    context = {'user_form2': user_form2}
        
    return render(request, 'applicant/a-credentials.html', context)


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
@login_required(login_url='applicant_login')
def change_applicant_password(request, pk, username):
    pk = request.user.pk
    username = request.user.username

    if request.user.is_authenticated:
        if request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')

    if request.method == 'POST':
        password_form = PasswordChangeForm(data=request.POST, user=request.user)

        if password_form.is_valid():
            password_form.save()
            update_session_auth_hash(request, request.user)
            return redirect('applicant_profile', pk, username)
                
    else:       
        password_form = PasswordChangeForm(user=request.user)

    context = {'password_form': password_form}
        
    return render(request, 'applicant/a-change-pass.html', context)


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def coordinator_login(request):
    pk = request.user.pk

    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result', pk)
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')
        
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        
        if user is not None and user.user_type == 'COORDINATOR':
            login(request, user)
            return redirect('coordinator_login')

        else:
            messages.add_message(request, messages.ERROR, "Username or password incorrect.")
            return redirect('coordinator_table')

    return render(request, "coordinator/c-login.html")


def coordinator_logout(request):
    logout(request)
    return redirect('coordinator_login')


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
@login_required(login_url='coordinator_login')
def coordinator_table(request):
    pk = request.user.pk

    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result', pk)
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')

    applicant_names = User.objects.filter(user_type='APPLICANT')
    applicant_details = ApplicantDetails.objects.all()
    exam_results = EntranceExamResult.objects.all()
    interview_results = InterviewResult.objects.all()
    medical_results = MedicalResult.objects.all()
    applicant_requirements = ApplicantRequirements.objects.all()
    data = zip(applicant_details, exam_results, medical_results, interview_results, applicant_requirements, applicant_names)
    
    context = {'data': data}

    return render(request, "coordinator/c-table.html", context)


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
@login_required(login_url='coordinator_login')
def coordinator_update(request, pk):
    pk = request.user.pk

    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result', pk)
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')

    applicant = User.objects.get(id=pk)
    applicant_exam = EntranceExamResult.objects.get(applicant_id_id=pk)
    applicant_req = ApplicantRequirements.objects.get(applicant_id_id=pk)

    exam_result_form = EntranceExamResultForm(instance=applicant_exam)
    requirements_form = ApplicantRequirementsForm(instance=applicant_req)

    context = {'applicant': applicant,
                'ae': applicant_exam,
                'ef': exam_result_form,
                'rf': requirements_form}
        
    return render(request, "coordinator/c-update.html", context)


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
@login_required(login_url='coordinator_login')
def coordinator_update_exam(request, pk):
    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result', request.user.pk)
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')

    applicant_exam = EntranceExamResult.objects.get(applicant_id_id=pk)

    if request.method == 'POST':
        exam_result_form = EntranceExamResultForm(request.POST, instance=applicant_exam)    
        
        if exam_result_form.is_valid():
            exam_result_form.save()

        return redirect("coordinator_update", pk)
        
    return redirect("coordinator_update", pk)


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
@login_required(login_url='coordinator_login')
def coordinator_update_reqs(request, pk):
    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result', request.user.pk)
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')

    applicant_req = ApplicantRequirements.objects.get(applicant_id_id=pk)

    if request.method == 'POST':
        requirements_form = ApplicantRequirementsForm(request.POST, instance=applicant_req)
              
        if requirements_form.is_valid():
            requirements_form.save()
            
        return redirect("coordinator_update", pk)

    return redirect("coordinator_update", pk)


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
@login_required(login_url='coordinator_login')
def coordinator_profile(request, pk, username):
    pk = request.user.pk
    username = request.user.username

    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result', pk)
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')
            
    coor_profile = User.objects.get(id=pk)

    if request.method == 'POST':
        form = EditUserForm3(request.POST, instance=coor_profile)

        if form.is_valid():
            form.save()

        uploaded_img = request.FILES.get('img_upload')

        if uploaded_img is not None:
            coor_profile.user_img = uploaded_img
            coor_profile.save()

        return redirect('coordinator_profile', pk, username)
    
    else:
        form = EditUserForm3(instance=coor_profile)

    context = {'form': form}

    return render(request, 'coordinator/c-profile.html', context)


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
@login_required(login_url='coordinator_login')
def change_coordinator_password(request, pk, username):
    pk = request.user.pk
    username = request.user.username

    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT': 
            return redirect('applicant_result', pk)
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')

    if request.method == 'POST':
        password_form = PasswordChangeForm(data=request.POST, user=request.user)

        if password_form.is_valid():
            password_form.save()
            update_session_auth_hash(request, request.user)
            return redirect('coordinator_profile', pk, username)
                
    else:       
        password_form = PasswordChangeForm(user=request.user)

    context = {'password_form': password_form}
        
    return render(request, 'coordinator/c-change-pass.html', context)


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def interviewer_login(request):
    pk = request.user.pk

    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result', pk)
        elif request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        
        if user is not None and user.user_type == 'INTERVIEWER':
            login(request, user)
            return redirect('interviewer_login')

        else:
            messages.add_message(request, messages.ERROR, "Username or password incorrect.")
            return redirect('interviewer_table')

    return render(request, "interviewer/i-login.html")


def interviewer_logout(request):
    logout(request)
    return redirect('interviewer_login')
    

@cache_control(no_cache=True, must_revalidate=True, no_store=True)
@login_required(login_url='interviewer_login')
def interviewer_table(request):
    pk = request.user.pk

    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result', pk)
        elif request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')

    applicants = User.objects.filter(user_type='APPLICANT')
    applicants_details = ApplicantDetails.objects.all()
    interview_results = InterviewResult.objects.all()
    data = zip(applicants, applicants_details, interview_results)
    
    context = {'data': data}

    return render(request, "interviewer/i-table.html", context)


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
@login_required(login_url='interviewer_login')
def interviewer_update(request, pk):
    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result', request.user.pk)
        elif request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')

    applicant = User.objects.get(id=pk)
    applicant_interview = InterviewResult.objects.get(applicant_id_id=pk)

    if request.method == 'POST':
        interview_result_form = InterviewResultForm(request.POST, instance=applicant_interview)    
        
        if interview_result_form.is_valid():
            interview_result_form.save()

        return redirect("interviewer_update", pk)     

    interview_result_form = InterviewResultForm(instance=applicant_interview)

    context = {'applicant': applicant,
                'irf': interview_result_form}      
        
    return render(request, "interviewer/i-update.html", context)


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
@login_required(login_url='interviewer_login')
def interviewer_profile(request, pk, username):
    pk = request.user.pk
    username = request.user.username

    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result', pk)
        elif request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')

    interviewer_profile = User.objects.get(id=pk)

    if request.method == 'POST':
        form = EditUserForm3(request.POST, instance=interviewer_profile)

        if form.is_valid():
            form.save()

        uploaded_img = request.FILES.get('img_upload')

        if uploaded_img is not None:
            interviewer_profile.user_img = uploaded_img
            interviewer_profile.save()

        return redirect('interviewer_profile', pk, username)
    
    else:
        form = EditUserForm3(instance=interviewer_profile)

    context = {'form': form}

    return render(request, 'interviewer/i-profile.html', context)


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
@login_required(login_url='interviewer_login')
def change_interviewer_password(request, pk, username):
    pk = request.user.pk
    username = request.user.username

    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT': 
            return redirect('applicant_result', pk)
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')

    if request.method == 'POST':
        password_form = PasswordChangeForm(data=request.POST, user=request.user)

        if password_form.is_valid():
            password_form.save()
            update_session_auth_hash(request, request.user)
            return redirect('interviewer_profile', pk, username)
                
    else:       
        password_form = PasswordChangeForm(user=request.user)

    context = {'password_form': password_form}
        
    return render(request, 'interviewer/i-change-pass.html', context)


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def nurse_login(request):
    pk = request.user.pk

    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result', pk)
        elif request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        
        if user is not None and user.user_type == 'NURSE':
            login(request, user)
            return redirect('nurse_login')

        else:
            messages.add_message(request, messages.ERROR, "Username or password incorrect.")
            return redirect('nurse_login')

    return render(request, "medical/n-login.html")


def nurse_logout(request):
    logout(request)
    return redirect('nurse_login')


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
@login_required(login_url='nurse_login')
def nurse_table(request):     
    pk = request.user.pk

    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result', pk)
        elif request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')

    applicants = User.objects.filter(user_type='APPLICANT')
    applicants_details = ApplicantDetails.objects.all()
    medical_results = MedicalResult.objects.all()
    data = zip(applicants, applicants_details, medical_results)
    
    context = {'data': data}

    return render(request, "medical/n-table.html", context)


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
@login_required(login_url='nurse_login')
def nurse_update(request, pk):
    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result', request.user.pk)
        elif request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')

    applicant = User.objects.get(id=pk)
    applicant_medical = MedicalResult.objects.get(applicant_id_id=pk)

    if request.method == 'POST':
        medical_result_form = MedicalResultForm(request.POST, request.FILES, instance=applicant_medical)    
        
        if medical_result_form.is_valid():
            print(medical_result_form)
            medical_result_form.save()

        else:
            print(medical_result_form)

        return redirect("nurse_update", pk)  

    else:
        medical_result_form = MedicalResultForm(instance=applicant_medical)

    context = {'applicant': applicant,
                'mf': medical_result_form}      
        
    return render(request, "medical/n-update.html", context)


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
@login_required(login_url='nurse_login')
def nurse_profile(request, pk, username):
    pk = request.user.pk
    username = request.user.username

    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result', pk)
        elif request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')

    nurse_profile = User.objects.get(id=pk)

    if request.method == 'POST':
        form = EditUserForm3(request.POST, instance=nurse_profile)

        if form.is_valid():
            form.save()

        uploaded_img = request.FILES.get('img_upload')

        if uploaded_img is not None:
            nurse_profile.user_img = uploaded_img
            nurse_profile.save()

        return redirect('nurse_profile', pk, username)
    
    else:
        form = EditUserForm3(instance=nurse_profile)

    context = {'form': form}

    return render(request, 'medical/n-profile.html', context)


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
@login_required(login_url='nurse_login')
def change_nurse_password(request, pk, username):
    pk = request.user.pk
    username = request.user.username

    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT': 
            return redirect('applicant_result', pk)
        elif request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')

    if request.method == 'POST':
        password_form = PasswordChangeForm(data=request.POST, user=request.user)

        if password_form.is_valid():
            password_form.save()
            update_session_auth_hash(request, request.user)
            return redirect('nurse_profile', pk, username)
                
    else:       
        password_form = PasswordChangeForm(user=request.user)

    context = {'password_form': password_form}
        
    return render(request, 'medical/n-change-pass.html', context)


def reset_password(request):
    if request.method == 'POST':
        password_form = PasswordResetForm(request.POST)
        
        if password_form.is_valid():
            data = password_form.cleaned_data['email']
            user_email = User.objects.filter(Q(email=data))
            if user_email.exists():
                for user in user_email:
                    subject = 'Password Reset Request'
                    email_temp_name = 'password_reset/email_pass_message.txt'
                    current_site = get_current_site(request)
                    parameters = {
                        'email' : user.email,
                        'first_name' : user.first_name,
                        'username' : user.username,
                        'domain' : current_site.domain,
                        'uid' : urlsafe_base64_encode(force_bytes(user.pk)),
                        'token' : default_token_generator.make_token(user),
                        'protocol' : 'http', 
                    }

                    message = render_to_string(email_temp_name, parameters)

                    try:
                        send_mail(auth_user=settings.EMAIL_HOST_USER,
                                subject=subject,
                                message=message,
                                from_email='TUP-C Admission',
                                recipient_list=[user.email],
                                fail_silently=False)

                        return redirect('reset_password_sent')
            
                    except BadHeaderError:
                        return HttpResponse('Invalid header found.')
       
            else:
                messages.add_message(request, messages.ERROR, "Use the registered email of your account.")
                return redirect('reset_password')

    
    else:
        password_form = PasswordResetForm()
        context = {'pf' : password_form}

    return render(request, 'password_reset/reset_password.html', context)
    