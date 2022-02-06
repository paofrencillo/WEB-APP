from django.db import models

# Create your models here.
class Applicant(models.Model):
    control_number = models.IntegerField(verbose_name="control_number")
    lastName = models.CharField(max_length=100, verbose_name="lastName")
    firstName = models.CharField(max_length=150, verbose_name="firstName")
    middleName = models.CharField(max_length=100,verbose_name="middleName")
    suffix = models.CharField(max_length=5, verbose_name="suffix")
    birthdate  = models.DateField(verbose_name="birthdate")
    sex =  models.CharField(max_length=6, verbose_name="sex")
    status = models.CharField(max_length=30, verbose_name="status")
    course = models.CharField(max_length=100,verbose_name="course")
    strand = models.CharField(max_length=100, verbose_name="strand")
    email = models.CharField(max_length=255, verbose_name="email")
    password = models.CharField(max_length=255, verbose_name="password")

    class Meta:
        db_table = "ApplicantInfoTable"


class Coordinator(models.Model):
    pass


class Medical(models.Model):
    pass


class Interviewer(models.Model):
    pass


class Accounts_Admins(models.Model):
    pass
    # type = models.CharField()
    # email = models.CharField()
    # password = models.CharField()


class Courses(models.Model):
    pass
    # course_code = models.CharField()
    # course = models.CharField()



