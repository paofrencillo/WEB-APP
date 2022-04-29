
from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import *
from .forms import RegistrationCredetialsForm, ApplicantDetailsForm, UpdateNurseTableForm

# Create your views here.
def blank_page(request):
    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result')
        elif request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')

    else:
        if request.method == 'POST':
            username = request.POST.get('applicant-username')
            password = request.POST.get('applicant-password')

            print(username, password)

            user = authenticate(request, username=username, password=password)

            if (user is not None) and (user.user_type == 'APPLICANT'):
                login(request, user)
                return redirect('applicant_result')

            else:
                messages.add_message(request, messages.ERROR, "Username or password incorrect.")

    return render(request, "applicant/a-login.html")

def create_admissionAccounts(request):
    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result')
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
                form.save()
                
            else:
                errors = form.error_messages
                for keys in errors:
                    messages.error(request, errors[keys])

        else:
            form = RegistrationCredetialsForm()
    
    context = {'form': form}
        
    return render(request, 'create-accounts.html', context)
        

def applicant_login(request):
    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result')
        elif request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')

    else:
           if request.method == 'POST':
            username = request.POST.get('applicant-username')
            password = request.POST.get('applicant-password')

            print(username, password)

            user = authenticate(request, username=username, password=password)

            if (user is not None) and (user.user_type == 'APPLICANT'):
                login(request, user)
                return redirect('applicant_result')

            else:
                messages.add_message(request, messages.ERROR, "Username or password incorrect.")

    return render(request, "applicant/a-login.html")


def applicant_logout(request):
    logout(request)
    return redirect('applicant_login')


def applicant_registration(request):
    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result')
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
                print("!!!!!!!!!!!!!!!!!!!!!!!!")
                form1.instance.user_type = 'APPLICANT'
                f_name = form1.cleaned_data.get('first_name')
                l_name = form1.cleaned_data.get('last_name')
                user_name = form1.cleaned_data.get('username')
                form1.save()

                new_user = User.objects.get(username=user_name)
                uploaded_img = request.FILES.get('img_upload')
                new_user.user_img = uploaded_img
                new_user.save()

                print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
                _m_name = form2.cleaned_data.get('middle_name')
                _suffix = form2.cleaned_data.get('suffix')

                if _m_name.upper() == 'N/A':
                    form2.instance.middle_name = ''

                if _suffix.upper() == 'N/A':
                    form2.instance.suffix = ''
                
                new_applicant = User.objects.get(username=user_name)
                form2.instance.applicant_id  = new_applicant
                form2.instance.first_name= f_name
                form2.instance.last_name = l_name

                form2.save()

                EntranceExamResult.objects.create(
                    applicant_id = new_user
                )

                MedicalResult.objects.create(
                    applicant_id = new_user
                )

                InterviewResult.objects.create(
                    applicant_id = new_user
                )

                messages.add_message(request, messages.SUCCESS, "Registration complete.\
                                    You've redirected to applicant login page.")

                return redirect('applicant_login')
                
            else:
                errors = form1.error_messages

                for keys in errors:
                    messages.error(request, errors[keys])


        else:
            form1 = RegistrationCredetialsForm()
            form2 = ApplicantDetailsForm()

    context = {'form1': form1,
                'form2': form2}

    return render(request, 'applicant/a-reg.html', context)
        

@login_required(login_url='applicant_login')
def applicant_result(request):
    applicant_details = ApplicantDetails.objects.filter(applicant_id=request.user.pk)[0]
    exam_details = EntranceExamResult.objects.filter(applicant_id=request.user.pk)[0]
    req_details = ApplicantRequirements.objects.filter(applicant_id=request.user.pk)[0]
    med_details = MedicalResult.objects.filter(applicant_id=request.user.pk)[0]
    interv_details = InterviewResult.objects.filter(applicant_id=request.user.pk)[0]

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

############################################### DITO KA NA PAO!!!!!!!!!!!!!!
@login_required(login_url='applicant_login')
def applicant_edit_account(request, pk, username):
    get_user_info = ApplicantDetails.objects.get(applicant_id_id=pk)
    username = request.user.username
    print('!!!!!!!!!!!!!!!!!!!!!!',get_user_info, username)

    return render(request, 'applicant/editApplicantAccount.html/')
    #########################################################


def coordinator_login(request):
    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result')
        elif request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')

    else:
        pass

    return render(request, "coordinator/c-login.html")


def coordinator_logout(request):
    logout(request)
    return redirect('coordinator_login')


@login_required(login_url='coordinator_login')
def coordinator_table(request):
    return render(request, "coordinator/c-table.html")


@login_required(login_url='coordinator_login')
def exam_table(request):
    return render(request, "coordinator/exam-table.html")


def interviewer_login(request):
    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result')
        elif request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')
    
    else:
        pass

    return render(request, "interviewer/i-login.html")


def interviewer_logout(request):
    logout(request)
    return redirect('interviewer_login')


@login_required(login_url='interviewer_login')
def interviewer_table(request):
    return render(request, "interviewer/i-table.html")


def nurse_login(request):
    if request.user.is_authenticated:
        if request.user.user_type == 'APPLICANT':
            return redirect('applicant_result')
        elif request.user.user_type == 'COORDINATOR':
            return redirect('coordinator_table')
        elif request.user.user_type == 'NURSE':
            return redirect('nurse_table')
        elif request.user.user_type == 'INTERVIEWER':
            return redirect('interviewer_table')

    else:
        if request.method == 'POST':
            username = request.POST.get('nurse-username')
            password = request.POST.get('nurse-password')

            print(username, password)

            user = authenticate(request, username=username, password=password)

            if (user is not None) and (user.user_type == 'NURSE'):
                login(request, user)
                return redirect('nurse_table')

            else:
                messages.add_message(request, messages.ERROR, "Username or password incorrect.")

    return render(request, "medical/n-login.html")


def nurse_logout(request):
    logout(request)
    return redirect('nurse_login')


@login_required(login_url='nurse_login')
def nurse_table(request):
    form = UpdateNurseTableForm()
    applicant_details = ApplicantDetails.objects.all()
    medical_result = MedicalResult.objects.all()
    data = zip(applicant_details, medical_result)
    
    return render(request, "medical/n-table.html", {'form': form,
                                                    'data': data})

def nurse_update_table(request, pk):
    if request.method == 'POST':
        get_medical_details = MedicalResult.objects.get()
        form = UpdateNurseTableForm(request.POST)


        medical_result = MedicalResult.objects.all()
        print(medical_result)


    return render(request, "medical/n-table.html", {'form': form,
                                                    'mr': medical_result})




    