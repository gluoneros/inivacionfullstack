from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_DIRECTIVO = 'directivo'
    ROLE_PROFESOR = 'profesor'
    ROLE_ESTUDIANTE = 'estudiante'
    ROLE_ACUDIENTE = 'acudiente'

    ROLE_CHOICES = [
        (ROLE_DIRECTIVO, 'Directivo'),
        (ROLE_PROFESOR, 'Profesor'),
        (ROLE_ESTUDIANTE, 'Estudiante'),
        (ROLE_ACUDIENTE, 'Acudiente'),
    ]

    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    document = models.CharField(max_length=30, blank=True, null=True)
    phone = models.CharField(max_length=30, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)

    REQUIRED_FIELDS = ['email', 'role']  # si quieres forzar email
    def __str__(self):
        return f"{self.username} ({self.role})"
