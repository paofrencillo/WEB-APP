
from django.urls import path
from django.contrib.auth import views as auth_views
from . import views


urlpatterns = [
        path("", views.login_page, name="login_page"),
    
        ##### ---------- APPLICANT'S URLS ---------- #####
        path("a/login/", views.applicant_login, name="applicant_login"),
        path("a/logout/", views.applicant_logout, name="applicant_logout"),
        path("a/register/", views.applicant_registration, name="applicant_registration"),
        path("a/result/<int:pk>", views.applicant_result, name="applicant_result"),
        path("a/logout/", views.applicant_logout, name="applicant_logout"),
        path("a/profile/<int:pk><str:username>", views.applicant_profile, name="applicant_profile"),
        path("a/profile/details/<int:pk><str:username>", views.applicant_details, name="applicant_details"),
        path("a/profile/credentials/<int:pk><str:username>", views.applicant_credentials, name="applicant_credentials"), 
        path("a/profile/change_password/<int:pk><str:username>", views.change_applicant_password, name="change_applicant_password"),

        ##### ---------- COORDINATOR'S URLS ---------- #####
        path("c/login/", views.coordinator_login, name="coordinator_login"),
        path("c/logout/", views.coordinator_logout, name="coordinator_logout"),
        path("c/table/", views.coordinator_table, name="coordinator_table"),
        path("c/update/<int:pk>", views.coordinator_update, name="coordinator_update"),
        path("c/update/exam/<int:pk>", views.coordinator_update_exam, name="coordinator_update_exam"),
        path("c/update/requirements/<int:pk>", views.coordinator_update_reqs, name="coordinator_update_reqs"),
        path("c/profile/<int:pk><str:username>", views.coordinator_profile, name="coordinator_profile"),
        path("c/profile/change_password/<int:pk><str:username>", views.change_coordinator_password, name="change_coordinator_password"),
        
        ##### ---------- INTERVIEWER'S URLS ---------- #####
        path("i/login/", views.interviewer_login, name="interviewer_login"),
        path("i/logout/", views.interviewer_logout, name="interviewer_logout"),
        path("i/table/", views.interviewer_table, name="interviewer_table"),
        path("i/update/<int:pk>", views.interviewer_update, name="interviewer_update"),
        path("i/profile/<int:pk><str:username>", views.interviewer_profile, name="interviewer_profile"),
        path("i/profile/change_password/<int:pk><str:username>", views.change_interviewer_password, name="change_interviewer_password"),
        
        ##### ---------- NURSE' URLS ---------- #####
        path("n/login/", views.nurse_login, name="nurse_login"),
        path("n/logout/", views.nurse_logout, name="nurse_logout"),
        path("n/table/", views.nurse_table, name="nurse_table"),
        path("n/update/<int:pk>", views.nurse_update, name="nurse_update"),
        path("n/profile/<int:pk><str:username>", views.nurse_profile, name="nurse_profile"),
        path("n/profile/change_password/<int:pk><str:username>", views.change_nurse_password, name="change_nurse_password"),

        ##### ---------- CREATE ACCOUNTS'S URLS ---------- #####
        path("create_account/TUPCAdmission/", views.create_admissionAccounts, name="create_admissionAccounts"),

        ##### ---------- RESET PASSWORD URLS ---------- #####
        path("password_reset/", views.reset_password, name="reset_password"),
        path("password_reset/sent/",
                auth_views.PasswordResetDoneView.as_view(template_name='password_reset/reset_password_sent.html'),
                name="reset_password_sent"),
        path("password_reset/<uidb64>/<token>/",
                auth_views.PasswordResetConfirmView.as_view(template_name='password_reset/reset_password_confirm.html'),
                name="reset_password_confirm"),
        path("accounts/reset/done/",
                auth_views.PasswordResetCompleteView.as_view(template_name='password_reset/reset_password_complete.html'),
                name="reset_password_complete"),

        # URL for generating pdf
        path('a/generate_pdf/<int:pk>', views.applicant_pdf, name="applicant_pdf"),
        path('c/generate_pdf/<int:pk>', views.coordinator_pdf, name="coordinator_pdf"),  
        path('i/generate_pdf/<int:pk>', views.interviewer_pdf, name="interviewer_pdf"),  
        path('n/generate_pdf/<int:pk>', views.nurse_pdf, name="nurse_pdf"),  
]