from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('teacher', 'Teacher'),
        ('student', 'Student'),
        ('acudiente', 'Acudiente'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    document = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=True)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)


class StudentProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='student_profile')
    school = models.CharField(max_length=100)
    # Un estudiante puede tener varios acudientes
    # acudientes = models.ManyToManyField('AcudienteProfile', related_name='students', blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.school}"

class TeacherProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='teacher_profile')
    subject = models.CharField(max_length=100)
    school = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.username} - {self.subject}"

class AdminProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='admin_profile')
    school = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.username} - {self.school}"

class AcudienteProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='acudiente_profile')
    # Un acudiente puede tener varios estudiantes
    students = models.ManyToManyField(StudentProfile, related_name='acudientes', blank=True)

    def __str__(self):
        return f"{self.user.username}"