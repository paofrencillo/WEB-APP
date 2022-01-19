from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.
def home(request):
    return render(request, 'home/home.html')

def applicant_login(request):
    return render(request, 'applicant/applicant-login.html')

def applicant_registration(request):
    return render(request, 'applicant/applicant-reg.html')

def applicant_result(request):
    return render(request, 'applicant/applicant-result.html')

def coordinator_login(request):
    return render(request, 'coordinator/coordinator-login.html')

def medical_login(request):
    return render(request, 'medical/nurse-login.html')

def medical_table(request):
    return render(request, 'medical/nurse-table.html')

def interviewer_login(request):
    return render(request, 'interviewer/interviewer-login.html')

def interviewer_table(request):
    return render(request, 'interviewer/interviewer-table.html')
