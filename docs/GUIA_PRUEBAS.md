# 🧪 GUÍA DE PRUEBAS - Alke Wallet

## ⚡ Inicio Rápido

### 1. Abrir el Proyecto
```
URL: http://localhost/talentoDigital/proyectoWallet/index.html
```

### 2. Usuario de Prueba Predeterminado
Si ya tenías datos:
- Email: usuario@alke.com
- Password: 123456

O crea una nueva cuenta desde register.html

---

## 📋 Checklist de Pruebas Página por Página

### ✅ 1. index.html (Landing Page)
- [ ] La página carga correctamente
- [ ] Los botones "Iniciar Sesión" y "Crear Cuenta" funcionan
- [ ] NO debe haber errores en consola (F12)

### ✅ 2. register.html (Registro)
**Pasos:**
1. [ ] Ir a register.html
2. [ ] Llenar formulario:
   - Nombre: Juan Test
   - Email: test@test.com
   - Password: 123456
   - Confirmar: 123456
   - Presupuesto: 50000
3. [ ] Click en "Crear Cuenta"
4. [ ] Debe mostrar mensaje de éxito
5. [ ] Debe redirigir a login.html

**Verificar en Consola:**
```javascript
// Ver usuarios registrados
JSON.parse(localStorage.getItem('alkeUsers'))
```

### ✅ 3. login.html (Login)
**Pasos:**
1. [ ] Ir a login.html
2. [ ] Ingresar credenciales del usuario creado
3. [ ] Click en "Iniciar Sesión"
4. [ ] Debe redirigir a menu.html

**Verificar en Consola:**
```javascript
// Ver usuario actual
JSON.parse(sessionStorage.getItem('currentUser'))
```

### ✅ 4. menu.html (Dashboard)
**Pasos:**
1. [ ] Ver saldo del usuario
2. [ ] Ver nombre de usuario arriba
3. [ ] Ver cuenta activa
4. [ ] Ver selector de cuentas (si hay múltiples)
5. [ ] Ver tabla de débitos/créditos
6. [ ] Ver transacciones recientes
7. [ ] Ver contactos frecuentes

**Verificar:**
- [ ] Saldo inicial debe ser el presupuesto asignado ($50,000)
- [ ] NO debe haber errores en consola

### ✅ 5. deposit.html (Depósitos)
**Pasos:**
1. [ ] Ir a deposit.html desde dashboard
2. [ ] Ingresar monto: 1000
3. [ ] Click en botón rápido ($100)
4. [ ] Escribir descripción: "Depósito de prueba"
5. [ ] Seleccionar método: Transferencia
6. [ ] Click en "Realizar Depósito"
7. [ ] Debe mostrar mensaje de éxito
8. [ ] Debe redirigir a dashboard
9. [ ] Verificar que el saldo aumentó

**Verificar en Consola:**
```javascript
// Ver transacciones
const user = JSON.parse(sessionStorage.getItem('currentUser'));
console.log(user.accounts[0].transactions);
```

### ✅ 6. sendmoney.html (Enviar Dinero)

#### A. Transferencia a Otro Usuario
**Pasos:**
1. [ ] Ir a sendmoney.html
2. [ ] Ver saldo disponible
3. [ ] Ingresar email destinatario: usuario@alke.com (u otro usuario registrado)
4. [ ] Ingresar monto: 500
5. [ ] Descripción: "Pago de cena"
6. [ ] Click en "Enviar Dinero"
7. [ ] Debe mostrar éxito y redirigir

#### B. Transferencia Entre Propias Cuentas (Si tienes múltiples cuentas)
**Pasos:**
1. [ ] Marcar checkbox "Transferir entre mis cuentas"
2. [ ] Seleccionar cuenta destino
3. [ ] Ingresar monto
4. [ ] Click en "Enviar Dinero"

**Verificar:**
- [ ] Saldo disminuye en cuenta origen
- [ ] Saldo aumenta en cuenta destino

### ✅ 7. transsactions.html (Historial)
**Pasos:**
1. [ ] Ir a transactions.html
2. [ ] Ver todas las transacciones
3. [ ] Click en "Recibido" - debe filtrar solo recibidos
4. [ ] Click en "Enviado" - debe filtrar solo enviados
5. [ ] Click en "Todos" - debe mostrar todo

