from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(User)
admin.site.register(ApplicantDetails)
admin.site.register(ApplicantRequirements)
admin.site.register(EntranceExamResult)
admin.site.register(MedicalResult)
admin.site.register(InterviewResult)