# InnovacionE

## Descripcion
Aplicación  para administrar diferentes los diferentes módulos de tareas para la administracion de un colegio,en la cual se irán agregando apps o módulos para cada función especifica como gestion de usuarios, notas o calificaciones, planificación de lecciones, exámenes etc. el centro sera la app de saurios la cual debe tener un login para tres tipos de usuarios: 1-estudiante, que en general solo puede ver las notas, actividades y demas; 2-profesor, que puede crear y modificar las notas y  otros elementos propios de su rol pero no puede crear usuarios, cursos, estudiantes, ni profesores; 3-administrador que puede crear cursos, usuarios y otros elementos propios de su rol; y acudiente que solo puede ver como van sus estudiantes.

## Objetivos y Alcance del Proyecto
- Objetivos:
    * Permitir a los estudiantes visualizar sus notas, calificaciones, y actividades académicas.
    * Facilitar a los profesores la gestión de notas, planificación de lecciones y evaluaciones.
    * Permitir a los administradores la gestión de usuarios, cursos y otros aspectos institucionales.
    * 
- Alcance:
  El proyecto se enfocará inicialmente en las funcionalidades básicas de gestión de usuarios, cursos y notas. En futuras iteraciones, se planea agregar módulos adicionales como creacion y gestion de horarios, diseño de clases y examenes con apoyo de de IA, chat, notificaciones y comunicación entre padres y profesores, plataforma de pagos, plataforma devideos y clses en linea, creacion de curriculos adapatados a cada institucion, entre otros.


## Arquitectura y Tecnologías
-  El  Stack tecnológico: 
Frontend: React
Backend: Django REST Framework (DRF)
Base de datos: PostgreSQL
Hosting: local

- Arquitectura: 
El proyecto seguirá una arquitectura monolitica por capas, donde cada módulo (usuarios, cursos, notas) será una aplicación independiente pero comunicada a través de API REST unificada. Esto permite escalabilidad y mantenimiento independiente de cada componente.  El proyecto seguirá el patron de diseño    

- Patrones de Diseño 
  * Backend (Django + DRF) Service Layer Pattern (Capa de Servicios) para Separar la lógica de negocio de las Vistas (views.py) y Modelos (models.py). Crear un archivo services.py o una carpeta services/ dentro de cada app. Observer Pattern (Señales de Django) Para que Un objeto (sujeto) notifica a otros (observadores) sobre cambios en su estado.
  Uso en el proyecto: Usar django.db.models.signals (post_save) por ejemplo: Cuando se crea un CustomUser (Sujeto), una señal dispara la creación automática del StudentProfile o TeacherProfile correspondiente (Observador). Factory Pattern
  utilizado implícitamente por Django en UserManager (create_user, create_superuser). Se puede extender para lógica compleja de creación de entidades académicas (ej. CourseFactory que inicializa módulos por defecto).

  * Frontend (React) Compound Components Pattern para componentes complejos (ej. Formulario de Registro con múltiples pasos). Container/Presentational Pattern (o Hooks Pattern) Solo se preocupan por cómo se ven las cosas (reciben props, renderizan UI). 


---
## Estructura De Archivos
```
innovacionE/
├── backend/                   # Django REST Framework
│   ├── innovacionE/           # Proyecto principal Django
│   │   ├── __init__.py
│   │   ├── settings.py        # Config DB, apps, JWT, etc.
│   │   ├── urls.py            # Rutas globales
│   │   └── wsgi.py
│   │
│   ├── usuarios/              # App de autenticación y perfiles
│   │   ├── migrations/
│   │   ├── __init__.py
│   │   ├── models.py          # Modelos Usuario/Perfil
│   │   ├── serializers.py     # Serializers para JWT
│   │   ├── permissions.py     # Clases de permisos (Admin/Profesor/Estudiante)
│   │   ├── views.py           # Viewsets (Login, Register, CRUD)
│   │   └── urls.py            # Rutas de usuarios
│   │
│   ├── manage.py
│   └── requirements.txt       # Dependencias (Django, DRF, SimpleJWT, psycopg2)
│
├── frontend/                  # Aplicación React (Vite)
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── assets/            # Imágenes/estilos globales
│   │   ├── components/        # Componentes reutilizables
│   │   │   ├── Auth/
│   │   │   │   └── LoginForm.jsx
│   │   │   └── Shared/
│   │   │       └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Admin/
│   │   │   │   └── Dashboard.jsx
│   │   │   ├── Profesor/
│   │   │   │   └── Dashboard.jsx
│   │   │   ├── Estudiante/
│   │   │   │   └── Dashboard.jsx
│   │   │   └── Auth/
│   │   │       └── LoginPage.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js         # Config Axios
│   │   │   └── auth.js        # Funciones JWT
│   │   │
│   │   ├── stores/            # Zustand/Redux (opcional)
│   │   ├── App.jsx            # Router principal
│   │   └── main.jsx           # Renderizado
│   │
│   ├── package.json
│   └── vite.config.js
│
├── docker-compose.yml         # Config para PostgreSQL y servicios
├── README.md                  # Instrucciones de despliegue
└── .gitignore
```
## Sprints

