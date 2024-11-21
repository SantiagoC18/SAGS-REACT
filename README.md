# SAGS-REACT - Sistema Avanzado de Gestión de Software  
## React + TypeScript + Vite

### Descripción  
SAGS es una herramienta diseñada para optimizar las etapas de planificación y análisis en el ciclo de vida del software. Ahora, con la implementación de **React con TypeScript** para el frontend, se ha mejorado la experiencia de usuario, haciéndola más robusta, segura y eficiente. SAGS facilita la colaboración entre usuarios y terceros en la generación de documentación, permitiendo a los desarrolladores centrarse en el diseño y programación del software, basándose en documentación clara y estructurada generada con el sistema.  
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Características principales  
- **Automatización del proceso de documentación:** Facilita la creación y estructuración de documentos clave en las primeras fases del desarrollo de software.  
- **Colaboración efectiva:** Mejora la cooperación entre distintos roles en el proyecto, optimizando el flujo de trabajo.  
- **Soporte para múltiples diagramas:** Incluye plantillas y diagramas basados en la norma IEEE-830, como casos de uso, modelo de clases, entidad-relación, entre otros.  
- **Planes personalizables:** Los usuarios pueden elegir entre planes predefinidos o personalizar su plan seleccionando las características que mejor se ajusten a sus necesidades.  
- **Interfaz moderna y tipada:** Con React y TypeScript, el sistema ofrece una experiencia de usuario dinámica, segura y rápida.  
- **Gestión de roles y permisos:** Garantiza la seguridad y control de acceso en las diferentes partes del sistema.  
Currently, two official plugins are available:

## Tecnologías utilizadas  
### Frontend  
- **React con TypeScript:** Para construir una interfaz de usuario moderna, tipada y segura.  
- **TailwindCSS:** Framework CSS para un diseño limpio, escalable y profesional.  
- **Vite:** Para configurar y optimizar el entorno de desarrollo de React con TypeScript.  
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Backend  
- **Python con Flask:** Para manejar las peticiones del servidor.  
- **Flask-RESTful:** Construcción de una API robusta para conectar el frontend con el backend.  
## Expanding the ESLint configuration

### Base de Datos  
- **MySQL:** Para almacenar la información de usuarios, proyectos y planes de forma estructurada.  
If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

### Seguridad  
- **JWT (JSON Web Tokens):** Para la autenticación y autorización segura de usuarios.  
- **Gestión de roles:** Control de permisos basado en roles (administrador, desarrollador, cliente, etc.).  
- Configure the top-level `parserOptions` property like this:

### Compatibilidad  
- **API REST:** Garantiza una comunicación eficiente entre el frontend y el backend.  
- **Escalabilidad:** Diseñado para crecer y adaptarse a las necesidades futuras del proyecto.  
---
## Instalación  
### Requisitos previos  
1. Tener instalado Node.js y npm.  
2. Tener instalado Python y pip.  
3. Tener MySQL configurado en tu máquina.  
### Instrucciones  
**1. Clona este repositorio en tu máquina local.**  
```bash  
git clone https://github.com/SntiagoC18/sags-react  
cd sags-react  
```
**2. Configuración del Frontend (React con TypeScript).**
```bash  
cd frontend  
npm install  
npm run dev  
```
**3. Configuración del Backend (Flask).**
```bash
- cd backend  
- pip install flask  
- pip install flask-mail  
- pip install flask-mysqldb  
- pip install flask-restful  
- pip install pyjwt
```
**4. Configura la base de datos MySQL.**
1. Crea una base de datos local en MySQL.
2. Importa el archivo SQL proporcionado en la carpeta database/.
3. Actualiza las credenciales de conexión en el archivo config.py.

**5. Levanta el servidor backend.**
```bash
    flask run  
```

**6. Levanta el servidor frontend.*
```bash
    npm run dev
```


## Uso del sistema
**Accede a la interfaz de usuario a través de http://localhost:5173.**
**Regístrate, inicia sesión y comienza a gestionar tus proyectos y planes.**



## Estructura del proyecto
sags-react/
├── node_modules/                 # Dependencias instaladas por npm
├── public/                       # Archivos públicos accesibles (favicon, index.html, etc.)
│   ├── index.html                # Punto de entrada del HTML
├── src/                          # Código fuente del proyecto
│   ├── assets/                   # Archivos estáticos como imágenes, íconos, etc.
│   ├── components/               # Componentes reutilizables
│   │   ├── common/               # Componentes compartidos (botones, formularios, etc.)
│   │   ├── layout/               # Componentes relacionados con la estructura del sitio (Header, Footer, Sidebar)
│   │   └── project/              # Componentes específicos de los proyectos
│   ├── pages/                    # Páginas completas del sitio
│   │   ├── Home.tsx              # Página principal
│   │   ├── Login.tsx             # Página de inicio de sesión
│   │   ├── Register.tsx          # Página de registro
│   │   └── Project.tsx           # Página de gestión de proyectos
│   ├── services/                 # Lógica para interactuar con la API
│   │   ├── api.ts                # Configuración de Axios o Fetch
│   │   ├── authService.ts        # Servicios relacionados con la autenticación
│   │   └── projectService.ts     # Servicios para manejar proyectos
│   ├── styles/                   # Archivos de estilos globales o específicos
│   │   ├── global.css            # Estilos globales del proyecto
│   │   └── variables.css         # Variables CSS (colores, fuentes, etc.)
│   ├── context/                  # Contextos de React para manejar estados globales
│   │   ├── AuthContext.tsx       # Contexto para la autenticación
│   │   └── ProjectContext.tsx    # Contexto para los proyectos
│   ├── App.tsx                   # Configuración principal de la aplicación
│   ├── main.tsx                  # Archivo de entrada principal
│   └── router/                   # Configuración de rutas
│       └── AppRouter.tsx         # Archivo con las rutas de la aplicación
├── tsconfig.json                 # Configuración de TypeScript
├── tsconfig.app.json             # Configuración específica para la app
├── tsconfig.node.json            # Configuración para Node.js
├── vite.config.ts                # Configuración de Vite
├── eslint.config.js              # Configuración para ESLint
├── package.json                  # Archivo de dependencias y scripts de npm
├── package-lock.json             # Archivo de bloqueo de dependencias
└── README.md                     # Documentación del proyecto

## ¡Disfruta de la nueva experiencia con SAGS-REACT! 🚀