**Verificar:**
- [ ] Totales se calculan correctamente
- [ ] Transacciones ordenadas por fecha (más reciente primero)
- [ ] Colores correctos (verde=recibido, rojo=enviado)

### ✅ 8. contacts.html (Contactos)
**Pasos:**
1. [ ] Ir a contacts.html
2. [ ] Click en "Agregar Contacto"
3. [ ] Llenar formulario:
   - Nombre: María López
   - Email: maria@test.com
   - Tipo: Deudor
   - Monto: 5000
   - Teléfono: +56912345678
   - Notas: Me debe desde junio
4. [ ] Click en "Guardar"
5. [ ] Debe aparecer en la lista
6. [ ] Filtrar por "Me Deben"
7. [ ] Debe mostrar solo deudores
8. [ ] Click en botón eliminar
9. [ ] Debe desaparecer de la lista

**Verificar:**
- [ ] Filtros funcionan correctamente
- [ ] Avatar se genera automáticamente
- [ ] Badge de tipo correcto (verde=deudor, rojo=acreedor)

### ✅ 9. accounts.html (Gestión de Cuentas)
**Pasos:**
1. [ ] Ir a accounts.html
2. [ ] Click en "Nueva Cuenta"
3. [ ] Llenar formulario:
   - Nombre: Ahorros
   - Tipo: savings
   - Saldo inicial: 10000
4. [ ] Click en "Crear Cuenta"
5. [ ] Debe aparecer nueva cuenta
6. [ ] Click en "Establecer como activa"
7. [ ] Verificar badge "Activa" aparece

**Verificar:**
- [ ] Badge verde en cuenta activa
- [ ] Saldo inicial se registra como transacción
- [ ] Al cambiar cuenta activa, el dashboard debe reflejar el cambio

### ✅ 10. budget.html (Presupuesto)
**Pasos:**
1. [ ] Ir a budget.html
2. [ ] Ver presupuesto total (debe ser 50000 + depósitos - envíos)
3. [ ] Click en botón "+" en categoría "Comida"
4. [ ] Asignar monto: 20000
5. [ ] Click en "Guardar"
6. [ ] Ver barra de progreso
7. [ ] Click en "Registrar Gasto"
8. [ ] Categoría: Comida
9. [ ] Monto: 5000
10. [ ] Descripción: Supermercado
11. [ ] Click en "Guardar"
12. [ ] Verificar que barra de progreso aumenta
13. [ ] Click en "Registrar Ingreso"
14. [ ] Repetir proceso

**Verificar:**
- [ ] Barras de progreso se actualizan
- [ ] Colores cambian según porcentaje (verde < 70%, amarillo < 90%, rojo >= 90%)
- [ ] Movimientos recientes se muestran en tabla
- [ ] Totales se calculan correctamente

### ✅ 11. calendar.html (Calendario)
**Pasos:**
1. [ ] Ir a calendar.html
2. [ ] Ver calendario del mes actual
3. [ ] Días con transacciones deben tener indicador
4. [ ] Click en día CON transacciones
5. [ ] Debe abrir modal con detalle
6. [ ] Ver totales del día
7. [ ] Ver lista de transacciones
8. [ ] Click en flechas para navegar meses
9. [ ] Verificar que cambio de mes funciona

**Verificar:**
- [ ] Día actual marcado diferente
- [ ] Contador de transacciones correcto
- [ ] Modal muestra información correcta

### ✅ 12. currency.html (Conversor)
**Pasos:**
1. [ ] Ir a currency.html
2. [ ] Ver saldo en las 3 divisas (USD, CLP, EUR)
3. [ ] Ingresar monto: 100
4. [ ] Seleccionar "De: USD"
5. [ ] Seleccionar "A: CLP"
6. [ ] Click en "Convertir" (o automático)
7. [ ] Debe mostrar resultado
8. [ ] Click en botón swap (intercambiar)
9. [ ] Verificar que divisas se intercambian
10. [ ] Ver tabla de tasas de cambio

**Verificar:**
- [ ] Conversiones son correctas según tasas definidas
- [ ] Saldo se muestra en las 3 divisas
- [ ] Tabla de tasas completa