### **Sprint 1: MVP de Autenticación de Usuarios y Dashboards**

**Duración:** 2 semanas (10 días hábiles)

**Objetivo del Sprint:** Al final de este sprint, tendremos una aplicación web funcional con un backend en Django (DRF) y un frontend en React. La aplicación permitirá a 4 tipos de usuarios (Directivo, Profesor, Estudiante y Acudiente) iniciar sesión y ver un dashboard personalizado solo con los datos de su perfil.

---

### Pizarra Kanban del Sprint

#### `📝 Backlog / To Do`

**Fase 1: Configuración del Entorno y Proyecto**
- [✅] **Tarea 1:** Inicializar el entorno de desarrollo.
  - `python3 -m venv .venv`
  - `source .venv/bin/activate`
  - `pip install django djangorestframework psycopg2-binary djangorestframework-simplejwt django-cors-headers`
  - `pip freeze > requirements.txt`
- [✅] **Tarea 2:** Configurar la base de datos PostgreSQL.
  - Crear una base de datos (`school_db`), un usuario y una contraseña en PostgreSQL.
  - `psql -U postgres -h hostname -p port`
  - `CREATE DATABASE school_db;`
  - `CREATE USER school_user WITH PASSWORD 'school_password';`
  - `GRANT ALL PRIVILEGES ON DATABASE school_db TO school_user;`
  - `ALTER DATABASE school_db OWNER TO school_user;`
  - `\q`

- [✅] **Tarea 3:** Crear y configurar el proyecto de Django.
- `mkdir backend`
- `cd backend`
- `django-admin startproject innovacionE .`


- Actualizar `innovacionE/settings.py` con la configuración de la base de datos, `rest_framework`, `corsheaders` y `simplejwt`.
  ```  DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'school_db',
        'USER': 'school_user',
        'PASSWORD': 'school_password',
        'HOST': 'localhost',  # o la IP/hostname de tu servidor PostgreSQL
        'PORT': '5432',       # puerto por defecto de PostgreSQL
    }
}
AUTH_USER_MODEL = "usuarios.User"```
- [✅] **Tarea 4:** Crear la app de Django para los usuarios.
  - `python manage.py startapp usuarios`
  - Añadir `'usuarios'` a `INSTALLED_APPS` en `settings.py`.
- [✅] **Tarea 5:** Inicializar el proyecto de React.
  - `npx create-react-app frontend`
  - `cd frontend`
  - `npm install axios react-router-dom`

**Fase 2: Desarrollo del Backend (Django REST Framework)**
- [⏳<span style="color:green; font-weight:bold;">En-Progreso</span>] **Tarea 6:** Definir los modelos de datos.
  - En `usuarios/models.py`, crear un modelo `User` que herede de `AbstractUser` (ya existe).
  - El modelo `User` debe tener un campo `role` con opciones: `('directivo', 'Directivo'), ('profesor', 'Profesor'), ('estudiante', 'Estudiante'), ('acudiente', 'Acudiente')`.
  - Crear modelos `StudentProfile`, `TeacherProfile`, `DirectivoProfile`, y `AcudienteProfile` que se enlacen a `User` con `OneToOneField`.
  - Cada Profile debe tener campos básicos del perfil (ej: StudentProfile: grade, enrollment_date; TeacherProfile: specialization, hire_date; etc.).
- [ ] **Tarea 7:** Crear señales Django para crear Profiles automáticamente.
  - Crear `usuarios/signals.py` con una señal `post_save` que cree automáticamente el Profile correspondiente cuando se crea un User según su rol.
  - Registrar las señales en `usuarios/apps.py` en el método `ready()`.
