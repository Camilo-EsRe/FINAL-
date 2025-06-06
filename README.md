# Aplicación de Gestión de Contactos (Full-Stack)

Este es un proyecto de aplicación full-stack diseñado para gestionar contactos, permitiendo a los usuarios registrarse, iniciar sesión y realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre sus contactos personales.

---

## 🚀 Características Principales

* **Autenticación de Usuarios:**
    * Registro de nuevos usuarios.
    * Inicio de sesión seguro para usuarios existentes.
    * Generación y gestión de tokens JWT para la autenticación de sesiones.
* **Gestión de Contactos (CRUD):**
    * Listado de contactos asociados al usuario logueado.
    * Creación de nuevos contactos (Nombre, Apellidos, Teléfono Fijo, Celular, Email).
    * Actualización de los datos de contactos existentes.
    * Eliminación de contactos.
* **Seguridad:**
    * Contraseñas hasheadas con `bcryptjs`.
    * Rutas protegidas por token JWT en el backend.
    * Protección de rutas en el frontend basada en la autenticación del usuario.

---

## 🛠️ Tecnologías Utilizadas

### Frontend
* **Angular**: Framework para la construcción de interfaces de usuario dinámicas.
* **TypeScript**: Lenguaje de programación que añade tipado estático a JavaScript.
* **HTML5 / CSS3**: Para la estructura y estilos de la interfaz.
* **HttpClientModule**: Módulo de Angular para realizar peticiones HTTP al backend.
* **FormsModule**: Módulo de Angular para manejar formularios basados en plantillas (`ngModel`).
* **CommonModule**: Módulo de Angular que provee directivas estructurales (`*ngIf`, `*ngFor`).
* **Session Storage**: Para el almacenamiento del token de sesión del usuario.

### Backend
* **Node.js**: Entorno de ejecución de JavaScript en el lado del servidor.
* **Express.js**: Framework web para Node.js, utilizado para construir la API REST.
* **`jsonwebtoken`**: Para implementar JSON Web Tokens (JWT) para la autenticación.
* **`bcryptjs`**: Para el hashing seguro de contraseñas.
* **`cors`**: Middleware para habilitar Cross-Origin Resource Sharing.
* **`dotenv`**: Para la gestión de variables de entorno (ej. secretos JWT, URLs de bases de datos).

### Base de Datos
* **MongoDB (Opción Principal)**: Base de datos NoSQL basada en documentos.
    * **Mongoose**: ODM (Object Data Modeling) para Node.js que simplifica la interacción con MongoDB.
* **MySQL (Opción Alternativa)**: Base de datos relacional.
    * **`mysql2`**: Driver para Node.js para interactuar con bases de datos MySQL.

---

## 📂 Estructura del Proyecto

El proyecto está dividido en dos directorios principales: `frontend` y `backend`.
├── backend/                  # Contiene el código del servidor (Node.js/Express)
│   ├── config/               # Configuración de la base de datos
│   ├── controllers/          # Lógica de negocio para autenticación y contactos
│   ├── middleware/           # Middleware para verificación de token JWT
│   ├── models/               # Definiciones de esquemas de datos (MongoDB/Mongoose)
│   ├── routes/               # Definición de las rutas de la API
│   ├── .env                  # Variables de entorno (NO se sube a repositorios públicos)
│   ├── package.json          # Metadatos y dependencias del backend
│   └── server.js             # Punto de entrada del servidor
└── frontend/                 # Contiene el código de la aplicación Angular
├── src/                  # Código fuente principal de Angular
│   ├── app/              # Módulo principal de la aplicación Angular
│   │   ├── components/   # Componentes de UI (Login, Register, ContactList, etc.)
│   │   ├── guards/       # Guards de rutas (AuthGuard)
│   │   ├── models/       # Interfaces de modelos de datos (User, Contact)
│   │   ├── services/     # Servicios (AuthService, ContactService)
│   │   ├── app.component.* # Componente raíz
│   │   ├── app.module.ts # Módulo principal de Angular
│   │   └── app-routing.module.ts # Configuración de rutas de Angular
│   ├── environments/     # Variables de entorno para Angular
│   ├── assets/           # Archivos estáticos (imágenes, etc.)
│   └── ... (otros archivos de configuración de Angular)
├── angular.json          # Configuración de Angular CLI
├── package.json          # Metadatos y dependencias del frontend
├── tsconfig.*.json       # Archivos de configuración de TypeScript
└── ... (otros archivos de configuración)
## ⚙️ Configuración y Ejecución

### **Requisitos Previos**

* **Node.js** (v14 o superior recomendado) y **npm** (v6 o superior) o **Yarn** instalados.
* **Git** (opcional, pero recomendado para control de versiones).
* **Servidor de Base de Datos**: **MongoDB** o **MySQL** instalado y corriendo.

### **Paso 1: Configurar la Base de Datos**

