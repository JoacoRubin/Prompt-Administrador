# 🎯 JrubinsteinApp - Administrador de Tareas por Voz

## 📝 Descripción del Proyecto

**JrubinsteinApp** es una aplicación web full-stack moderna que permite a los usuarios gestionar sus tareas de manera eficiente mediante **voz o texto**. La aplicación incorpora autenticación segura con JWT, recuperación de contraseña por email, y reconocimiento de voz para crear tareas sin necesidad de escribir.

### 🎯 Propósito
Facilitar la gestión de tareas personales mediante una interfaz intuitiva que combina tecnologías web modernas con reconocimiento de voz, permitiendo a los usuarios crear, editar, completar y eliminar tareas de forma rápida y accesible.

---

## 🚀 Tecnologías Utilizadas

### **Frontend**
- ⚛️ **React 19.2.0** - Librería principal para la UI
- 🎨 **Vite 7.2.4** - Build tool y dev server ultra-rápido
- 🧭 **React Router 7.10.0** - Navegación entre páginas
- 🎤 **Web Speech API** - Reconocimiento de voz nativo del navegador
- 🎭 **Lucide React** - Iconos modernos
- 📦 **localStorage** - Persistencia de tokens JWT
- 🎨 **CSS Vanilla** - Estilos personalizados sin frameworks

### **Backend**
- 🟢 **Node.js con Express 5** - Framework del servidor
- 🍃 **MongoDB + Mongoose** - Base de datos NoSQL
- 🔐 **JWT (jsonwebtoken)** - Autenticación y autorización
- 🔒 **bcryptjs** - Hash seguro de contraseñas
- 📧 **Nodemailer** - Envío de emails (recuperación de contraseña, verificación)
- 🛡️ **Helmet** - Headers de seguridad HTTP
- 🚦 **Express Rate Limit** - Protección contra ataques de fuerza bruta
- 🌐 **CORS** - Configuración de políticas de origen cruzado
- 🔍 **Sanitización** - Protección contra inyección NoSQL

### **Infraestructura y Deployment**
- 🌩️ **MongoDB Atlas** - Base de datos en la nube
- 🚀 **Render** - Hosting del backend (Node.js)
- ⚡ **Vercel** - Hosting del frontend (React)
- 🔐 **Variables de entorno (.env)** - Gestión segura de credenciales

### **🌐 URLs de Producción**
- **Backend (API)**: https://prompt-administrador-1.onrender.com
- **Frontend (Web App)**: https://prompt-administrador.vercel.app

---

## 🤖 Uso de Inteligencia Artificial en el Desarrollo

Durante el desarrollo de este proyecto se utilizó **GitHub Copilot** y **herramientas de IA generativa** para optimizar y acelerar múltiples aspectos del proceso:

### **1. Generación de Componentes React**
- **Prompt utilizado**: "Crear un componente de lista de tareas con capacidad de edición inline, marcado como completada y eliminación"
- **Resultado**: Componentes `TaskList`, `TaskItem` con toda la lógica necesaria
- **Impacto**: Redujo el tiempo de desarrollo en ~40%

### **2. Configuración de Seguridad**
- **Prompt utilizado**: "Implementar middleware de seguridad para Express con helmet, rate limiting y sanitización de MongoDB"
- **Resultado**: Archivo `security.js` con todas las medidas de seguridad
- **Impacto**: Implementación completa de seguridad en minutos

### **3. Sistema de Autenticación JWT**
- **Prompt utilizado**: "Crear sistema completo de autenticación con JWT incluyendo registro, login, verificación de email y recuperación de contraseña"
- **Resultado**: Controllers, middlewares, rutas y modelos completos
- **Impacto**: Sistema de auth robusto en 30 minutos vs 4-6 horas manualmente

### **4. Reconocimiento de Voz**
- **Prompt utilizado**: "Crear hook personalizado de React para Web Speech API con manejo de errores y soporte multiidioma"
- **Resultado**: Hook `useSpeechRecognition` reutilizable
- **Impacto**: Funcionalidad compleja implementada y testeada rápidamente

### **5. Optimización de Código**
- **Refactorización**: Consolidación de llamadas API repetitivas en función `apiCall()` centralizada
- **Validación**: Implementación de verificación de expiración de tokens JWT en el frontend
- **Manejo de errores**: Sistema centralizado de manejo de errores 401

