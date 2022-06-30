# Generated by Django 4.0.4 on 2022-06-30 02:22

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('middle_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('suffix', models.CharField(max_length=10)),
                ('user_type', models.CharField(max_length=20)),
                ('user_img', models.ImageField(blank=True, null=True, upload_to='imgs/')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='ApplicantDetails',
            fields=[
                ('applicant_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('birth_date', models.DateField(blank=True, null=True)),
                ('sex', models.CharField(max_length=6)),
                ('status', models.CharField(max_length=50)),
                ('course', models.CharField(max_length=100)),
                ('shs_strand', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='ApplicantRequirements',
            fields=[
                ('applicant_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('shs_card', models.BooleanField(default=False)),
                ('good_moral_char', models.BooleanField(default=False)),
                ('brgy_clearance', models.BooleanField(default=False)),
                ('birth_cert', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='EntranceExamResult',
            fields=[
                ('applicant_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('room', models.CharField(max_length=30)),
                ('date_taken', models.DateField(blank=True, null=True)),
                ('time_taken', models.TimeField(blank=True, null=True)),
                ('time_finished', models.TimeField(blank=True, null=True)),
                ('score', models.IntegerField(blank=True, null=True)),
                ('exam_result', models.CharField(blank=True, max_length=6)),
            ],
        ),
        migrations.CreateModel(
            name='InterviewResult',
            fields=[
                ('applicant_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('date_taken', models.DateField(blank=True, null=True)),
                ('venue', models.CharField(blank=True, max_length=30)),
                ('interviewer', models.CharField(blank=True, max_length=100)),
                ('interview_result', models.CharField(blank=True, max_length=6)),
            ],
        ),
        migrations.CreateModel(
            name='MedicalResult',
            fields=[
                ('applicant_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('medical_result', models.CharField(blank=True, max_length=6)),
                ('medical_filename', models.CharField(blank=True, max_length=255)),
                ('medical_file', models.FileField(blank=True, null=True, upload_to='med_files/')),
            ],
        ),
    ]
