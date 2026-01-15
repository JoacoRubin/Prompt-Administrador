# 🎤 Frontend - Gestión de Tareas por Voz

## 📋 Descripción
Aplicación web construida con React y Vite que permite gestionar tareas mediante voz o texto, con autenticación JWT y diseño responsive.

## 🚀 Tecnologías
- **React 19** - Biblioteca UI
- **Vite 7** - Build tool ultra rápido
- **React Router DOM 7** - Enrutamiento
- **Lucide React** - Iconos modernos
- **Web Speech API** - Reconocimiento de voz
- **LocalStorage** - Persistencia de sesión

## ✨ Características

- ✅ Autenticación con JWT
- ✅ Registro y login de usuarios
- ✅ Recuperación de contraseña por email
- ✅ Gestión de tareas CRUD
- ✅ Reconocimiento de voz para crear tareas
- ✅ Validación de tokens en frontend
- ✅ Manejo centralizado de errores
- ✅ Diseño responsive
- ✅ Animaciones suaves
- ✅ Protección de rutas

## 📁 Estructura del Proyecto
```
frontend/
├── public/               # Recursos estáticos
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── auth/
│   │   │   └── ProtectedRoute.jsx
│   │   └── layout/
│   │       └── Layout.jsx
│   ├── hooks/           # Custom hooks
│   │   └── useSpeechRecognition.js
│   ├── pages/           # Páginas de la app
│   │   ├── AuthPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Home.jsx
│   │   ├── ResetPassword.jsx
│   │   ├── Tutorial.jsx
│   │   └── VerifyEmail.jsx
│   ├── router/          # Configuración de rutas
│   │   └── RouterApp.jsx
│   ├── utils/           # Utilidades
│   │   └── auth.js      # Helpers de autenticación
│   ├── index.css        # Estilos globales
│   └── main.jsx         # Punto de entrada
├── .env.example         # Template de variables
├── index.html
├── package.json
├── vite.config.js
└── vercel.json         # Configuración Vercel
```

## 🔐 Variables de Entorno

Crea un archivo `.env` con:

```env
VITE_API_URL=http://localhost:1111
```

Para producción en Vercel:
```env
VITE_API_URL=https://tu-backend.onrender.com
```

## 🎨 Páginas Principales

### **🔐 AuthPage** (`/auth`)
- Login y registro de usuarios
- Validación de formularios
- Toggle entre login/registro
- Manejo de errores

### **🏠 Home** (`/mis-tareas`)
- Lista de tareas del usuario
- Crear tareas por voz o texto
- Marcar como completadas
- Editar y eliminar tareas
- Reconocimiento de voz en español

### **⚙️ Dashboard** (`/dashboard`)
- Configuración de idioma
- Información del usuario
- Historial de tareas (próximamente)

### **🔑 Recuperación de Contraseña**
- `/forgot-password` - Solicitar link
- `/reset-password/:token` - Nueva contraseña

### **✉️ Verificación** (`/verify-email/:token`)
- Confirmar cuenta por email

## 🛠️ Instalación Local

```bash
# Clonar el repositorio
git clone <tu-repo>
cd frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
echo "VITE_API_URL=http://localhost:1111" > .env

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Previsualizar build
npm run preview
```

## 🌐 Deployment en Vercel

### **Método 1: Dashboard de Vercel**

1. **Crear cuenta en Vercel** → https://vercel.com

2. **Import Project:**
   - Conectar con GitHub
   - Seleccionar repositorio
   - Framework: `Vite`
   - Root Directory: `frontend/`

3. **Configurar Variables de Entorno:**
   ```
   VITE_API_URL=https://tu-backend.onrender.com
   ```

4. **Deploy** ✅

### **Método 2: Vercel CLI**

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel

# Configurar variables en dashboard
# Deploy a producción
vercel --prod
```

### **URL del Frontend:**
```
https://tu-app.vercel.app
```

## 📱 Funcionalidades Especiales

### **🎤 Reconocimiento de Voz**
```javascript
// Hook personalizado
const { isListening, toggle } = useSpeechRecognition({
  onResult: addTask,
  lang: 'es-AR'
});
```

**Idiomas soportados:**
- Español (Argentina, España, México)
- Inglés (US, UK)
- Portugués (Brasil)
- Y más...

### **🔒 Autenticación Segura**
- Validación de tokens JWT en frontend
- Detección automática de expiración
- Logout automático en 401
- Redirección inteligente

### **🛡️ Protección de Rutas**
```jsx
<Route path="/mis-tareas" element={
  <ProtectedRoute>
    <Home />
  </ProtectedRoute>
} />
```

## 🎨 Personalización de Estilos

Los estilos están en `src/index.css` con:
- Variables CSS personalizadas
- Diseño responsive
- Animaciones suaves
- Tema moderno azul/verde

### **Colores principales:**
```css
--color-primary: #2979FF;    /* Azul eléctrico */
--color-secondary: #00C896;  /* Verde menta */
--color-accent: #FFD54F;     /* Amarillo creativo */
```

## 📊 Estructura de Rutas

```
/                      → Login/Registro
/auth                  → Login/Registro
/mis-tareas            → Home (Protegida)
/dashboard             → Dashboard (Protegida)
/tutorial              → Cómo usar la app
/forgot-password       → Recuperar contraseña
/reset-password/:token → Nueva contraseña
/verify-email/:token   → Verificar email
```

## 🔧 Scripts Disponibles

```bash
npm run dev      # Desarrollo con hot reload
npm run build    # Build para producción
npm run preview  # Previsualizar build local
npm run lint     # Verificar código con ESLint
```

## 🐛 Troubleshooting

### **Error de CORS**
Asegúrate de que `FRONTEND_URL` en el backend incluya tu dominio de Vercel

### **Token expirado**
Los tokens duran 1 hora. El frontend detecta automáticamente y redirige al login

### **Voz no funciona**
Requiere HTTPS en producción y permisos de micrófono

## 📝 Notas de Producción

- ✅ Vercel usa HTTPS automáticamente
- ✅ El archivo `vercel.json` maneja SPA routing
- ✅ Headers de seguridad configurados
- ✅ Build optimizado con Vite
- ✅ Cache automático de assets

## 🚀 Performance

- **Lighthouse Score:** 95+
- **Build time:** ~20s
- **First Contentful Paint:** < 1s
- **Time to Interactive:** < 2s

## 📚 Recursos Adicionales

- [Documentación React](https://react.dev)
- [Documentación Vite](https://vitejs.dev)
- [Vercel Docs](https://vercel.com/docs)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

ISC

---

**Desarrollado con ❤️ por Joaquín Lautaro Rubinstein**
