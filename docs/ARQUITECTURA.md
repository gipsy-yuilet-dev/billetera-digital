# 🏗️ Arquitectura Técnica - Alke Wallet

## 📋 Índice
1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Arquitectura Modular](#arquitectura-modular)
3. [Flujo de Datos](#flujo-de-datos)
4. [Guía de Implementación](#guía-de-implementación)
5. [Mejores Prácticas](#mejores-prácticas)
6. [Deployment](#deployment)

---

## 📂 Estructura del Proyecto

```
proyectoWallet/
├── index.html              # Página de inicio
├── login.html              # Página de login
├── register.html           # Página de registro
├── menu.html               # Dashboard principal
├── deposit.html            # Depósitos
├── sendmoney.html          # Enviar dinero
├── transactions.html       # Historial de transacciones
├── contacts.html           # Gestión de contactos
├── accounts.html           # Gestión de cuentas
├── budget.html             # Presupuestos
├── calendar.html           # Calendario
├── currency.html           # Conversor de divisas
│
├── assets/
│   └── images/             # Imágenes del proyecto
│
├── css/
│   ├── bootstrap.min.css   # Bootstrap 5.3.0
│   └── styles.css          # Estilos personalizados
│
├── js/
│   ├── config/
│   │   └── constants.js    # ⭐ Constantes globales
│   │
│   ├── services/
│   │   ├── storageService.js      # ⭐ Gestión de localStorage
│   │   ├── authService.js         # ⭐ Autenticación
│   │   └── transactionService.js  # ⭐ Transacciones
│   │
│   ├── utils/
│   │   └── helpers.js      # ⭐ Funciones auxiliares
│   │
│   ├── pages/
│   │   ├── login.js        # ⭐ Lógica de login
│   │   ├── register.js     # ⭐ Lógica de registro
│   │   ├── dashboard.js    # ⭐ Lógica de dashboard
│   │   ├── deposit.js      # Lógica de depósitos
│   │   ├── sendmoney.js    # Lógica de envíos
│   │   ├── transactions.js # Lógica de transacciones
│   │   ├── contacts.js     # Lógica de contactos
│   │   ├── accounts.js     # Lógica de cuentas
│   │   ├── budget.js       # Lógica de presupuestos
│   │   ├── calendar.js     # Lógica de calendario
│   │   └── currency.js     # Lógica de divisas
│   │
│   ├── bootstrap.bundle.min.js
│   └── script.js           # ⚠️ LEGACY - Migrar a módulos
│
├── docs/
│   ├── GUIA_RAPIDA.md
│   ├── GUIA_PRESUPUESTOS.md
│   ├── GUIA_CONTACTOS_DIVISAS.md
│   ├── REVISION_CODIGO.md
│   └── ARQUITECTURA.md     # 👈 Este archivo
│
└── README.md               # Documentación principal

⭐ = Archivos ya refactorizados (nuevos)
⚠️ = Archivo legacy a deprecar
```

---

## 🏛️ Arquitectura Modular

### Capas de la Aplicación

```
┌─────────────────────────────────────────────────────┐
│                    UI LAYER                          │
│          (HTML + CSS + Pages JS)                     │
├─────────────────────────────────────────────────────┤
│                 SERVICES LAYER                       │
│   authService | transactionService | ...            │
├─────────────────────────────────────────────────────┤
│                 UTILS LAYER                          │
│           helpers | validators                       │
├─────────────────────────────────────────────────────┤
│                 DATA LAYER                           │
│              storageService                          │
├─────────────────────────────────────────────────────┤
│                CONFIGURATION                         │
│                 constants                            │
└─────────────────────────────────────────────────────┘
```

### Descripción de Módulos

#### 1️⃣ **CONFIG (Configuración)**
- **constants.js**: Todas las constantes de la aplicación
  - Validaciones (MIN_PASSWORD_LENGTH, etc.)
  - Mensajes de error y éxito
  - Tipos de datos (TRANSACTION_TYPES, etc.)
  - Rutas de navegación
  - Configuraciones de divisas

#### 2️⃣ **SERVICES (Servicios)**
- **storageService.js**: Persistencia de datos
  - `getUsers()`, `saveUsers()`, `findUserByEmail()`
  - `getCurrentUser()`, `setCurrentUser()`, `updateCurrentUser()`
  - Inicialización de base de datos
  
- **authService.js**: Autenticación
  - `login(email, password)`
  - `register(userData)`
  - `logout()`
  - `validateRegistration(data)`
  
- **transactionService.js**: Transacciones
  - `deposit(user, accountId, amount, method, description)`
  - `sendToUser(sender, recipientEmail, amount, description)`
  - `transferBetweenOwnAccounts(...)`
  - `getAllFromUser(user)`, `filterByType()`, `calculateTotals()`

#### 3️⃣ **UTILS (Utilidades)**
- **helpers.js**: Funciones auxiliares
  - `getActiveAccount(user)`
  - `formatCurrency(amount, currency)`
  - `formatDate(date)`, `formatTime(date)`
  - `isValidEmail(email)`, `isValidAmount(amount)`
  - `redirect(route, delay)`
  - `showError(message)`, `showSuccess(message)`
  - `convertCurrency(amount, from, to)`

#### 4️⃣ **PAGES (Páginas)**
Cada archivo de página contiene solo la lógica específica de esa página:
- Inicialización de la vista
- Event handlers específicos
- Renderizado de datos
- Sin lógica de negocio (delega a services)

---

## 🔄 Flujo de Datos

### Ejemplo: Login de Usuario

```javascript
// 1. Usuario completa formulario (login.html)
$('#loginForm').submit() 

// 2. Página captura datos (pages/login.js)
const email = $('#email').val()
const password = $('#password').val()

// 3. Llama a servicio de autenticación (services/authService.js)
const result = AuthService.login(email, password)

// 4. Servicio busca usuario (services/storageService.js)
const user = StorageService.findUserByEmail(email)

// 5. Valida contraseña
if (user.password === password) { ... }

// 6. Guarda sesión
StorageService.setCurrentUser(user)

// 7. Retorna resultado a página
return { success: true, user: user }

// 8. Página maneja resultado (pages/login.js)
Helpers.showSuccess(SUCCESS_MESSAGES.LOGIN_SUCCESS)
Helpers.redirect(ROUTES.DASHBOARD)
```

### Principios de Flujo

✅ **DO**: Páginas → Services → Storage  
❌ **DON'T**: Páginas → Storage directamente

✅ **DO**: Services retornan `{ success: boolean, data/error }`  
❌ **DON'T**: Services lanzan excepciones no controladas

✅ **DO**: Helpers para tareas comunes (formateo, validación)  
❌ **DON'T**: Duplicar código de formateo en cada página

---

## 📖 Guía de Implementación

### Paso 1: Actualizar HTMLs

Cada HTML debe cargar solo los scripts necesarios **en orden**:

```html
<!-- login.html -->
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- ... head content ... -->
</head>
<body>
    <!-- ... body content ... -->
    
    <!-- jQuery (requerido primero) -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    
    <!-- Bootstrap Bundle -->
    <script src="js/bootstrap.bundle.min.js"></script>
    
    <!-- 1. Configuración (primero) -->
    <script src="js/config/constants.js"></script>
    
    <!-- 2. Servicios base (segundo) -->
    <script src="js/services/storageService.js"></script>
    
    <!-- 3. Utilidades (tercero) -->
    <script src="js/utils/helpers.js"></script>
    
    <!-- 4. Servicios específicos (cuarto) -->
    <script src="js/services/authService.js"></script>
    
    <!-- 5. Página específica (último) -->
    <script src="js/pages/login.js"></script>
</body>
</html>
```

### Orden de Carga (CRÍTICO ⚠️)

```
1. jQuery (externo)
2. Bootstrap Bundle
3. constants.js       (sin dependencias)
4. storageService.js  (usa constants)
5. helpers.js         (usa constants, storageService)
6. [otros services]   (usan constants, storageService, helpers)
7. [página].js        (usa todo lo anterior)
```

### Paso 2: Migrar Código de script.js

**ANTES (script.js - 1900 líneas):**
```javascript
$(document).ready(function() {
    // Login
    $('#loginForm').submit(function(e) {
        // 100 líneas de código
    });
    
    // Registro
    $('#registerForm').submit(function(e) {
        // 150 líneas de código
    });
    
    // Dashboard
    if ($('#userBalance').length) {
        // 200 líneas de código
    }
    
    // Transacciones
    if ($('#transactionsList').length) {
        // 150 líneas de código
    }
    
    // ... 1300 líneas más ...
});
```

**DESPUÉS (modular):**

**pages/login.js (30 líneas):**
```javascript
$(document).ready(function() {
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        const result = AuthService.login(email, password);
        if (result.success) {
            Helpers.redirect(ROUTES.DASHBOARD);
        } else {
            Helpers.showError(result.error);
        }
    });
});
```

**pages/register.js (40 líneas):**
```javascript
$(document).ready(function() {
    $('#registerForm').submit(function(e) {
        e.preventDefault();
        const result = AuthService.register(userData);
        // ... manejo de resultado
    });
});
```

**pages/dashboard.js (200 líneas - pero organizadas):**
```javascript
$(document).ready(function() {
    function initUserInfo() { ... }
    function initAccountSelector() { ... }
    function initDebitCreditTable() { ... }
    
    initUserInfo();
    initAccountSelector();
    initDebitCreditTable();
});
```

### Paso 3: Crear Nueva Página (Template)

```javascript
/**
 * [nombre].js
 * Lógica específica de [página].html
 */

$(document).ready(function() {
    // 1. Verificar autenticación (si es necesario)
    const currentUser = Helpers.requireAuth();
    if (!currentUser) return;
    
    // 2. Inicializar datos
    function initData() {
        // Cargar y mostrar datos iniciales
    }
    
    // 3. Event Handlers
    $('#formId').submit(function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const data = { ... };
        
        // Llamar a servicio
        const result = Service.method(data);
        
        // Manejar resultado
        if (result.success) {
            Helpers.showSuccess('Operación exitosa');
        } else {
            Helpers.showError(result.error);
        }
    });
    
    // 4. Logout (si aplica)
    $('#logoutBtn').click(function(e) {
        e.preventDefault();
        AuthService.logout();
    });
    
    // 5. Inicializar
    initData();
});
```

---

## ✅ Mejores Prácticas Implementadas

### 1. **Separación de Responsabilidades (SRP)**
```javascript
✅ BIEN:
class AuthService {
    static login() { /* solo autenticación */ }
    static register() { /* solo registro */ }
}

class StorageService {
    static getUsers() { /* solo persistencia */ }
}

❌ MAL:
function loginAndSaveAndRedirectAndShowMessage() { /* hace todo */ }
```

### 2. **DRY (Don't Repeat Yourself)**
```javascript
✅ BIEN:
function updateCurrentUser(user) {
    StorageService.setCurrentUser(user);
    StorageService.updateUser(user);
}
// Usar en 15 lugares

❌ MAL:
// Copiar estas 4 líneas en 15 lugares diferentes
sessionStorage.setItem('currentUser', JSON.stringify(user));
let users = loadUsers();
const index = users.findIndex(u => u.email === user.email);
users[index] = user;
```

### 3. **Constantes en lugar de Magic Numbers**
```javascript
✅ BIEN:
if (password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
    return ERROR_MESSAGES.SHORT_PASSWORD;
}

❌ MAL:
if (password.length < 6) {
    return 'La contraseña debe tener al menos 6 caracteres';
}
```

### 4. **Retorno Consistente**
```javascript
✅ BIEN:
return { 
    success: boolean, 
    data?: any, 
    error?: string 
};

❌ MAL:
// A veces retorna true/false
// A veces retorna objeto
// A veces retorna null
// A veces lanza excepción
```

### 5. **Funciones Pequeñas**
```javascript
✅ BIEN: 20-30 líneas por función
function renderUserInfo() { ... }
function renderBalance() { ... }
function renderTransactions() { ... }

❌ MAL: 200 líneas en una función
function renderEverything() { /* todo aquí */ }
```

---

## 🚀 Deployment (Despliegue)

### Opciones de Hosting

#### 1. **GitHub Pages** (Gratis, Recomendado para Portfolio)

**Pasos:**
```bash
# 1. Crear repositorio en GitHub
git init
git add .
git commit -m "Initial commit - Alke Wallet"
git branch -M main
git remote add origin https://github.com/tu-usuario/alke-wallet.git
git push -u origin main

# 2. Ir a Settings → Pages
# 3. Source: Deploy from branch → main → /root
# 4. Tu app estará en: https://tu-usuario.github.io/alke-wallet/
```

**Ventajas:**
- ✅ Gratis
- ✅ HTTPS automático
- ✅ Perfecto para portfolio
- ✅ Integración con Git

**Limitaciones:**
- ❌ Solo sitios estáticos (no backend)
- ❌ No base de datos real (solo localStorage)

#### 2. **Netlify** (Gratis, Profesional)

**Pasos:**
```bash
# 1. Crear cuenta en netlify.com
# 2. Conectar con GitHub
# 3. Seleccionar repositorio
# 4. Deploy automático en cada push
```

**Ventajas:**
- ✅ Deploy automático
- ✅ HTTPS automático
- ✅ Dominio personalizado gratis
- ✅ Rollback fácil
- ✅ Functions (serverless)

#### 3. **Vercel** (Gratis, Moderno)

Similar a Netlify, excelente para proyectos frontend.

#### 4. **Azure Static Web Apps** (Gratis para proyectos pequeños)

Integración con Azure para escalabilidad futura.

### Preparación para Deployment

**1. Crear .gitignore:**
```gitignore
# Node modules (si usas npm en futuro)
node_modules/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
```

**2. Actualizar rutas para deployment:**

Si tu app estará en un subdirectorio (ej: `github.io/alke-wallet/`), ajusta rutas:

```javascript
// constants.js
const BASE_PATH = ''; // Para root
// const BASE_PATH = '/alke-wallet'; // Para subdirectorio

const ROUTES = {
    LOGIN: BASE_PATH + '/login.html',
    DASHBOARD: BASE_PATH + '/menu.html',
    // ...
};
```

**3. Probar localmente:**
```bash
# Con Python (ya instalado en tu PC)
cd proyectoWallet
python -m http.server 8000

# Abrir en navegador:
http://localhost:8000
```

**4. Optimización (opcional para producción):**
- Minificar CSS/JS
- Comprimir imágenes
- Lazy loading de imágenes
- Service Worker para PWA

---

## 📝 Checklist de Migración

### Fase 1: Configuración Base ✅
- [x] Crear estructura de carpetas
- [x] Crear constants.js
- [x] Crear storageService.js
- [x] Crear helpers.js
- [x] Crear authService.js
- [x] Crear transactionService.js

### Fase 2: Páginas Críticas ✅
- [x] login.js
- [x] register.js
- [x] dashboard.js
- [ ] deposit.js (PENDIENTE)
- [ ] sendmoney.js (PENDIENTE)
- [ ] transactions.js (PENDIENTE)

### Fase 3: Páginas Secundarias
- [ ] contacts.js
- [ ] accounts.js
- [ ] budget.js
- [ ] calendar.js
- [ ] currency.js

### Fase 4: Actualizar HTMLs
- [ ] login.html
- [ ] register.html
- [ ] menu.html
- [ ] deposit.html
- [ ] sendmoney.html
- [ ] transactions.html
- [ ] contacts.html
- [ ] accounts.html
- [ ] budget.html
- [ ] calendar.html
- [ ] currency.html

### Fase 5: Testing
- [ ] Probar login
- [ ] Probar registro
- [ ] Probar dashboard
- [ ] Probar depósitos
- [ ] Probar envíos
- [ ] Probar transferencias entre cuentas
- [ ] Probar gestión de contactos
- [ ] Probar presupuestos
- [ ] Probar calendario
- [ ] Probar conversor de divisas

### Fase 6: Deployment
- [ ] Crear repositorio GitHub
- [ ] Subir código
- [ ] Configurar GitHub Pages / Netlify
- [ ] Probar en producción
- [ ] Actualizar README con link

---

## 🎓 Recursos para Aprender Más

### Arquitectura de Software
- **SOLID Principles**: https://en.wikipedia.org/wiki/SOLID
- **Clean Code**: Libro de Robert C. Martin
- **Design Patterns**: https://refactoring.guru/design-patterns

### JavaScript Moderno
- **ES6 Modules**: https://javascript.info/modules-intro
- **Promises & Async/Await**: https://javascript.info/async-await
- **Classes**: https://javascript.info/classes

### Deployment
- **GitHub Pages**: https://pages.github.com/
- **Netlify Docs**: https://docs.netlify.com/
- **Vercel Docs**: https://vercel.com/docs

---

## 📞 Soporte

Si encuentras problemas durante la migración, revisa:

1. **Console del navegador** (F12): Errores de JavaScript
2. **Network tab**: Archivos JS no encontrados
3. **Orden de carga**: Verifica que scripts se cargan en orden correcto
4. **Nombres de archivos**: Case-sensitive en algunos servidores

---

**Última actualización**: 12 de enero de 2026  
**Versión**: 1.0.0  
**Autor**: Equipo Alke Wallet
