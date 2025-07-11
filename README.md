# InnovacionE

aplicación  para administrar diferentes elementos de un colegio,en la cual se irán agregando apps o módulos para una función especifica como usuarios, notas o calificaciones, planificación de lecciones, exámenes etc. el centro sera la app de saurios la cual debe tener un login para tres tipos de usuarios: 1-estudiante, que solo puede ver las notas; 2-profesor, que puede crear y modificar las notas pero no puede crear usuarios, estudiantes, ni profesores; 3-administrador que puede crear cursos, estudiantes y profesores

---
## Estructura De Archivos
```
innovacionE/
├── backend/                   # Django REST Framework
│   ├── saurios/               # Proyecto principal Django
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

**Objetivo del Sprint:** Al final de este sprint, tendremos una aplicación web funcional con un backend en Django y un frontend en React. La aplicación permitirá a tres tipos de usuarios (Administrador, Profesor, Estudiante) iniciar sesión y ver un dashboard personalizado con las funcionalidades básicas correspondientes a su rol.

---

### Pizarra Kanban del Sprint

#### `📝 Backlog / To Do`

**Fase 1: Configuración del Entorno y Proyecto**
- [✅] **Tarea 1:** Inicializar el entorno de desarrollo.
  - `python -m venv .venv`
  - `source venv/bin/activate`
  - `pip install django djangorestframework psycopg2-binary djangorestframework-simplejwt django-cors-headers`
  - `pip freeze > requirements.txt`
  - `python d`
- [✅] **Tarea 2:** Configurar la base de datos PostgreSQL.
  - Crear una base de datos (`school_db`), un usuario y una contraseña en PostgreSQL.
  - `psql -U postgres -h hostname -p port`
  - `CREATE DATABASE school_db;`
  - `CREATE USER school_user WITH PASSWORD 'school_password';`
  - `GRANT ALL PRIVILEGES ON DATABASE school_db TO school_user;`
  - `ALTER DATABASE school_db OWNER TO school_user;`
  - `\q`

- [⏳<span style="color:green; font-weight:bold;">En-Progreso</span>] **Tarea 3:** Crear y configurar el proyecto de Django.
  - `django-admin startproject backend`
  - Actualizar `backend/settings.py` con la configuración de la base de datos, `rest_framework`, `corsheaders` y `simplejwt`.
- [ ] **Tarea 4:** Crear la app de Django para los usuarios.
  - `python manage.py startapp users`
  - Añadir `'users'` a `INSTALLED_APPS` en `settings.py`.
- [ ] **Tarea 5:** Inicializar el proyecto de React.
  - `npx create-react-app frontend`
  - `cd frontend`
  - `npm install axios react-router-dom`

**Fase 2: Desarrollo del Backend (Django REST Framework)**
- [ ] **Tarea 6:** Definir los modelos de datos.
  - En `users/models.py`, crear un modelo `CustomUser` que herede de `AbstractUser`.
  - Añadir un campo `role` con opciones: `('admin', 'Admin'), ('teacher', 'Teacher'), ('student', 'Student')`.
  - Crear modelos `Course`, `StudentProfile`, y `TeacherProfile` que se enlacen a `CustomUser`.
  - Crear un modelo `Grade` con relación a `StudentProfile` y `Course`.
- [ ] **Tarea 7:** Realizar las migraciones iniciales de la base de datos.
  - `python manage.py makemigrations`
  - `python manage.py migrate`
- [ ] **Tarea 8:** Crear los Serializers.
  - En `users/serializers.py`, crear `UserSerializer`, `StudentSerializer`, `TeacherSerializer`, `CourseSerializer` y `GradeSerializer` para convertir los modelos a JSON.
- [ ] **Tarea 9:** Configurar la autenticación y los permisos.
  - Configurar `djangorestframework-simplejwt` para la autenticación por tokens (JWT).
  - En `users/permissions.py`, crear clases de permiso personalizadas: `IsAdmin`, `IsTeacher`, `IsStudent`.
- [ ] **Tarea 10:** Crear las Vistas (API Endpoints).
  - **Login:** Usar las vistas de `simplejwt` para `/api/token/` y `/api/token/refresh/`.
  - **Creación de Usuarios (Admin):** Una vista en `users/views.py` protegida con `IsAdmin` para crear estudiantes y profesores.
  - **Creación de Cursos (Admin):** Una vista protegida con `IsAdmin` para crear cursos.
  - **Gestión de Notas (Profesor):** Vistas protegidas con `IsTeacher` para crear/modificar notas.
  - **Visualización de Notas (Estudiante):** Una vista protegida con `IsStudent` para ver sus propias notas.
  - **Vista de Perfil:** Un endpoint `/api/users/me/` para que el usuario autenticado obtenga su información y rol.
- [ ] **Tarea 11:** Configurar las URLs de la API.
  - En `school_management/urls.py` y `users/urls.py`, mapear todas las vistas a sus respectivos endpoints.

**Fase 3: Desarrollo del Frontend (React)**
- [ ] **Tarea 12:** Estructurar el proyecto de React.
  - Crear carpetas: `src/components`, `src/pages`, `src/services`, `src/hooks`.
- [ ] **Tarea 13:** Crear el servicio de autenticación (`src/services/api.js`).
  - Implementar funciones para `login`, `logout`, y manejar el token JWT (guardarlo en `localStorage` y añadirlo a las cabeceras de Axios).
- [ ] **Tarea 14:** Implementar el enrutamiento.
  - Usar `react-router-dom` para crear rutas públicas (`/login`) y privadas.
  - Crear un componente `PrivateRoute` que redirija al login si el usuario no está autenticado.
- [ ] **Tarea 15:** Crear la página de Login (`src/pages/LoginPage.js`).
  - Un formulario simple que llame al servicio de autenticación.
- [ ] **Tarea 16:** Crear el Dashboard del Administrador (`src/pages/AdminDashboard.js`).
  - Formularios para crear nuevos usuarios (profesores/estudiantes) y cursos.
  - Hará llamadas a los endpoints protegidos del admin.
- [ ] **Tarea 17:** Crear el Dashboard del Profesor (`src/pages/TeacherDashboard.js`).
  - Mostrará una lista de sus cursos/estudiantes.
  - Permitirá añadir o modificar calificaciones.
- [ ] **Tarea 18:** Crear el Dashboard del Estudiante (`src/pages/StudentDashboard.js`).
  - Mostrará una lista de sus notas por curso (solo lectura).

**Fase 4: Integración y Pruebas**
- [ ] **Tarea 19:** Configurar CORS en Django.
  - En `settings.py`, configurar `CORS_ALLOWED_ORIGINS` para permitir peticiones desde el servidor de desarrollo de React (ej. `http://localhost:3000`).
- [ ] **Tarea 20:** Probar el flujo de autenticación completo.
  - Login desde React -> Obtener token de Django -> Guardar token -> Redirigir al dashboard correcto.
- [ ] **Tarea 21:** Probar las funcionalidades de cada rol.
  - **Admin:** Verificar que puede crear usuarios y cursos.
  - **Profesor:** Verificar que puede gestionar notas pero no crear usuarios.
  - **Estudiante:** Verificar que solo puede ver sus notas.