#### Opción A: MongoDB
1.  **Instala MongoDB Community Server**: Sigue las instrucciones oficiales de MongoDB para tu sistema operativo. Asegúrate de que el servicio de MongoDB esté iniciado (a menudo ejecutando `mongod` en una terminal).
2.  **Configura `.env` del Backend**: En la carpeta `backend`, crea un archivo `.env` con la siguiente línea:
    ```
    MONGO_URI=mongodb://localhost:27017/contactosdb
    ```
    (El nombre de la base de datos `contactosdb` se creará automáticamente al primer uso si no existe).

#### Opción B: MySQL
1.  **Instala MySQL Community Server**: Sigue las instrucciones oficiales de MySQL para tu sistema operativo. Recuerda la contraseña del usuario `root` que configures. Asegúrate de que el servicio de MySQL esté iniciado.
2.  **Crea la Base de Datos y Tablas**: Abre tu cliente MySQL (ej. MySQL Workbench, línea de comandos) e inicia sesión. Ejecuta las siguientes consultas SQL:
    ```sql
    CREATE DATABASE IF NOT EXISTS contactosdb;
    USE contactosdb;

    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        nombre VARCHAR(255) NOT NULL,
        apellido VARCHAR(255),
        telefono_fijo VARCHAR(20),
        celular VARCHAR(20) NOT NULL,
        email VARCHAR(255),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    ```
3.  **Configura `.env` del Backend**: En la carpeta `backend`, crea un archivo `.env` con las siguientes líneas:
    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_contraseña_de_root_mysql
    DB_NAME=contactosdb
    ```

### **Paso 2: Configurar y Ejecutar el Backend (API REST)**

1.  **Navega al directorio `backend`**:
    ```bash
    cd backend
    ```
2.  **Instala las dependencias de Node.js**:
    ```bash
    npm install
    # o
    # yarn install
    ```
3.  **Configura el archivo `.env`** (si no lo hiciste en el paso 1).
4.  **Inicia el servidor de desarrollo del backend**:
    ```bash
    npm start
    # o
    # node server.js
    ```
    El servidor se ejecutará por defecto en `http://localhost:3000`. Deberías ver un mensaje como "Servidor corriendo en el puerto 3000" y "MongoDB Conectado..." o "MySQL Conectado..." en tu terminal.

### **Paso 3: Configurar y Ejecutar el Frontend (Aplicación Angular)**

1.  **Navega al directorio `frontend`**:
    ```bash
    cd frontend
    ```
2.  **Instala las dependencias de Angular**:
    ```bash
    npm install
    # o
    # yarn install
    ```
3.  **Configura `src/environments/environment.ts`**: Asegúrate de que `apiUrl` apunte a la dirección de tu backend. Por defecto, debería ser:
    ```typescript
    // src/environments/environment.ts
    export const environment = {
      production: false,
      apiUrl: 'http://localhost:3000/api' // Ajusta si tu backend corre en otro puerto/dominio
    };
    ```
4.  **Inicia el servidor de desarrollo de Angular**:
    ```bash
    ng serve --open
    ```
    Esto compilará y abrirá la aplicación en tu navegador (generalmente en `http://localhost:4200`).

---

## 🌐 Endpoints de la API (Backend)

Todos los endpoints tienen el prefijo `/api`.

### Autenticación
* `POST /api/auth/register`
    * **Body:** `{ "email": "string", "password": "string" }`
    * **Descripción:** Registra un nuevo usuario.
* `POST /api/auth/login`
    * **Body:** `{ "email": "string", "password": "string" }`
    * **Descripción:** Autentica un usuario y devuelve un token JWT.

### Contactos (Requieren Token JWT en el encabezado `x-auth-token`)
* `GET /api/contacts`
    * **Descripción:** Obtiene todos los contactos del usuario autenticado.
* `POST /api/contacts`
    * **Body:** `{ "nombre": "string", "apellido": "string (opcional)", "telefonoFijo": "string (opcional)", "celular": "string", "email": "string (opcional)" }`
    * **Descripción:** Crea un nuevo contacto para el usuario autenticado.
* `PUT /api/contacts/:id`
    * **Body:** `{ "nombre": "string (opcional)", "apellido": "string (opcional)", ... }` (los campos a actualizar)
    * **Descripción:** Actualiza un contacto específico por su ID.
* `DELETE /api/contacts/:id`
    * **Descripción:** Elimina un contacto específico por su ID.

---

## ⚠️ Notas Importantes

* **Variables de Entorno (`.env`)**: El archivo `.env` contiene información sensible (ej. claves secretas de JWT, credenciales de DB) y **NO DEBE SER SUBIDO** a repositorios públicos como GitHub. Asegúrate de que esté listado en tu `.gitignore`.
* **Errores de CORS**: Si encuentras errores de "CORS policy", verifica que el middleware `cors` esté correctamente configurado en `backend/server.js`.
* **Conexión a la Base de Datos**: Asegúrate de que tu servidor de base de datos esté corriendo **antes** de iniciar el backend.
* **Depuración**: Utiliza la consola del navegador (F12) para depurar el frontend y la terminal donde ejecutas el backend para ver errores del servidor.
