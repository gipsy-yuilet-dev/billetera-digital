# 🔐 Instrucciones de Login - Alke Wallet

## ✅ Problema Resuelto

El login ahora funciona correctamente. Los usuarios de prueba se cargan automáticamente cuando accedes a la página de login.

## 👥 Usuarios de Prueba Disponibles

### Usuario 1: Juan Soto
- **Email:** `juan_soto@loquesea.com`
- **Contraseña:** `Juan123`
- **Moneda:** USD (Dólares)
- **Saldo inicial:** $100,000

### Usuario 2: Yolanda Sultana
- **Email:** `yolanda.sultana@loquesea.com`
- **Contraseña:** `Yoli321`
- **Moneda:** CLP (Pesos Chilenos)
- **Saldo inicial:** $1,500,000

### Usuario 3: Claudio Gallo
- **Email:** `cgallo@loqusea.com`
- **Contraseña:** `Kikiriki987`
- **Moneda:** EUR (Euros)
- **Saldo inicial:** €25,000

## 🚀 Cómo Usar la Aplicación

### 1. Acceder al Login
- Abre el navegador y ve a: `http://localhost/talentoDigital/proyectoWallet/login.html`
- Los usuarios de prueba se cargarán automáticamente

### 2. Iniciar Sesión
- Escribe uno de los emails de prueba
- Escribe la contraseña correspondiente
- Haz clic en "Ingresar"

### 3. Si tienes problemas
- Haz clic en "🔄 Recargar usuarios" en la parte inferior del login
- Esto limpiará todo y recargará los usuarios de prueba

## 📝 Registro de Nuevos Usuarios

Para crear un nuevo usuario:

1. Ve a la página de registro: `register.html`
2. Completa el formulario con:
   - **Nombre completo** (sin números)
   - **Email** (debe ser único)
   - **Contraseña** (mínimo 6 caracteres)
   - **Confirmar contraseña**
   - **Presupuesto inicial** (mínimo $10,000)
3. Haz clic en "Crear Cuenta"

### ✅ Validaciones Implementadas:
- ✔️ Email válido y único
- ✔️ Contraseña mínimo 6 caracteres
- ✔️ Las contraseñas deben coincidir
- ✔️ Presupuesto mínimo $10,000
- ✔️ Nombre sin números
- ✔️ Campos de dinero solo aceptan números

## 🔧 Características Implementadas

### 1. **Validaciones en Formularios**
- Solo números en campos de dinero
- Solo letras en nombres de contactos
- Validación en tiempo real

### 2. **Conversión de Monedas**
- Muestra tu saldo en USD, EUR y CLP
- Conversión automática en el dashboard

### 3. **Información de Usuario**
- Nombre del usuario en navbar
- Fecha y hora actual que se actualiza cada minuto
- Presente en todos los módulos

### 4. **Aviso de Saldo Insuficiente**
- Alerta en tiempo real cuando intentas enviar más dinero del disponible
- Previene transacciones sin fondos

### 5. **Mensaje Personalizado en Movimientos**
- Muestra tu nombre y fecha actual
- Mensaje contextual sobre tus transacciones

## 🗂️ Estructura de Datos

Cada usuario tiene:
- **Email** (único)
- **Contraseña**
- **Nombre**
- **Moneda** (USD, CLP, EUR)
- **Cuentas** (una o más)
- **Transacciones**
- **Contactos**
- **Presupuesto**

## 💾 Almacenamiento

Los datos se guardan en:
- **localStorage**: Base de datos de usuarios (`usersDB`)
- **sessionStorage**: Usuario actual logueado (`currentUser`)

## 🛠️ Archivos Importantes

- `js/init-users.js` - Carga usuarios de prueba automáticamente
- `js/services/authService.js` - Maneja login y registro
- `js/services/storageService.js` - Gestiona localStorage
- `js/pages/login.js` - Lógica del formulario de login
- `js/pages/register.js` - Lógica del formulario de registro

## 🆘 Solución de Problemas

### El login no funciona:
1. Verifica que estás usando el email y contraseña correctos
2. Haz clic en "Recargar usuarios" en el login
3. Abre la consola del navegador (F12) y busca errores
4. Verifica que todos los archivos JS se carguen correctamente

### Los usuarios no se cargan:
1. Abre la consola del navegador (F12)
2. Escribe: `localStorage.clear()` y presiona Enter
3. Recarga la página

### No se muestran las transacciones:
1. Los usuarios de prueba tienen transacciones de bienvenida
2. Realiza depósitos o envíos para crear nuevas transacciones

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Verifica que todos los archivos JS estén en su lugar
3. Asegúrate de estar usando un navegador moderno (Chrome, Firefox, Edge)

---

**¡Tu aplicación Alke Wallet está lista para usar!** 🎉
