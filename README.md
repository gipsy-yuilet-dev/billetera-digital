# billetera-digital
Billetera Digital, planificador financiero virtual
# 💼 Alke Wallet - Billetera Digital Profesional
## Proyecto Billetera Digital , se usaron las siguientes tecnologias
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=flat&logo=jquery&logoColor=white)](https://jquery.com/)
Tambien se utilizo Vibe coding: Claude Sonnet 4,5 , Gemini pro Version 3.0
Aplicación web **front-end** para gestión de finanzas personales, desarrollada con **arquitectura modular escalable**. Parte del portafolio profesional del **Módulo 2: Fundamentos del Desarrollo Front-end**.

> ✅ **MIGRACIÓN COMPLETADA**: Proyecto refactorizado de código monolítico (1900 líneas) a **arquitectura modular profesional** con 15 archivos especializados.

## 🎯 Descripción del Proyecto

**Alke Wallet** es una billetera digital completa que permite a los usuarios:
- Gestionar múltiples cuentas bancarias
- Realizar depósitos y transferencias
- Controlar presupuestos por categorías
- Seguimiento de contactos (deudores/acreedores)
- Conversión de divisas (CLP, USD, EUR)
- Visualización de transacciones en calendario

**Stack Tecnológico**: HTML5, CSS3, JavaScript ES6+, Bootstrap 5.3, jQuery 3.6

## 🏛️ Arquitectura Modular

El proyecto utiliza una **arquitectura profesional en 5 capas**:

```
📦 Capas de la Aplicación
├── 🎨 UI Layer (11 páginas HTML + 11 módulos JS)
├── ⚙️ Services Layer (Auth, Storage, Transactions)
├── 🛠️ Utils Layer (30+ funciones helpers)
├── 💾 Data Layer (localStorage con Storage Service)
└── 🔧 Config Layer (150+ constantes centralizadas)
```

### Estructura de Archivos -Arbol de Directorios
```
proyectoWallet/
├── js/
│   ├── config/
│   │   └── constants.js          # 150+ constantes
│   ├── services/
│   │   ├── storageService.js     # Gestión localStorage
│   │   ├── authService.js        # Autenticación
│   │   └── transactionService.js # Transacciones
│   ├── utils/
│   │   └── helpers.js            # 30+ funciones útiles
│   └── pages/
│       ├── login.js
│       ├── register.js
│       ├── dashboard.js
│       ├── deposit.js
│       ├── sendmoney.js
│       ├── transactions.js
│       ├── contacts.js
│       ├── accounts.js
│       ├── budget.js
│       ├── calendar.js
│       └── currency.js
└── docs/
    ├── ARQUITECTURA.md           # Documentación técnica
    ├── GUIA_MIGRACION.md         # Guía de migración
    ├── QUICKSTART.md             # Inicio rápido
    ├── MIGRACION_COMPLETADA.md   # Status de migración
    └── GUIA_PRUEBAS.md           # Testing checklist
```

**📚 Documentación completa**: 
- [Arquitectura Técnica](docs/ARQUITECTURA.md)
- [Migración Completada](docs/MIGRACION_COMPLETADA.md)
- [Guía de Pruebas](docs/GUIA_PRUEBAS.md)

## ✨ Características Principales

### 🔐 Autenticación y Seguridad
- Sistema de registro con validación completa
- Login seguro con manejo de sesiones
- Presupuesto inicial configurable (≥$10,000)
- Validación de campos en tiempo real
- Protección de rutas (requiere autenticación)

### 🏦 Sistema Multi-Cuenta
- **Múltiples cuentas por usuario**
  - Tipos: Corriente, Ahorro, Vista, Inversión
  - Cuenta activa seleccionable
  - Saldos independientes
  - Transacciones separadas por cuenta
- **Transferencias entre cuentas propias**
- **Gestión completa de cuentas**

### 💸 Gestión de Transacciones
- **Depósitos**:
  - Efectivo, transferencia bancaria, cheque
  - Montos rápidos predefinidos
  - Historial completo
- **Envío de dinero**:
  - A otros usuarios registrados
  - Entre tus propias cuentas
  - Con descripción y validaciones
- **Visualización avanzada**:
  - Tabla DEBE/HABER contable
  - Filtros por tipo (recibido/enviado)
  - Fechas y horas exactas
  - Búsqueda y ordenamiento

### 📊 Sistema de Presupuestos
- **9 categorías configurables**:
  - **Ingresos**: Trabajo/Sueldo, Saldo/Presupuesto
  - **Gastos**: Agua, Telecomunicaciones, Educación, Vivienda, Transporte, Alimentación, Gastos Varios
- **Control en tiempo real**:
  - Asignar presupuestos mensuales
  - Registrar gastos e ingresos por categoría
  - Barras de progreso visuales
  - Alertas al 70% y 90%
  - Resumen de disponible

### 👥 Gestión de Contactos
- **3 tipos de contactos**:
  - 🟦 Normal (contactos regulares)
  - 🟢 Te Deben (deudores con montos)
  - 🔴 Les Debo (acreedores/proveedores)
- **Información completa**:
  - Nombre, email, teléfono
  - Monto de deuda (opcional)
  - Notas personalizadas
  - Avatares automáticos
- **Filtros inteligentes**
- **Envío rápido desde contactos**

### 💱 Sistema de Divisas
- **3 divisas soportadas**: CLP (Peso Chileno), USD (Dólar), EUR (Euro)
- **Conversor en tiempo real**:
  - Calculadora bidireccional
  - Tabla de referencia rápida
  - Tasas de cambio actualizadas
  - Tu saldo en todas las divisas
- **Símbolo dinámico** en toda la app según preferencia

### 📅 Calendario de Transacciones
- Vista mensual interactiva
- Indicadores visuales (verde = ingresos, rojo = gastos)
- Día actual resaltado
- Click en día muestra transacciones detalladas
- Navegación entre meses
- Hora exacta de cada transacción

- ✅ **Transferir entre cuentas propias**
  - Checkbox especial en página de envío
  - Selector de cuenta destino
  - Sin comisiones entre tus cuentas
  - Transacciones registradas en ambas cuentas

- ✅ **Página de Gestión de Cuentas** (`accounts.html`)
  - Ver todas tus cuentas en tarjetas
  - Crear nuevas cuentas con modal
  - Cambiar cuenta activa con un clic
  - Indicador visual de cuenta activa
  - Saldo inicial opcional al crear

- ✅ **Selector de Cuenta en Dashboard**
  - Desplegable automático si tienes más de 1 cuenta
  - Muestra nombre y saldo de cada cuenta
  - Cambio instantáneo de cuenta activa
  - Recarga automática del dashboard

- ✅ **Badges de Cuenta en Transacciones**
  - Identificación visual de la cuenta en cada transacción
  - Tabla DEBE/HABER muestra cuenta asociada
  - Historial completo con filtro por cuenta

### 🆕 Sistema de Registro de Usuarios
- ✅ **Página de registro completa** (`register.html`)
- ✅ Validación de emails duplicados
- ✅ Validación de contraseñas (mínimo 6 caracteres)
- ✅ Confirmación de contraseña
- ✅ Almacenamiento persistente en **localStorage**
- ✅ Redirección automática al login tras registro exitoso
- ✅ Nuevo usuario con cuenta corriente por defecto

### � Sistema de Depósitos y Envíos FUNCIONAL
- ✅ **Página de Depósito** (`deposit.html`) - ¡AHORA FUNCIONA!
  - Formulario para agregar dinero a tu cuenta
  - Botones de montos rápidos ($10, $20, $50, $100, $500, $1000)
  - Selección de método de depósito
  - Actualización automática del saldo
  - Registro de transacciones con fecha/hora

- ✅ **Página de Envío** (`sendmoney.html`) - ¡AHORA FUNCIONA!
  - Formulario para enviar dinero a otros usuarios
  - Lista de contactos frecuentes para selección rápida
  - Botones de montos rápidos
  - Validación de saldo disponible
  - Validación de destinatarios existentes
  - Actualización automática en ambas cuentas (remitente y destinatario)

### 📊 Dashboard Mejorado con Módulos Nuevos

#### 🆕 Módulo DEBE y HABER (Contabilidad)
- ✅ **Tabla comparativa de gastos vs ingresos**
- ✅ **DEBE** (Gastos/Débitos) = Dinero que ENVÍAS → En ROJO
- ✅ **HABER** (Ingresos/Créditos) = Dinero que RECIBES → En VERDE
- ✅ **Balance Final** = HABER - DEBE
- ✅ Últimas 5 transacciones de cada tipo
- ✅ Totales calculados automáticamente

#### Otros Módulos del Dashboard
- ✅ **Módulo de Transacciones Recientes** (últimas 3 con fecha/hora)
- ✅ **Módulo de Contactos Frecuentes** (top 3 contactos)
- ✅ **Módulo de Cuentas por Pagar** (últimos pagos realizados)
- ✅ Botón de acceso rápido a Contactos
- ✅ Diseño moderno con tarjetas informativas

### 📈 Página de Transacciones Mejorada
- ✅ Historial completo con **fecha y hora exacta**
- ✅ **Filtros**: Todas / Recibidas / Enviadas
- ✅ **Resumen estadístico** (Total transacciones, Total recibido, Total enviado)
- ✅ Agrupación por fechas
- ✅ Iconos visuales por tipo de transacción
- ✅ Descripción de cada transacción
- ✅ Formato de moneda mejorado

### 👥 Página de Contactos Nueva
- ✅ Lista completa de contactos
- ✅ Avatares generados automáticamente
- ✅ Acceso directo para enviar dinero a cada contacto

## 🗂️ Estructura de Carpetas Actualizada (14 Enero 2026)
```
proyectoWallet/
├── index.html              # Landing page
├── login.html              # Inicio de sesión
├── register.html           # ⭐ Registro con presupuesto inicial
├── menu.html               # ⭐ MEJORADO - Dashboard con presupuestos y calendario
├── deposit.html            # ⭐ Depositar dinero (FUNCIONAL)
├── sendmoney.html          # ⭐ MEJORADO - Enviar + Transferir entre cuentas
├── transactions.html       # ⭐ Historial con badges de cuenta
├── contacts.html           # ⭐ Gestión de contactos
├── accounts.html           # ⭐ v4.0 - Gestionar múltiples cuentas
├── budget.html             # ⭐ NUEVO v5.0 - Presupuesto por categorías
├── calendar.html           # ⭐ NUEVO v5.0 - Calendario de transacciones
├── transsactions.html      # (Archivo antiguo - deprecado)
├── css/
│   ├── bootstrap.min.css
│   ├── styles.css
│   └── sendmoney.html      # (Mal ubicado - usar el de raíz)
├── js/
│   └── script.js           # ⭐ ACTUALIZADO v5.0 - Presupuestos + calendario
├── assets/
│   └── images/
├── GUIA_DE_USO.md          # Guía general de usuario
└── MULTIPLES_CUENTAS.md    # Guía de múltiples cuentas
```

## 🛠️ Tecnologías Utilizadas
* **HTML5:** Estructura semántica del sitio.
* **CSS3:** Estilos personalizados y diseño responsivo.
* **Bootstrap 5:** Framework para componentes y sistema de grillas (Navbar, Cards, Modales).
* **JavaScript (ES6+):** Lógica de negocio y validaciones.
* **jQuery 3.6:** Manipulación del DOM y animaciones suaves.
* **localStorage:** Persistencia de datos de usuarios.
* **sessionStorage:** Gestión de sesiones activas.

## 💾 ¿Dónde se almacenan los usuarios?

Los usuarios se almacenan en **localStorage del navegador** usando **JavaScript puro**:

```javascript
// Estructura de cada usuario
{
    email: 'usuario@email.com',
    password: '123456',
    name: 'Nombre Completo',
    balance: 0.00,
    contacts: [...],
    transactions: [
        {
            id: 1,
            type: 'receive' | 'send',
            amount: 100.00,
            from: 'Contacto',
            to: 'Contacto',
            date: '2026-01-12T14:30:00',  // ⭐ Con fecha/hora
            description: 'Descripción'
        }
    ]
}
```

**¿JavaScript o jQuery?**  
La aplicación usa **AMBOS**:
- **JavaScript puro**: Gestión de datos (arrays, objetos, localStorage, funciones)
- **jQuery**: Manipulación del DOM, eventos (submit, click), animaciones

## 📦 Funcionalidades Completas

1. **Sistema de Registro:**
   - Crear nuevos usuarios con validación completa
   - Verificación de emails únicos
   - Validación de contraseñas coincidentes
   - Almacenamiento persistente

2. **Login Seguro:**
   - Validación de credenciales desde localStorage
   - Usuarios demo: `usuario@alke.com` / `123456` o `maria@alke.com` / `password`
   - Gestión de sesión con sessionStorage

3. **Depositar Dinero:** ✨ NUEVO
   - Agregar dinero a tu cuenta
   - Montos rápidos predefinidos
   - Selección de método de depósito
   - Actualización automática del saldo
   - Registro de transacciones

4. **Enviar Dinero:** ✨ NUEVO
   - Transferir a otros usuarios registrados
   - Validación de saldo disponible
   - Selección rápida de contactos
   - Actualización en ambas cuentas
   - Prevención de envíos a sí mismo

5. **Dashboard Interactivo:**
   - Visualización de saldo con animaciones jQuery
   - **Tabla DEBE y HABER** (contabilidad)
   - Transacciones recientes con fecha/hora
   - Contactos frecuentes con avatares
   - Cuentas por pagar (pagos realizados)

6. **Historial de Transacciones:**
   - Vista completa con filtros
   - Agrupación por fechas
   - Resumen estadístico
   - Indicadores visuales por tipo

7. **Gestión de Contactos:**
   - Lista completa de contactos
   - Acceso rápido para enviar dinero
   - Avatares personalizados

8. **Diseño Responsive:**
   - Adaptable a móviles, tablets y escritorio
   - Bootstrap 5 + estilos personalizados

## 🚀 Instalación y Uso

### Opción 1: Abrir directamente en el navegador
1. Navega a la carpeta del proyecto
2. Haz doble clic en `index.html`
3. El navegador abrirá la aplicación automáticamente

### Opción 2: Usar Laragon (ya configurado)
1. Asegúrate que Laragon esté iniciado
2. Abre tu navegador y ve a: `http://localhost/talentoDigital/proyectoWallet`
3. O haz clic derecho en la carpeta desde Laragon → "Web"

### Primeros Pasos

#### 🆕 Crear Usuario Nuevo (Recomendado)
1. En la página inicial, clic en **"Crear Cuenta"**
2. Completa el formulario:
   - Nombre completo
   - Email (será tu usuario)
   - Contraseña (mínimo 6 caracteres)
   - Confirmar contraseña
   - **Presupuesto inicial** (mínimo $10,000 - por defecto $10,000)
3. Clic en **"Registrarse"**
4. ¡Listo! Serás redirigido al login automáticamente

#### 📋 O Usar Usuarios de Prueba
- Email: `usuario@alke.com` | Contraseña: `123456`
- Email: `maria@alke.com` | Contraseña: `password`

### Explorar Funcionalidades

**Desde el Dashboard:**
- 💰 **Depositar**: Agregar dinero a tu cuenta
- 💸 **Enviar**: Transferir a otros usuarios o entre tus cuentas
- 📜 **Movimientos**: Ver historial completo de transacciones
- 🏦 **Mis Cuentas**: Crear y gestionar múltiples cuentas
- 👥 **Contactos**: Ver y gestionar tus contactos
- 📊 **Presupuestos**: ⭐ NUEVO - Asignar y controlar gastos por categoría
- 📅 **Calendario**: ⭐ NUEVO - Ver transacciones en calendario mensual

### 🎯 Prueba el Nuevo Sistema de Presupuestos

1. **Asignar Presupuesto:**
   - Clic en **"Presupuestos"** en el dashboard
   - Clic en **"Asignar Presupuestos"**
   - Define montos para cada categoría (Agua, Telecom, etc.)
   - Guarda los cambios

2. **Registrar Gastos:**
   - En cada categoría, clic en **"Registrar Gasto"**
   - Ingresa el monto y descripción
   - El sistema descontará de tu cuenta y actualizará la categoría
   - Verás alertas si te acercas al límite (70%, 90%)

3. **Ver en Calendario:**
   - Clic en **"Calendario"** en el dashboard
   - Navega entre meses con las flechas
   - Los días con transacciones tienen puntos de colores
   - Clic en cualquier día para ver el detalle

## � Conceptos Contables: DEBE y HABER

La aplicación implementa un sistema de contabilidad básica con la tabla **DEBE y HABER**:

### ¿Qué es DEBE y HABER?

**DEBE (Débito)** 💸
- Representa el dinero que **SALE** de tu cuenta
- Incluye: pagos, envíos, compras, gastos
- Se muestra en **ROJO** (negativo)
- Disminuye tu saldo
- Ejemplos: "Envío a Juan -$50", "Compra -$30"

**HABER (Crédito)** 💰
- Representa el dinero que **ENTRA** a tu cuenta
- Incluye: depósitos, transferencias recibidas, ingresos
- Se muestra en **VERDE** (positivo)
- Aumenta tu saldo
- Ejemplos: "Depósito +$100", "Recibido de Ana +$200"

**Balance Final** = HABER - DEBE

### Ejemplo Práctico en la App:

```
┌─────────────────────────┬─────────────────────────┐
│  DEBE (Lo que Gastas)   │  HABER (Lo que Recibes) │
├─────────────────────────┼─────────────────────────┤
│ -$50.00  Envío a Juan   │ +$100.00  Depósito      │
│ -$30.00  Compra online  │ +$200.00  De Ana        │
│ -$25.00  Pago servicio  │ +$150.00  Transferencia │
├─────────────────────────┼─────────────────────────┤
│ Total: -$105.00         │ Total: +$450.00         │
└─────────────────────────┴─────────────────────────┘

Balance Final = $450.00 - $105.00 = $345.00 ✅ A TU FAVOR
```

Este módulo te permite ver de forma clara:
- ✅ Cuánto dinero has gastado (DEBE)
- ✅ Cuánto dinero has recibido (HABER)
- ✅ Tu balance neto (diferencia)

## 🐛 Problemas Resueltos

✅ **Sistema de registro de usuarios** - Completamente funcional  
✅ **Validación de creación de usuarios** - Con verificación de emails  
✅ **Páginas de Depositar y Enviar** - Creadas y funcionales  
✅ **Módulo de contactos** - Integrado en dashboard  
✅ **Módulo de transacciones con fecha/hora** - Implementado  
✅ **Tabla DEBE y HABER** - Sistema contable completo  
✅ **Persistencia de datos** - localStorage funcionando  

## �🔐 Nota de Seguridad

⚠️ **IMPORTANTE**: Esta es una aplicación de demostración educativa. En un entorno de producción:
- NO almacenar contraseñas en texto plano
- Usar hash seguro (bcrypt, Argon2)
- Implementar backend con API REST
- Usar base de datos real (PostgreSQL, MongoDB)
- Implementar autenticación con JWT
- Usar HTTPS obligatorio

## ✒️ Autores
* **Yulieta Eyzaguirre** - *Desarrollo y Diseño*

---

**Última actualización**: Enero 2026 | **Versión**: 5.0.0 🚀

---

## 🎯 Historial de Versiones

### ⭐ v5.0.0 (Enero 2026) - Presupuestos y Calendario
- ✅ Presupuesto inicial al registrarse (≥$10,000)
- ✅ Sistema de presupuesto por categorías (7 categorías)
- ✅ Calendario interactivo de transacciones
- ✅ Registro de gastos por categoría
- ✅ Alertas de límite de presupuesto

### 🏦 v4.0.0 (Enero 2026) - Múltiples Cuentas

1. **🏦 Múltiples Cuentas por Usuario**
   - Crea cuentas: Corriente, Ahorro, Inversión, Otra
   - Cada cuenta con su propio saldo y transacciones
   - Selector de cuenta activa en el dashboard

2. **🔄 Transferencias Entre Cuentas Propias**
   - Mueve dinero entre tus cuentas instantáneamente
   - Sin comisiones
   - Historial completo de movimientos

3. **📊 Gestión Visual de Cuentas**
   - Página dedicada "Mis Cuentas"
   - Tarjetas con información de cada cuenta
   - Cambio rápido de cuenta activa
   - Creación de nuevas cuentas con saldo inicial

4. **💰 Otras Funcionalidades**
   - Depositar Dinero
   - Enviar Dinero a otros usuarios
   - Tabla DEBE y HABER completa
   - Validaciones Completas
   - Persistencia Total (localStorage + sessionStorage)

📖 **[Ver Guía Completa de Múltiples Cuentas](MULTIPLES_CUENTAS.md)**

---

### Funcionalidades Anteriores (v3.0.0)

1. **💰 Depositar Dinero** - Agrega fondos a tu cuenta
2. **💸 Enviar Dinero** - Transfiere a otros usuarios
3. **📊 Tabla DEBE y HABER** - Sistema contable completo
4. **✅ Validaciones Completas** - Seguridad en todas las operaciones
5. **💾 Persistencia Total** - localStorage + sessionStorage
6. ** ¡Ahora puedes gestionar múltiples cuentas y organizarte mejor! 🎉
### Conclusion
Este Proyecto esta enmarcado el desarrollo del programa Talento Digital Full Stack Java Trainee
Realizar este proyecto fue un desafio, ya que no solo ocupo en mis desarrollo el codigo tradicional
Tambien cuando amerita aplico Vibe coding, una aclaracion, no es llegar y pegar lineas, por muy perfecto 
Que pueda parecer el codigo creado con alguna IA, siempre se debe revisar, linea por linea, ver si cumple
Con la Legibilidad, Experiencia de UX/IX(significa Experiencia de Usuario e Interfaz de Usuario)
Un sitio no solo debe contener codigo , sino en lo posible debe ser  lo mas minimalista y como poder usar
Un website con buenas practicas y la idea que nuestros usuarios vuelvan.
Agradezco al equipo de profesionales de Alke por la oportunidad  de aprendizaje y de especializacion
Atentamente
Julieta(Melek)Eyzaguirre Arenas
Desarrolladora
