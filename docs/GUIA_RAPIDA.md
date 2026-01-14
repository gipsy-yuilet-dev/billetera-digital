# 🚀 Guía Rápida de Uso - Alke Wallet

## 📖 Índice
1. [Primeros Pasos](#primeros-pasos)
2. [Crear Tu Cuenta](#crear-tu-cuenta)
3. [Iniciar Sesión](#iniciar-sesión)
4. [Dashboard Principal](#dashboard-principal)
5. [Funcionalidades Básicas](#funcionalidades-básicas)

---

## Primeros Pasos

### Abrir la Aplicación

**Opción 1: Con Laragon (Recomendado)**
```
http://localhost/talentoDigital/proyectoWallet
```

**Opción 2: Directamente**
- Ve a: `c:\laragon\www\talentoDigital\proyectoWallet`
- Doble clic en `index.html`

---

## Crear Tu Cuenta

### Paso 1: Acceder al Registro
1. En la página inicial, clic en **"Crear Cuenta"**
2. O desde login, clic en **"Regístrate"**

### Paso 2: Completar el Formulario
```
📝 Campos Requeridos:
├── Nombre Completo
├── Email (será tu usuario)
├── Contraseña (mínimo 6 caracteres)
├── Confirmar Contraseña
└── Presupuesto Inicial (mínimo $10,000)
```

### Paso 3: Confirmar
- Clic en **"Registrarse"**
- Verás mensaje de éxito ✅
- Serás redirigido al login automáticamente

---

## Iniciar Sesión

### Usuarios de Prueba
```
Usuario 1:
Email: usuario@alke.com
Contraseña: 123456

Usuario 2:
Email: maria@alke.com
Contraseña: password
```

### Tu Usuario Nuevo
- Email: El que registraste
- Contraseña: La que elegiste

---

## Dashboard Principal

### Vista General
```
┌─────────────────────────────────┐
│     SALDO DISPONIBLE            │
│        $XX,XXX.XX               │
│     Cuenta Corriente            │
└─────────────────────────────────┘

┌──────┬──────┬──────┬──────┐
│Depos │Enviar│Movim │Mis   │
│itar  │      │ientos│Cuenta│
└──────┴──────┴──────┴──────┘

┌──────┬───────────┬──────────┐
│Contac│Presupuesto│Calendario│
│tos   │s          │          │
└──────┴───────────┴──────────┘
```

### Módulos Disponibles

#### 💰 Depositar
- Agregar dinero a tu cuenta
- Montos rápidos: $10, $20, $50, $100, $500, $1000
- Selecciona método de depósito

#### 💸 Enviar
- Transferir a otros usuarios
- Transferir entre tus cuentas propias
- Selección rápida de contactos

#### 📜 Movimientos
- Historial completo de transacciones
- Filtros: Todas / Recibidas / Enviadas
- Resumen estadístico

#### 🏦 Mis Cuentas
- Ver todas tus cuentas
- Crear nuevas cuentas
- Cambiar cuenta activa

#### 👥 Contactos
- Lista de contactos frecuentes
- Enviar dinero rápido

#### 📊 Presupuestos (NUEVO)
- Asignar presupuestos por categoría
- Registrar gastos e ingresos
- Control en tiempo real

#### 📅 Calendario (NUEVO)
- Ver transacciones por fecha
- Navegación mensual
- Detalles por día

---

## Funcionalidades Básicas

### 1. Depositar Dinero 💰

**Paso a Paso:**
1. Clic en **"Depositar"**
2. Ingresa el monto o usa botones rápidos
3. Selecciona método (Transferencia/Tarjeta/Efectivo)
4. (Opcional) Agrega descripción
5. Clic en **"Depositar"**
6. ✅ Tu saldo se actualiza inmediatamente

### 2. Enviar Dinero 💸

**A Otro Usuario:**
1. Clic en **"Enviar"**
2. Ingresa email del destinatario
3. Ingresa monto
4. Agrega descripción
5. Clic en **"Enviar Dinero"**

**Entre Tus Cuentas:**
1. Clic en **"Enviar"**
2. ✅ Marca **"Transferir entre mis cuentas"**
3. Selecciona cuenta destino
4. Ingresa monto
5. Clic en **"Transferir"**

### 3. Ver Transacciones 📜

**Filtros Disponibles:**
- **Todas**: Todas las transacciones
- **Recibidas**: Solo ingresos
- **Enviadas**: Solo gastos

**Información Mostrada:**
- Fecha y hora exacta
- Monto
- Tipo (Ingreso/Gasto)
- Contacto
- Descripción
- Cuenta asociada

### 4. Gestionar Cuentas 🏦

**Crear Nueva Cuenta:**
1. Clic en **"Mis Cuentas"**
2. Clic en **"Nueva Cuenta"**
3. Completa:
   - Nombre de la cuenta
   - Tipo (Corriente/Ahorro/Inversión/Otra)
   - Saldo inicial (opcional)
4. Clic en **"Crear Cuenta"**

**Cambiar Cuenta Activa:**
1. En cualquier cuenta, clic en **"Usar esta cuenta"**
2. El dashboard se actualiza automáticamente

### 5. Gestionar Presupuestos 📊 NUEVO

**Asignar Presupuestos:**
1. Clic en **"Presupuestos"**
2. Clic en **"Asignar Presupuestos"**
3. Define montos para:
   - **Ingresos**: Trabajo/Sueldo, Saldo/Presupuesto
   - **Gastos**: Agua, Telecom, Educación, Vivienda, Transporte, Alimentación, Varios
4. Clic en **"Guardar Presupuestos"**

**Registrar Gastos:**
1. En cada categoría, clic en **"Registrar Gasto"**
2. Ingresa monto y descripción
3. El sistema:
   - Descuenta de tu cuenta activa
   - Actualiza la categoría
   - Muestra alertas si excedes 70% o 90%

**Registrar Ingresos:**
1. En categorías de ingreso, clic en **"Registrar Ingreso"**
2. Ingresa monto y descripción
3. El sistema:
   - Aumenta tu cuenta activa
   - Actualiza la categoría de ingreso

### 6. Ver Calendario 📅 NUEVO

**Navegación:**
1. Clic en **"Calendario"**
2. Usa **"Anterior"** y **"Siguiente"** para cambiar mes

**Identificación Visual:**
- 🟢 **Puntos verdes**: Días con ingresos
- 🔴 **Puntos rojos**: Días con gastos
- 🔵 **Fondo azul**: Día actual

**Ver Detalles:**
1. Clic en cualquier día con transacciones
2. Se muestra lista completa con:
   - Hora de cada transacción
   - Monto
   - Contacto
   - Descripción

---

## 💡 Consejos Rápidos

### ✅ Buenas Prácticas
- Asigna presupuestos mensuales realistas
- Registra tus gastos regularmente
- Revisa el calendario semanalmente
- Usa múltiples cuentas para organizarte mejor

### ⚠️ Validaciones Automáticas
- No puedes enviar más de tu saldo
- Los emails deben ser únicos
- Los montos deben ser positivos
- Las contraseñas deben tener mínimo 6 caracteres

### 🔐 Seguridad
- Los datos se guardan en tu navegador (localStorage)
- Solo tú puedes acceder a tu información
- Cierra sesión en computadoras compartidas

---

## 🆘 Necesitas Más Ayuda?

Consulta nuestras guías detalladas:
- 📘 [Guía de Múltiples Cuentas](MULTIPLES_CUENTAS.md)
- 📗 [Guía de Presupuestos](GUIA_PRESUPUESTOS.md)
- 📙 [Guía de Uso Completa](GUIA_DE_USO.md)
- 📕 [README Principal](../README.md)

---

**¡Disfruta usando Alke Wallet! 🎉**
