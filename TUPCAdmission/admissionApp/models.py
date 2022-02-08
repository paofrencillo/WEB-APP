from django.db import models


# Create your models here.
class ApplicantInfo(models.Model):
    control_number = models.IntegerField(verbose_name="control_number", unique=True)
    fullName = models.CharField(max_length=255, verbose_name="fullName")
    birthdate  = models.DateField(verbose_name="birthdate")
    sex =  models.CharField(max_length=6, verbose_name="sex")
    status = models.CharField(max_length=30, verbose_name="status")
    course = models.CharField(max_length=100,verbose_name="course")
    strand = models.CharField(max_length=100, verbose_name="strand")
    email = models.EmailField(max_length=255, verbose_name="email")
    password = models.CharField(max_length=255, verbose_name="password")


class Coordinator(models.Model):
    control_number = models.IntegerField(verbose_name="control_number", unique=True)
    score =  models.IntegerField(verbose_name="control_number")
    card = models.BooleanField()
    bc = models.BooleanField()
    gmc = models.BooleanField()
    psa = models.BooleanField()
    

class Medical(models.Model):
    name = models.CharField(max_length=50, verbose_name="name")
    control_number = models.IntegerField(null=True, verbose_name="control_number", unique=True)
    course = models.CharField(max_length=50, verbose_name="course")
    email = models.EmailField(max_length=100, verbose_name="email")
    medical_result = models.CharField(max_length=50, verbose_name="result")
    medical_file = models.ImageField(upload_to = 'image/')


class Interviewer(models.Model):
    name = models.CharField(max_length=50, verbose_name="name")
    control_number = models.IntegerField(verbose_name="control_number", unique=True)
    interview_date  = models.DateField(verbose_name="interview_date")
    venue = models.CharField(max_length=50, verbose_name="venue")
    interviewer = models.CharField(max_length=50, verbose_name="interviewer")
    interviewer_result = models.CharField(max_length=50, verbose_name="result")

    class Meta:
        db_table = "InterviewerInfoTable"


class Accounts_Admins(models.Model):
    account_type = models.CharField(max_length=10, verbose_name="account_type")
    email = models.EmailField(max_length=100, verbose_name="email")
    password = models.CharField(max_length=255, verbose_name="password")


class Courses(models.Model):
    course_code = models.CharField(max_length=10, verbose_name="course_code")
    course = models.CharField(max_length=100, verbose_name="course")
