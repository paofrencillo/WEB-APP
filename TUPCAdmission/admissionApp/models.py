from distutils.command.upload import upload
from typing_extensions import Required
from django.db import models

# Create your models here.
class Applicant(models.Model):
    # control_number = models.CharField()
    pass


class Coordinator(models.Model):
    pass


class Medical(models.Model):
    name = models.CharField(max_length=50, verbose_name="name")
    control_number = models.IntegerField(null=True, verbose_name="control_number")
    course = models.CharField(max_length=50, verbose_name="course")
    email = models.EmailField(max_length=100, verbose_name="email")
    medical_result = models.CharField(max_length=50, verbose_name="result")
    medical_file = models.ImageField(upload_to = 'image/')

    class Meta:
        db_table = "MedicalInfoTable",

class Interviewer(models.Model):
    pass


class Accounts_Admins(models.Model):
    pass


