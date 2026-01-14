# 🚀 Quick Start - Alke Wallet

## Para Desarrolladores

### 📦 Instalación Local

```bash
# 1. Clonar repositorio
git clone https://github.com/tu-usuario/alke-wallet.git
cd alke-wallet

# 2. Abrir con Live Server (VS Code) o servidor local
# Con Python:
python -m http.server 8000

# Con Node.js:
npx http-server -p 8000

# 3. Abrir en navegador
http://localhost:8000
```

### 🔑 Usuarios de Prueba

```javascript
// Usuario 1 (con datos de ejemplo)
Email: usuario@alke.com
Password: 123456
Saldo inicial: $11,547.54 (2 cuentas)

// Usuario 2 (cuenta básica)
Email: maria@alke.com
Password: password
Saldo inicial: $500.00 (1 cuenta)
```

---

## 📁 Estructura de Archivos

### HTMLs (Páginas)
```
login.html          → Inicio de sesión
register.html       → Registro de usuarios
menu.html           → Dashboard principal
deposit.html        → Realizar depósitos
sendmoney.html      → Enviar dinero
transactions.html   → Historial completo
contacts.html       → Gestión de contactos
accounts.html       → Gestión de cuentas
budget.html         → Control de presupuestos
calendar.html       → Calendario de transacciones
currency.html       → Conversor de divisas
```

### JavaScript Modular

```
js/
├── config/
│   └── constants.js              # Constantes globales
│
├── services/
│   ├── storageService.js         # localStorage/sessionStorage
│   ├── authService.js            # Login y registro
│   └── transactionService.js     # Transacciones
│
├── utils/
│   └── helpers.js                # Funciones auxiliares
│
└── pages/
    ├── login.js                  # Lógica de login
    ├── register.js               # Lógica de registro
    ├── dashboard.js              # Lógica de dashboard
    └── [crear resto según necesites]
```

---

## 🛠️ Agregar Nueva Funcionalidad

### Ejemplo: Crear página de reportes

**1. Crear HTML** (`reports.html`):
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reportes - Alke Wallet</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <!-- Tu contenido aquí -->
    
    <!-- Scripts en orden -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/config/constants.js"></script>
    <script src="js/services/storageService.js"></script>
    <script src="js/utils/helpers.js"></script>
    <script src="js/services/authService.js"></script>
    <script src="js/services/transactionService.js"></script>
    <script src="js/pages/reports.js"></script>
</body>
</html>
```

**2. Crear JS** (`js/pages/reports.js`):
```javascript
$(document).ready(function() {
    const currentUser = Helpers.requireAuth();
    if (!currentUser) return;
    
    function generateReport() {
        const transactions = TransactionService.getAllFromUser(currentUser);
        const totals = TransactionService.calculateTotals(transactions);
        
        // Renderizar reporte...
    }
    
    $('#generateBtn').click(generateReport);
    
    generateReport(); // Inicializar
});
```

**3. Agregar constante si necesitas** (`js/config/constants.js`):
```javascript
const ROUTES = {
    // ... existentes
    REPORTS: 'reports.html'
};
```

---

## 🧪 Testing Manual

### Checklist de Funcionalidades

```
Login y Registro:
□ Login exitoso → dashboard
□ Login fallido → mensaje error
□ Registro exitoso → login
□ Validaciones de formulario

Dashboard:
□ Muestra saldo correcto
□ DEBE/HABER calculado
□ Transacciones recientes
□ Selector de cuentas (si >1)

Transacciones:
□ Depósito aumenta saldo
□ Envío disminuye saldo
□ Transferencia entre cuentas
□ Historial completo visible

Presupuestos:
□ Asignar presupuesto
□ Registrar gastos
□ Alertas funcionan
□ Progreso se actualiza

Contactos:
□ Agregar contacto
□ Filtrar por tipo
□ Enviar a contacto
□ Eliminar contacto

Divisas:
□ Cambiar divisa
□ Convertir montos
□ Ver tasas de cambio
□ Saldo en múltiples divisas
```

---

## 📝 Convenciones de Código

### Nombres de Variables
```javascript
✅ BIEN:
const currentUser = getCurrentUser();
const activeAccount = getActiveAccount(user);
const formattedAmount = formatCurrency(1000, 'USD');

❌ MAL:
const usr = getUsr();
const acc = getAcc(u);
const amt = fmt(1000, 'USD');
```

### Funciones
```javascript
✅ BIEN: Funciones cortas con única responsabilidad
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(message) {
    $('#error-msg').text(message).removeClass('d-none');
}

❌ MAL: Función que hace muchas cosas
function processEverything() {
    // 200 líneas de código
}
```

### Constantes
```javascript
✅ BIEN: Usar constantes en lugar de valores hardcodeados
if (password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
    return ERROR_MESSAGES.SHORT_PASSWORD;
}

❌ MAL: Magic numbers
if (password.length < 6) {
    return 'La contraseña debe tener al menos 6 caracteres';
}
```

### Retornos de Servicios
```javascript
✅ BIEN: Retorno consistente con success/error
return { 
    success: true, 
    user: userData 
};

return { 
    success: false, 
    error: 'Email no encontrado' 
};

❌ MAL: Retornos inconsistentes
return userData;  // ¿Qué pasa si hay error?
return null;      // No sabes qué salió mal
throw new Error(); // No controlado
```

---

## 🐛 Debugging

### Consola del Navegador (F12)

```javascript
// Ver usuario actual
console.log(StorageService.getCurrentUser());

// Ver todos los usuarios
console.log(StorageService.getUsers());

// Ver transacciones
const user = StorageService.getCurrentUser();
console.log(TransactionService.getAllFromUser(user));

// Ver constantes
console.log(VALIDATION);
console.log(ERROR_MESSAGES);
```

### Errores Comunes

**"X is not defined"**
```
Causa: Orden incorrecto de scripts
Solución: Cargar constants.js primero, luego servicios, luego página
```

**"Cannot read property 'accounts' of null"**
```
Causa: Usuario no está logueado
Solución: Usar Helpers.requireAuth() al inicio de la página
```

**"localStorage is not defined"**
```
Causa: Ejecutando sin servidor (file://)
Solución: Usar servidor local (http-server, Live Server)
```

---

## 📚 Recursos Adicionales

### Documentación
- [ARQUITECTURA.md](docs/ARQUITECTURA.md) - Arquitectura completa
- [GUIA_MIGRACION.md](docs/GUIA_MIGRACION.md) - Cómo migrar código legacy
- [REVISION_CODIGO.md](docs/REVISION_CODIGO.md) - Análisis de código
- [GUIA_RAPIDA.md](docs/GUIA_RAPIDA.md) - Guía de usuario
- [GUIA_PRESUPUESTOS.md](docs/GUIA_PRESUPUESTOS.md) - Sistema de presupuestos
- [GUIA_CONTACTOS_DIVISAS.md](docs/GUIA_CONTACTOS_DIVISAS.md) - Contactos y divisas

### Links Útiles
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/)
- [jQuery API](https://api.jquery.com/)
- [MDN JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)

---

## 🤝 Contribuir

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push a rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

### Commits Convencionales
```
feat: Nueva funcionalidad
fix: Corrección de bug
refactor: Refactorización de código
docs: Actualización de documentación
style: Cambios de formato
test: Agregar tests
```

---

## 📄 Licencia

Este proyecto es de código abierto para fines educativos.

---

**Happy Coding! 🚀**
