from django.shortcuts import render
from django.http import JsonResponse
from .models import ApplicantInfo


# Create your views here.
def home(request):
    return render(request, 'home/home.html')

def applicant_login(request):
    return render(request, 'applicant/applicant-login.html')

def applicant_registration(request):
    return render(request, 'applicant/applicant-reg.html')

def create_applicant(request):
    if request.method == 'POST':
        ApplicantInfo.objects.create(
            control_number = request.POST['control_number'],
            fullName = request.POST['fullName'],
            birthdate = request.POST['birthdate'],
            sex = request.POST['sex'],
            status = request.POST['status'],
            course = request.POST['course'],
            strand = request.POST['strand'],
            email = request.POST['email'],
            password = request.POST['password'],
        )

        return render(request, 'applicant/applicant-login.html')

def applicant_result(request):
    return render(request, 'applicant/applicant-result.html')

def coordinator_login(request):
    return render(request, 'coordinator/coordinator-login.html')

def medical_login(request):
    return render(request, 'medical/nurse-login.html')

def medical_table(request):
    students = ApplicantInfo.objects.all()
    return render(request, 'medical/nurse-table.html', {'student':students})

def interviewer_login(request):
    return render(request, 'interviewer/interviewer-login.html')

def interviewer_table(request):
    return render(request, 'interviewer/interviewer-table.html')