### **6. Diseño de UI/UX**
- **Prompts utilizados**: 
  - "Diseñar sistema de colores profesional para app de productividad"
  - "Crear animaciones CSS para feedback visual de acciones del usuario"
- **Resultado**: Interfaz moderna con animaciones suaves y paleta de colores coherente

### **7. Templates de Email**
- **Prompt utilizado**: "Crear templates HTML responsivos para emails de recuperación de contraseña"
- **Resultado**: Templates profesionales con estilos inline

## 🏗️ Arquitectura del Proyecto

```
Prompt/
├── backend/                    # Servidor Node.js + Express
│   ├── src/
│   │   ├── config/            # Configuraciones (DB, Email, HTTPS)
│   │   ├── controllers/       # Lógica de negocio
│   │   ├── middleware/        # Auth, Security, Rate Limiting
│   │   ├── models/            # Modelos de Mongoose
│   │   ├── routes/            # Rutas de Express
│   │   ├── templates/         # Templates de emails HTML
│   │   └── index.js           # Punto de entrada
│   ├── .env                   # Variables de entorno
│   └── package.json
│
└── frontend/                   # Aplicación React
    ├── src/
    │   ├── components/        # Componentes reutilizables
    │   │   ├── auth/          # ProtectedRoute
    │   │   └── layout/        # Layout, Header, Footer
    │   ├── hooks/             # Custom hooks (useSpeechRecognition)
    │   ├── pages/             # Páginas (Home, Auth, Dashboard)
    │   ├── router/            # Configuración de rutas
    │   ├── utils/             # Utilidades (auth, API calls)
    │   ├── index.css          # Estilos globales
    │   └── main.jsx           # Punto de entrada
    ├── .env                   # Variables de entorno
    └── package.json
```

---

## 🔧 Instalación y Configuración Local

### **Prerrequisitos**
- Node.js 18+ instalado
- MongoDB Atlas cuenta (o MongoDB local)
- Gmail con contraseña de aplicación configurada

### **1. Clonar el Repositorio**
```bash
git clone <url-repositorio>
cd Prompt
```

### **2. Configurar Backend**
```bash
cd backend
npm install

# Crear archivo .env con:
URI_DB=mongodb+srv://usuario:password@cluster.mongodb.net/dbname
JWT_SECRET=tu_secret_super_seguro_minimo_32_caracteres
PORT=1111
FRONTEND_URL=http://localhost:5173
EMAIL_USER=tu_correo@gmail.com
PASS_GOOGLE_APP=contraseña_app_gmail
ADMIN_EMAIL=tu_correo@gmail.com

# Iniciar servidor
npm run dev
```

### **3. Configurar Frontend**
```bash
cd ../frontend
npm install

# Crear archivo .env con:
VITE_API_URL=http://localhost:1111

# Iniciar aplicación
npm run dev
```

### **4. Acceder a la Aplicación**
- Frontend: http://localhost:5173
- Backend: http://localhost:1111

## 📚 Funcionalidades Principales

### ✅ Gestión de Tareas
- ➕ Crear tareas por texto o voz
- ✏️ Editar tareas inline
- ✔️ Marcar como completadas
- 🗑️ Eliminar individual o todas
- 🔄 Sincronización en tiempo real

### 🔐 Autenticación
- 📝 Registro de usuarios con verificación de email
- 🔓 Login con JWT (tokens de 1 hora)
- 🔒 Recuperación de contraseña por email
- 🛡️ Rutas protegidas
- ⏱️ Validación de expiración de tokens en frontend

### 🎤 Reconocimiento de Voz
- 🗣️ Crear tareas hablando
- 🌍 Soporte multiidioma (configurable)
- 🔴 Indicador visual de grabación activa
- ❌ Manejo de errores de permisos

### 🔒 Seguridad
- 🔐 Hash de contraseñas con bcrypt
- 🛡️ Headers de seguridad con Helmet
- 🚦 Rate limiting (100 requests/15min)
- 🧹 Sanitización anti-NoSQL injection
- ✅ Validación de tokens JWT
- 📧 Verificación de email obligatoria

---

## 👨‍💻 Autor

**Joaquín Lautaro Rubinstein**
- Universidad: UTN 
- Email: jrubinstein@frba.utn.edu.ar
- Proyecto: Prompt Engineering 2026

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos para la materia de Prompt Engineering en UTN.

