# Generated by Django 4.0 on 2022-05-31 09:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Verification',
            fields=[
                ('user_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='main.user')),
                ('is_verification_on', models.BooleanField(blank=True, default=False, null=True)),
                ('valid_start', models.DateTimeField(blank=True, null=True)),
                ('valid_end', models.DateTimeField(blank=True, null=True)),
                ('verification_code', models.PositiveIntegerField(blank=True, null=True)),
            ],
        ),
    ]