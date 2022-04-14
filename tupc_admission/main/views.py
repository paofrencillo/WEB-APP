from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from .models import *
from .forms import RegistrationCredetials


# Create your views here.
def blank_page(request):
    return render(request, "applicant/a-login.html")


def applicant_login(request):
    return render(request, "applicant/a-login.html")


def applicant_registration(request):
    if request.method == 'POST':
        form = RegistrationCredetials(request.POST)

        if form.is_valid():
            form.instance.user_type = 'APPLICANT'
            f_name = form.cleaned_data.get('first_name')
            l_name = form.cleaned_data.get('last_name')
            form.save()

            ApplicantDetails.objects.create(
                applicant_id = User.objects.get(id=User.objects.latest('id').id),
                first_name = f_name,
                middle_name = request.POST.get('m-name'),
                last_name = l_name,
                suffix = request.POST.get('suffix'),
                birth_date = request.POST.get('birthdate'),
                sex = request.POST.get('sex'),
                status = request.POST.get('status'),
                course = request.POST.get('course'),
                shs_strand = request.POST.get('strand')
            )

            ApplicantRequirements.objects.create(
                applicant_id = User.objects.get(id=User.objects.latest('id').id)
            )

            EntranceExamResult.objects.create(
                applicant_id = User.objects.get(id=User.objects.latest('id').id)
            )

            MedicalResult.objects.create(
                applicant_id = User.objects.get(id=User.objects.latest('id').id)
            )

            InterviewResult.objects.create(
                applicant_id = User.objects.get(id=User.objects.latest('id').id)
            )

            return redirect('applicant_login')

    else:
        form = RegistrationCredetials()
    
    return render(request, 'applicant/a-reg.html', {'form': form})
    

def applicant_result(request):
    return render(request, "applicant/a-result.html")


def coordinator_login(request):
    return render(request, "coordinator/c-login.html")


def coordinator_table(request):
    return render(request, "coordinator/c-table.html")


def exam_table(request):
    return render(request, "coordinator/exam-table.html")


def interviewer_login(request):
    return render(request, "interviewer/i-login.html")


def interviewer_table(request):
    return render(request, "interviewer/i-table.html")


def nurse_login(request):
    return render(request, "medical/n-login.html")


def nurse_table(request):
    return render(request, "medical/n-table.html")



