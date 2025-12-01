## Sprints

### **Sprint 1: MVP de Autenticación de Usuarios y Dashboards**

**Duración:** 2 semanas (10 días hábiles)

**Objetivo del Sprint:** Al final de este sprint, tendremos una aplicación web funcional con un backend en Django (DRF) y un frontend en React. La aplicación permitirá a 4 tipos de usuarios (Directivo, Profesor, Estudiante y Acudiente) iniciar sesión y ver un dashboard personalizado solo con los datos de su perfil. Habra una landing page con información básica de la institución y dos formularios, uno para el registro de usuarios y otro para el inicio de sesión.

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
  - Cada Profile debe tener campos específicos: StudentProfile (grade: CharField, enrollment_date: DateField), TeacherProfile (specialization: CharField, hire_date: DateField), DirectivoProfile (position: CharField), AcudienteProfile (relationship: CharField, e.g., 'padre', 'madre').
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
- [ ] **Tarea 12:** Implementar Service Layer en backend.
  - Crear `usuarios/services.py` con lógica de negocio para perfiles (e.g., función `create_profile(user)` que maneje creación automática).
  - Separar lógica de `views.py` y `signals.py` para seguir el patrón Service Layer mencionado en `README.md`.

**Fase 3: Desarrollo del Frontend (React)**
- [✅] **Tarea 13:** Estructurar el proyecto de React.
  -  Ya está estructurado correctamente con carpetas: `src/components`, `src/pages`, `src/services`, `src/context`.
- [✅] **Tarea 14:** Crear el servicio de autenticación (`src/api/axios.js`).
  - [ ✅] **Tarea 15:** Ya existe con configuración de Axios e interceptores para JWT.
  - [ ] **Tarea 16:** **MEJORAR:** Agregar función para refrescar token automáticamente.
  - [ ] **Tarea 17:** **MEJORAR:** Manejo de errores 401 para redirigir al login.
- [ ] **Tarea 18:** Implementar rutas protegidas con PrivateRoute.
  - ✅ `PrivateRoute` ya existe en `src/routes/PrivateRoute.jsx`.
  - [ ] **Tarea 19:** **AGREGAR:** Usar `PrivateRoute` en `App.jsx` para proteger todas las rutas de perfiles (e.g., `<PrivateRoute path="/directivo" component={DashboardDirectivo} allowedRoles={['directivo']} />`).
  - [ ] **Tarea 20:** **AGREGAR:** Mejorar `PrivateRoute` para aceptar array de roles permitidos (`allowedRoles`) y redirigir a login si no autorizado.
- [✅] **Tarea 21:** Crear la página de Login (`src/pages/Login.jsx`).
  - [✅ ] **Tarea 22:** Ya implementada y funcional con redirección según rol.
- [ ] **Tarea 23:** Crear landing page y formularios de registro/login.
  - Implementar `src/pages/Landing.jsx` con información básica de la institución (descripción del colegio, objetivos).
  - Incluir formularios de registro (usando `RegisterSerializer` para crear usuarios) y login, con navegación a rutas respectivas.
  - Asegurar que el registro cree perfiles automáticamente vía señales.
- [ ] **Tarea 24:** Crear componente Dashboard genérico para todos los roles.
  - Desarrollar `src/components/Dashboard.jsx` que reciba `userData` y renderice campos comunes (nombre, email, teléfono, documento, fecha de nacimiento) más específicos por rol (e.g., grade para estudiante, specialization para profesor).
  - Incluir botón de logout funcional, loading state mientras se cargan los datos, y manejo de errores básico.
  - Reutilizar este componente en páginas de cada rol para evitar repetición.

**Fase 4: Integración y Pruebas**
- [✅] **Tarea 25:** Configurar CORS en Django.
  - ✅ Ya configurado en `settings.py` con `CORS_ALLOWED_ORIGINS`.
- [ ] **Tarea 26:** Probar el flujo de autenticación completo.
  - [ ] **Tarea 27:** Login funciona desde React.
  - [ ] **Tarea 28:** **AGREGAR:** Verificar que PrivateRoute protege rutas correctamente.
  -[ ] **Tarea 29:** **AGREGAR:** Verificar redirección automática según rol después del login.
  - [ ] **Tarea 30:** **AGREGAR:** Verificar que tokens se guardan y se usan correctamente en las peticiones.
- [ ] **Tarea 31:** Probar funcionalidades de cada rol según objetivo del Sprint 1.
  - [ ] **Tarea 32:** **AGREGAR:** Verificar que cada rol ve su dashboard correcto.
  - [ ] **Tarea 33:** **AGREGAR:** Verificar que cada rol ve sus datos de perfil completos.
  - [ ] **Tarea 34:** **AGREGAR:** Verificar que no pueden acceder a dashboards de otros roles.
  - [ ] **Tarea 35:** **AGREGAR:** Verificar que el logout funciona correctamente.
  - [ ] **Tarea 36:** **AGREGAR:** Verificar manejo de errores (token expirado, sin conexión, etc.).
- [ ] **Tarea 37:** Pruebas automatizadas.
  - Crear tests en `usuarios/tests.py` para modelos (e.g., creación de perfiles con señales), serializers y views (e.g., endpoint /me/).
  - Ejecutar con `python manage.py test` y agregar tests para frontend si es necesario (e.g., componentes de login).

**Fase 5: Preparación para Futuros Sprints**
- [ ] **Tarea 38:** Crear stubs para módulos futuros.
  - Definir modelos básicos para cursos y notas (e.g., `Course` con campos como name, description) sin vistas completas, para preparar escalabilidad según roadmap en `README.md`.
  - Asegurar que modelos sean extensibles para IA y otros módulos.

## Criterios de Aceptación del Sprint 1

Para considerar el Sprint 1 completado, se debe cumplir:

1. [ ] Usuario puede iniciar sesión con username/password
2. [ ] Usuario es redirigido automáticamente a su dashboard según su rol
3. [ ] Cada dashboard muestra los datos del perfil del usuario (nombre, email, teléfono, datos específicos del rol)
4. [ ] Las rutas de perfiles están protegidas (requieren autenticación)
5. [ ] Usuario no puede acceder a dashboards de otros roles
6. [ ] Usuario puede cerrar sesión
7. [ ] Los datos del perfil se cargan desde el backend (endpoint /me/)
8. [ ] Hay manejo de errores básico (token expirado, sin conexión, etc.)
9. [ ] Landing page con información institucional y formularios de registro/login funcionales
10. [ ] Service Layer implementado en backend para lógica de perfiles
11. [ ] Pruebas automatizadas pasan para modelos y serializers
12. [ ] Stubs de modelos para cursos/notas preparados para próximos sprints