- [ ] **Tarea 8:** Crear las migraciones iniciales de la base de datos.
  - `python manage.py makemigrations`
  - `python manage.py migrate`
- [ ] **Tarea 9:** Crear los Serializers para perfiles.
  - En `usuarios/serializers.py`, crear serializers para cada Profile: `StudentProfileSerializer`, `TeacherProfileSerializer`, `DirectivoProfileSerializer`, `AcudienteProfileSerializer`.
  - Crear `UserProfileSerializer` que incluya todos los campos del User y el Profile correspondiente según el rol.
  ```python
  from rest_framework import serializers
  from .models import User, StudentProfile, TeacherProfile, DirectivoProfile, AcudienteProfile

  class StudentProfileSerializer(serializers.ModelSerializer):
      class Meta:
          model = StudentProfile
          fields = ['grade', 'enrollment_date']

  class TeacherProfileSerializer(serializers.ModelSerializer):
      class Meta:
          model = TeacherProfile
          fields = ['specialization', 'hire_date']

  class DirectivoProfileSerializer(serializers.ModelSerializer):
      class Meta:
          model = DirectivoProfile
          fields = ['position']

  class AcudienteProfileSerializer(serializers.ModelSerializer):
      class Meta:
          model = AcudienteProfile
          fields = ['relationship']

  class UserProfileSerializer(serializers.ModelSerializer):
      """Serializer que incluye datos del perfil según el rol"""
      student_profile = StudentProfileSerializer(read_only=True)
      teacher_profile = TeacherProfileSerializer(read_only=True)
      directivo_profile = DirectivoProfileSerializer(read_only=True)
      acudiente_profile = AcudienteProfileSerializer(read_only=True)
      
      class Meta:
          model = User
          fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name', 
                    'document', 'phone', 'date_of_birth', 'date_joined',
                    'student_profile', 'teacher_profile', 'directivo_profile', 'acudiente_profile']
  ``` 
- [ ] **Tarea 10:** Crear permissions.py con clases de permisos.
  - En `usuarios/permissions.py`, crear clases de permiso personalizadas: `IsDirectivo`, `IsProfesor`, `IsEstudiante`, `IsAcudiente`.
  ```python
  from rest_framework.permissions import BasePermission
  from .models import User

  class IsDirectivo(BasePermission):
      def has_permission(self, request, view):
          return request.user and request.user.is_authenticated and request.user.role == User.ROLE_DIRECTIVO

  class IsProfesor(BasePermission):
      def has_permission(self, request, view):
          return request.user and request.user.is_authenticated and request.user.role == User.ROLE_PROFESOR

  class IsEstudiante(BasePermission):
      def has_permission(self, request, view):
          return request.user and request.user.is_authenticated and request.user.role == User.ROLE_ESTUDIANTE

  class IsAcudiente(BasePermission):
      def has_permission(self, request, view):
          return request.user and request.user.is_authenticated and request.user.role == User.ROLE_ACUDIENTE
  ```
- [ ] **Tarea 11:** Mejorar endpoint /me/ para incluir perfil completo.
  - Modificar `MeView` en `usuarios/views.py` para usar `UserProfileSerializer` en lugar de `RegisterSerializer`.
  - El endpoint debe devolver todos los datos del perfil del usuario según su rol.

**Fase 3: Desarrollo del Frontend (React)**
- [✅] **Tarea 12:** Estructurar el proyecto de React.
  - ✅ Ya está estructurado correctamente con carpetas: `src/components`, `src/pages`, `src/services`, `src/context`.
- [✅] **Tarea 13:** Crear el servicio de autenticación (`src/api/axios.js`).
  - ✅ Ya existe con configuración de Axios e interceptores para JWT.
  - ❌ **MEJORAR:** Agregar función para refrescar token automáticamente.
  - ❌ **MEJORAR:** Manejo de errores 401 para redirigir al login.
- [ ] **Tarea 14:** Implementar rutas protegidas con PrivateRoute.
  - ✅ `PrivateRoute` ya existe en `src/routes/PrivateRoute.jsx`.
  - ❌ **AGREGAR:** Usar `PrivateRoute` en `App.jsx` para proteger todas las rutas de perfiles.
  - ❌ **AGREGAR:** Mejorar `PrivateRoute` para aceptar array de roles permitidos (`allowedRoles`).
