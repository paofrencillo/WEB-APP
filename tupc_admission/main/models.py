
from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    middle_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    suffix = models.CharField(max_length=10)
    user_type = models.CharField(max_length=20)
    user_img = models.ImageField(upload_to='imgs/',
                                null=True,
                                blank=True)

class ApplicantDetails(models.Model):
    applicant_id = models.OneToOneField(User,
                                    on_delete=models.CASCADE,
                                    primary_key=True)
    birth_date = models.DateField(blank=True,
                                null=True)
    sex = models.CharField(max_length=6)
    status = models.CharField(max_length=50)
    course = models.CharField(max_length=100)
    shs_strand = models.CharField(max_length=50)


class ApplicantRequirements(models.Model):
    applicant_id = models.OneToOneField(User,
                                    on_delete=models.CASCADE,
                                    primary_key=True)
    shs_card = models.BooleanField(default=False)
    good_moral_char = models.BooleanField(default=False)
    brgy_clearance = models.BooleanField(default=False)
    birth_cert = models.BooleanField(default=False)


class EntranceExamResult(models.Model):
    applicant_id = models.OneToOneField(User,
                                    on_delete=models.CASCADE,
                                    primary_key=True)
    room = models.CharField(max_length=30)
    date_taken = models.DateField(blank=True,
                                    null=True)
    time_taken = models.TimeField(blank=True,
                                    null=True)
    time_finished = models.TimeField(blank=True,
                                    null=True)
    score = models.IntegerField(blank=True,
                                    null=True)
    exam_result = models.CharField(max_length=6,
                                    blank=True)


class MedicalResult(models.Model):
    applicant_id = models.OneToOneField(User,
                                    on_delete=models.CASCADE,
                                    primary_key=True)
    medical_result = models.CharField(max_length=6,
                                        blank=True)
    medical_filename = models.CharField(max_length=255,
                                        blank=True)
    medical_file = models.FileField(upload_to='med_files/',
                                    null=True,
                                    blank=True)


class InterviewResult(models.Model):
    applicant_id = models.OneToOneField(User,
                                    on_delete=models.CASCADE,
                                    primary_key=True)
    date_taken = models.DateField(blank=True,
                                    null=True)
    venue = models.CharField(max_length=30,
                                blank=True)
    interviewer = models.CharField(max_length=100,
                                    blank=True)
    interview_result = models.CharField(max_length=6,
                                        blank=True)