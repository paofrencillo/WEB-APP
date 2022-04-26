
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import *
from .forms import RegistrationCredetials, UpdateNurseTable


# Create your views here.
def blank_page(request):
    return render(request, "applicant/a-login.html")


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

            user = authenticate(request, username=username, password=password)

            if user is not None:
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
            form = RegistrationCredetials(request.POST)

            if form.is_valid():
                form.instance.user_type = 'APPLICANT'
                f_name = form.cleaned_data.get('first_name')
                l_name = form.cleaned_data.get('last_name')
                user_name = form.cleaned_data.get('username')
                form.save()

                new_userId = User.objects.get(username=user_name)
                
                ApplicantDetails(
                    applicant_id = new_userId,
                    first_name = f_name,
                    middle_name = request.POST.get('m-name'),
                    last_name = l_name,
                    suffix = request.POST.get('suffix'),
                    fullname = l_name + ', ' + f_name + ' ' +
                            request.POST.get('m-name') + ' ' +
                            request.POST.get('suffix'),
                    birth_date = request.POST.get('birthdate'),
                    sex = request.POST.get('sex'),
                    status = request.POST.get('status'),
                    course = request.POST.get('course'),
                    shs_strand = request.POST.get('strand')
                ).save()

                ApplicantRequirements.objects.create(
                    applicant_id = new_userId
                )

                EntranceExamResult.objects.create(
                    applicant_id = new_userId
                )

                MedicalResult.objects.create(
                    applicant_id = new_userId
                )

                InterviewResult.objects.create(
                    applicant_id = new_userId
                )
                messages.add_message(request, messages.SUCCESS, "Registration complete.\
                                    You've redirected to applicant login page.")
                return redirect('applicant_login')

        else:
            form = RegistrationCredetials()
        
    return render(request, 'applicant/a-reg.html', {'form': form})
        

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
    return render(request, "medical/n-login.html")


def nurse_logout(request):
    logout(request)
    return redirect('nurse_login')


@login_required(login_url='nurse_login')
def nurse_table(request):
    form = UpdateNurseTable(use_required_attribute=False)
    applicant_details = ApplicantDetails.objects.all()
    medical_result = MedicalResult.objects.all()
    data = zip( applicant_details, medical_result)
    
    return render(request, "medical/n-table.html", {'form': form,
                                                    'data': data})

# def nurse_update_table(request, applicant_id_id):
#     if request.method == 'POST':
#         get_medical_details = MedicalResult.objects.get()
#         form = UpdateNurseTable(request.POST)


#         medical_result = MedicalResult.objects.all()
#         print(medical_result)


#     return render(request, "medical/n-table.html", {'form': form,
#                                                     'mr': medical_result})




    