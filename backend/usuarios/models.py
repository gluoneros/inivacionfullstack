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
    date_of_birth = models.DateField(null=True, blank=True)
    school = models.CharField(max_length=100, blank=True)  # opcional, depende del rol

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"


class StudentProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='student_profile')
    
#    school = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.school}" or self.user.username


class TeacherProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='teacher_profile')
#    school = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.school}" or self.user.username     


class AdminProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='admin_profile')
#    school = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.school}" or self.user.username


class AcudienteProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='acudiente_profile')
    students = models.ManyToManyField(StudentProfile, related_name='acudientes', blank=True)
#    school = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.school}" or self.user.username 
