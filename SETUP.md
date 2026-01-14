# 🔐 Guía de Configuración - Alke Wallet

## ⚠️ Configuración Inicial (Para Desarrollo)

Este proyecto es una billetera digital educativa construida con JavaScript, jQuery y Bootstrap.

### 🚀 Inicio Rápido

1. **Clonar o descargar el proyecto**
2. **Abrir `index.html` en tu navegador**
3. **Crear tu primera cuenta** haciendo clic en "Crear Cuenta Gratis"

### 👤 Crear Usuarios de Prueba

La aplicación **NO** incluye usuarios predefinidos por razones de seguridad. Para probar la aplicación:

1. Ve a la página de registro: `register.html`
2. Completa el formulario con:
   - Nombre completo
   - Email único
   - Contraseña (mínimo 6 caracteres)
   - Selecciona tu moneda (USD, CLP o EUR)
   - Presupuesto inicial (mínimo $10,000)
   - Opcional: Sube una foto de perfil

3. Una vez creado, inicia sesión con tus credenciales

### 🎨 Características

- ✅ Registro de usuarios con avatar personalizable
- ✅ Múltiples cuentas por usuario
- ✅ Gestión de contactos
- ✅ Presupuestos mensuales
- ✅ Calendario de transacciones
- ✅ Conversión de divisas (USD, EUR, CLP)
- ✅ Validaciones de formularios
- ✅ Almacenamiento local (localStorage)

### 💾 Datos de Usuario

Los datos se almacenan en **localStorage** del navegador. Para resetear la aplicación:

```javascript
// Abrir consola del navegador (F12) y ejecutar:
localStorage.clear();
location.reload();
```

### 🔒 Seguridad

- Las contraseñas se almacenan en texto plano (⚠️ Solo para fines educativos)
- NO usar contraseñas reales
- NO compartir credenciales en repositorios públicos
- En producción, siempre usar encriptación y backend seguro

### 📝 Notas para GitHub

Si subes este proyecto a GitHub como portafolio:

1. ✅ **NO** incluyas usuarios de prueba con contraseñas en el código
2. ✅ Incluye este archivo SETUP.md con instrucciones
3. ✅ Añade screenshots en el README.md
4. ✅ Menciona que es un proyecto educativo
5. ✅ Documenta las tecnologías usadas

### 🛠️ Tecnologías

- HTML5, CSS3
- JavaScript ES6+
- jQuery 3.6
- Bootstrap 5.3
- Font Awesome 6
- LocalStorage API

### 📧 Contacto

Desarrollado como proyecto educativo para portafolio profesional.

---

**⚠️ IMPORTANTE**: Este es un proyecto educativo. Para uso en producción, implementar:
- Backend seguro (Node.js, PHP, etc.)
- Base de datos real (MySQL, MongoDB, etc.)
- Encriptación de contraseñas (bcrypt, etc.)
- Autenticación JWT o sesiones seguras
- HTTPS obligatorio
