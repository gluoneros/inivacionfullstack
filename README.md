# InnovacionE

## 📖 Tabla de contenidos
1. [Resumen](#resumen)
2. [Objetivos y Alcance del Proyecto ](#objetivos-y-alcance-del-proyecto)
3. [Tecnologías](#tecnologías)
4. [Arquitectura](#arquitectura)
5. [Roles y Permisos](#roles-y-permisos)
6. [Instalación y Arranque](#instalación-y-arranque)
   1. [Requisitos](#requisitos)
   2. [Variables de entorno](#variables-de-entorno)
   3. [Backend](#backend)
   4. [Frontend](#frontend)
   5. [Docker](#docker)
7. [Endpoints](#endpoints)
8. [Autenticación y JWT](#autenticación-y-jwt)
9. [Testing](#testing)
10. [CI/CD](#ci-cd)
11. [Roadmap](#roadmap)
12. [Contribuir](#contribuir)
13. [Licencia](#licencia)
14. Estructura De Archivos


---
1. [Resumen](#resumen)
Aplicación  para administrar diferentes los diferentes módulos de tareas para la administracion de un colegio,en la cual se irán agregando apps o módulos para cada función especifica como gestion de usuarios, notas o calificaciones, planificación de lecciones, exámenes etc. el centro sera la app de saurios la cual debe tener un login para tres tipos de usuarios: 1-estudiante, que en general solo puede ver las notas, actividades y demas; 2-profesor, que puede crear y modificar las notas y  otros elementos propios de su rol pero no puede crear usuarios, cursos, estudiantes, ni profesores; 3-administrador que puede crear cursos, usuarios y otros elementos propios de su rol; y acudiente que solo puede ver como van sus estudiantes.

2. [Objetivos y Alcance del Proyecto ]
- Objetivos:
    * Permitir a los estudiantes visualizar sus notas, calificaciones, y actividades académicas.
    * Facilitar a los profesores la gestión de notas, planificación de lecciones y evaluaciones.
    * Permitir a los administradores la gestión de usuarios, cursos y otros aspectos institucionales.
    * 
- Alcance:
  El proyecto se enfocará inicialmente en las funcionalidades básicas de gestión de usuarios, cursos y notas. En futuras iteraciones, se planea agregar módulos adicionales como creacion y gestion de horarios, diseño de clases y examenes con apoyo de de IA, chat, notificaciones y comunicación entre padres y profesores, plataforma de pagos, plataforma devideos y clses en linea, creacion de curriculos adapatados a cada institucion, entre otros.


3. [Tecnologías](#tecnologías)
-  El  Stack tecnológico: 
Frontend: React
Backend: Django REST Framework (DRF)
Base de datos: PostgreSQL
Host

4. [Arquitectura](#arquitectura)
- Arquitectura: 
El proyecto seguirá una arquitectura monolitica por capas, donde cada módulo (usuarios, cursos, notas) será una aplicación independiente pero comunicada a través de API REST unificada. Esto permite escalabilidad y mantenimiento independiente de cada componente.  El proyecto seguirá el patron de diseño    

- Patrones de Diseño 
  * Backend (Django + DRF) Service Layer Pattern (Capa de Servicios) para Separar la lógica de negocio de las Vistas (views.py) y Modelos (models.py). Crear un archivo services.py o una carpeta services/ dentro de cada app. Observer Pattern (Señales de Django) Para que Un objeto (sujeto) notifica a otros (observadores) sobre cambios en su estado.
  Uso en el proyecto: Usar django.db.models.signals (post_save) por ejemplo: Cuando se crea un CustomUser (Sujeto), una señal dispara la creación automática del StudentProfile o TeacherProfile correspondiente (Observador). Factory Pattern
  utilizado implícitamente por Django en UserManager (create_user, create_superuser). Se puede extender para lógica compleja de creación de entidades académicas (ej. CourseFactory que inicializa módulos por defecto).

  * Frontend (React) Compound Components Pattern para componentes complejos (ej. Formulario de Registro con múltiples pasos). Container/Presentational Pattern (o Hooks Pattern) Solo se preocupan por cómo se ven las cosas (reciben props, renderizan UI). 

5. [Roles y Permisos](#roles-y-permisos)
- Roles y Permisos:
  * Directivo: Acceso total a todas las funcionalidades (CRUD de usuarios, cursos, notas, etc.).
  * Profesor: Acceso a cursos asignados, gestión de notas y planificación de clases.
  * Estudiante: Acceso a sus cursos, notas y horarios.
  * Acudiente: Acceso a información académica de sus hijos.


6. [Instalación y Arranque](#instalación-y-arranque)
   1. [Requisitos](#requisitos)
   * Python 3.10+
   * Node.js 18+
   * PostgreSQL 13+
   * Docker (opcional)
  
   2. [Variables de entorno](#variables-de-entorno)
   * Crear un archivo .env en la raíz del proyecto con las siguientes variables:
   * DB_NAME=school_db
   * DB_USER=school_user
   * DB_PASSWORD=school_password
   * DB_HOST=localhost
   * DB_PORT=5432

   3. [Backend](#backend)
   * Instalar dependencias:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
   * Configurar la base de datos:
   ```bash
   psql -U postgres -h hostname -p port
    CREATE DATABASE school_db;
    CREATE USER school_user WITH PASSWORD 'school_password';
    GRANT ALL PRIVILEGES ON DATABASE school_db TO school_user;
    ALTER DATABASE school_db OWNER TO school_user;
    \q
   ```

   4. [Frontend](#frontend)
  * Instalar dependencias:
   ```bash
   cd frontend
   npm install
   ```


   5. [Docker](#docker)
   * Construir y ejecutar los contenedores:
   ```bash
   docker-compose up --build
   ```

7. [Endpoints](#endpoints)
   * Autenticación:
   * POST /api/auth/login/ - Iniciar sesión
   * POST /api/auth/register/ - Registrar usuario
   * POST /api/auth/logout/ - Cerrar sesión
   * GET /api/auth/user/ - Obtener información del usuario autenticado

8. [Autenticación y JWT](#autenticación-y-jwt)
   * El backend utiliza JWT para la autenticación. El frontend debe incluir el token en el encabezado de las solicitudes posteriores a la autenticación.
   * Ejemplo de solicitud con token:
   ```bash
   Authorization: Bearer <token> 
   ```




9. [Testing](#testing)
   * Ejecutar pruebas:
   ```bash
   cd backend
   python manage.py test
   ```

10.  [CI/CD](#ci-cd)
    * El proyecto incluye un archivo de configuración para GitHub Actions en .github/workflows/ci.yml. Este archivo configura un flujo de trabajo que se ejecuta en cada push a la rama main. El flujo de trabajo incluye los siguientes pasos:
     * Instalación de dependencias
     * Ejecución de pruebas
     * Construcción de la imagen Docker
     * Despliegue en un entorno de producción (opcional)
     * Para configurar el despliegue en un entorno de producción, se debe agregar un archivo de configuración para GitHub Actions en .github/workflows/cd.yml. Este archivo configura un flujo de trabajo que se ejecuta en cada push a la rama main. El flujo de trabajo incluye los siguientes pasos:
     * Instalación de dependencias
     * Ejecución de pruebas
     * Construcción de la imagen Docker
     * Despliegue en un entorno de producción (opcional)
     * Para configurar el despliegue en un entorno de producción, se debe agregar un archivo de configuración para GitHub Actions en .github/workflows/cd.yml. Este archivo configura un flujo de trabajo que se ejecuta en cada push a la rama main. El flujo de trabajo incluye los siguientes pasos:
     * Instalación de dependencias
     * Ejecución de pruebas
     * Construcción de la imagen Docker
     * Despliegue en un entorno de producción (opcional)
     * Para configurar el despliegue en un entorno de producción, se debe agregar un archivo de configuración para GitHub Actions en .github/workflows/cd.yml. Este archivo configura un flujo

11. [Roadmap](#roadmap)
    * [ ] Sprint 1: MVP de Autenticación de Usuarios y Dashboards
    * [ ] Sprint 2: Implementar el módulo de gestión de usuarios
    * [ ] Sprint 3: Implementar el módulo de gestión de cursos
    * [ ] Sprint 4: Implementar el módulo de gestión de notas
    * [ ] Sprint 5: Implementar el módulo de gestión de tareas
    * [ ] Sprint 6: Implementar el módulo de gestión de foros
    * [ ] ...
    
12. [Contribuir](#contribuir)
    * Si deseas contribuir a este proyecto, por favor sigue estos pasos:
     * Haz un fork del repositorio.
     * Crea una nueva rama para tu contribución.
     * Realiza tus cambios y haz commit de ellos.
     * Haz push de tus cambios a tu fork.
     * Crea un pull request para que tus cambios sean revisados y fusionados.
    
13. [Licencia](#licencia)
    * Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para obtener más información.
  
    

---
14.  Estructura De Archivos
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