### ✅ 13. Logout
**Pasos:**
1. [ ] Desde cualquier página autenticada
2. [ ] Click en botón "Cerrar Sesión"
3. [ ] Debe redirigir a login.html
4. [ ] Intentar volver a página autenticada
5. [ ] Debe redirigir de vuelta a login

**Verificar en Consola:**
```javascript
// No debe haber usuario actual
sessionStorage.getItem('currentUser') // debe ser null
```

---

## 🐛 Verificación de Errores en Consola

### En CADA página, hacer:
1. Presionar F12 (DevTools)
2. Ir a pestaña "Console"
3. Recargar página (Ctrl+R)
4. Verificar:
   - [ ] ✅ NO hay errores rojos
   - [ ] ✅ Todos los scripts se cargan (network tab)
   - [ ] ✅ NO hay "404 Not Found" en ningún archivo

### Errores Comunes y Soluciones

#### Error: "Uncaught ReferenceError: VALIDATION is not defined"
**Causa**: constants.js no se cargó antes
**Solución**: Verificar orden de scripts en HTML

#### Error: "Cannot read property 'accounts' of null"
**Causa**: Usuario no está autenticado
**Solución**: Hacer login primero

#### Error: "404 Not Found - constants.js"
**Causa**: Ruta incorrecta del archivo
**Solución**: Verificar que existe `js/config/constants.js`

---

## 📊 Verificación de Datos en localStorage

### Ver Todos los Usuarios
```javascript
JSON.parse(localStorage.getItem('alkeUsers'))
```

### Ver Usuario Actual
```javascript
JSON.parse(sessionStorage.getItem('currentUser'))
```

### Limpiar Datos (Reset Completo)
```javascript
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### Ver Estructura de Usuario
```javascript
const user = JSON.parse(sessionStorage.getItem('currentUser'));
console.log('Nombre:', user.name);
console.log('Email:', user.email);
console.log('Cuentas:', user.accounts);
console.log('Transacciones:', user.accounts[0].transactions);
console.log('Contactos:', user.contacts);
console.log('Presupuesto:', user.budget);
```

---

## 🎯 Pruebas de Flujo Completo

### Flujo 1: Nuevo Usuario Completo
1. [ ] Registrarse
2. [ ] Login
3. [ ] Hacer depósito
4. [ ] Enviar dinero a contacto
5. [ ] Agregar contacto
6. [ ] Crear segunda cuenta
7. [ ] Transferir entre cuentas
8. [ ] Asignar presupuesto
9. [ ] Registrar gasto
10. [ ] Ver calendario
11. [ ] Convertir divisas
12. [ ] Logout

### Flujo 2: Usuario Existente
1. [ ] Login con usuario existente
2. [ ] Verificar que todos sus datos persisten
3. [ ] Hacer nuevas transacciones
4. [ ] Verificar que se agregan correctamente

---

## 📱 Pruebas Responsive

### Probar en Diferentes Tamaños
1. [ ] Desktop (1920x1080)
2. [ ] Tablet (768x1024)
3. [ ] Mobile (375x667)

**Cómo hacerlo:**
- F12 → Click en ícono de dispositivo móvil
- Seleccionar diferentes tamaños
- Verificar que todo se ve bien

---

## ✅ Checklist Final

- [ ] Todas las páginas cargan sin errores
- [ ] No hay errores en consola
- [ ] Todas las funcionalidades funcionan
- [ ] Datos persisten correctamente
- [ ] Responsive funciona en todos los tamaños
- [ ] Logout funciona correctamente
- [ ] Protección de rutas funciona (no puedes acceder sin login)

---

## 🚀 Si Todo Funciona...

¡Felicitaciones! Tu aplicación está lista para:
1. ✅ Subir a GitHub
2. ✅ Deploy en Netlify/Vercel
3. ✅ Mostrar en portfolio
4. ✅ Usar en entrevistas técnicas

---

## 📞 Si Encuentras Errores

Documenta:
1. ¿En qué página ocurre?
2. ¿Qué acción realizaste?
3. ¿Qué error muestra la consola? (F12)
4. ¿Puedes reproducirlo?

Y reporta para corregir antes del deploy final.
