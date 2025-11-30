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