- [✅] **Tarea 15:** Crear la página de Login (`src/pages/Login.jsx`).
  - ✅ Ya implementada y funcional con redirección según rol.
- [ ] **Tarea 16:** Mejorar Dashboard Directivo - Solo datos del perfil.
  - ❌ **ELIMINAR:** Referencias a crear usuarios y cursos (fuera del alcance del Sprint 1).
  - ✅ **AGREGAR:** Mostrar datos del perfil (nombre completo, email, teléfono, documento, cargo, fecha de nacimiento, etc.).
  - ✅ **AGREGAR:** Botón de logout funcional.
  - ✅ **AGREGAR:** Loading state mientras se cargan los datos.
  - ✅ **AGREGAR:** Manejo de errores básico.
- [ ] **Tarea 17:** Mejorar Dashboard Profesor - Solo datos del perfil.
  - ❌ **ELIMINAR:** Referencias a gestionar notas y estudiantes (fuera del alcance del Sprint 1).
  - ✅ **AGREGAR:** Mostrar datos del perfil (nombre completo, email, teléfono, especialización, fecha de contratación, etc.).
  - ✅ **AGREGAR:** Botón de logout funcional.
  - ✅ **AGREGAR:** Loading state y manejo de errores.
- [ ] **Tarea 18:** Mejorar Dashboard Estudiante - Solo datos del perfil.
  - ❌ **ELIMINAR:** Referencias a ver notas por curso (fuera del alcance del Sprint 1).
  - ✅ **AGREGAR:** Mostrar datos del perfil (nombre completo, email, teléfono, grado, fecha de inscripción, etc.).
  - ✅ **AGREGAR:** Botón de logout funcional.
  - ✅ **AGREGAR:** Loading state y manejo de errores.
- [ ] **Tarea 19:** Mejorar Dashboard Acudiente - Solo datos del perfil.
  - ✅ **AGREGAR:** Mostrar datos del perfil (nombre completo, email, teléfono, relación con estudiante, etc.).
  - ✅ **AGREGAR:** Botón de logout funcional.
  - ✅ **AGREGAR:** Loading state y manejo de errores.

**Fase 4: Integración y Pruebas**
- [✅] **Tarea 20:** Configurar CORS en Django.
  - ✅ Ya configurado en `settings.py` con `CORS_ALLOWED_ORIGINS`.
- [ ] **Tarea 21:** Probar el flujo de autenticación completo.
  - ✅ Login funciona desde React.
  - ❌ **AGREGAR:** Verificar que PrivateRoute protege rutas correctamente.
  - ❌ **AGREGAR:** Verificar redirección automática según rol después del login.
  - ❌ **AGREGAR:** Verificar que tokens se guardan y se usan correctamente en las peticiones.
- [ ] **Tarea 22:** Probar funcionalidades de cada rol según objetivo del Sprint 1.
  - ❌ **ELIMINAR:** Referencias a crear usuarios, cursos, gestionar notas (fuera del alcance).
  - ✅ **AGREGAR:** Verificar que cada rol ve su dashboard correcto.
  - ✅ **AGREGAR:** Verificar que cada rol ve sus datos de perfil completos.
  - ✅ **AGREGAR:** Verificar que no pueden acceder a dashboards de otros roles.
  - ✅ **AGREGAR:** Verificar que el logout funciona correctamente.
  - ✅ **AGREGAR:** Verificar manejo de errores (token expirado, sin conexión, etc.).

## Criterios de Aceptación del Sprint 1

Para considerar el Sprint 1 completado, se debe cumplir:

1. ✅ Usuario puede iniciar sesión con username/password
2. ✅ Usuario es redirigido automáticamente a su dashboard según su rol
3. ✅ Cada dashboard muestra los datos del perfil del usuario (nombre, email, teléfono, datos específicos del rol)
4. ✅ Las rutas de perfiles están protegidas (requieren autenticación)
5. ✅ Usuario no puede acceder a dashboards de otros roles
6. ✅ Usuario puede cerrar sesión
7. ✅ Los datos del perfil se cargan desde el backend (endpoint /me/)
8. ✅ Hay manejo de errores básico (token expirado, sin conexión, etc.)