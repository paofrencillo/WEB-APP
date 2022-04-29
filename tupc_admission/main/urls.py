
from django.urls import path
from . import views


urlpatterns = [
    path("", views.blank_page, name="blank_page"),
    path("a/login/", views.applicant_login, name="applicant_login"),
    path("a/logout/", views.applicant_logout, name="applicant_logout"),
    path("a/register/", views.applicant_registration, name="applicant_registration"),
    path("a/result/", views.applicant_result, name="applicant_result"),
    path("a/logout/", views.applicant_logout, name="applicant_logout"),
    path("a/editApplicantAccount/<int:pk><str:username>", views.applicant_edit_account, name="applicant_edit_account"),
    path("c/login/", views.coordinator_login, name="coordinator_login"),
    path("c/logout/", views.coordinator_logout, name="coordinator_logout"),
    path("c/overview/", views.coordinator_table, name="coordinator_table"),
    path("c/examDetails/", views.exam_table, name="exam_table"),
    path("i/login/", views.interviewer_login, name="interviewer_login"),
    path("i/logout/", views.interviewer_logout, name="interviewer_logout"),
    path("i/table/", views.interviewer_table, name="interviewer_table"),
    path("n/login/", views.nurse_login, name="nurse_login"),
    path("n/logout/", views.nurse_logout, name="nurse_logout"),
    path("n/table/", views.nurse_table, name="nurse_table"),
    path("createAccountTUPCAdmission/", views.create_admissionAccounts, name="create_admissionAccounts"),
    path("n/update_nurse/<int:pk>", views.nurse_update_table, name="nurse_update_table"),
]