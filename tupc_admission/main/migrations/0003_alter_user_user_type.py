# Generated by Django 4.0.2 on 2022-04-09 04:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_medicalresult_interviewresult_entranceexamresult_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='user_type',
            field=models.CharField(default='APPLICATION', max_length=20),
        ),
    ]
