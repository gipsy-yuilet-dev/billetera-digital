# 📝 Guía: Contactos y Divisas - Alke Wallet

## 👥 Gestión de Contactos Mejorada

### Tipos de Contactos

La aplicación ahora soporta **3 tipos de contactos**:

#### 1. 🟦 Normal
- Contactos estándar
- Para envíos regulares
- Sin seguimiento de deudas

#### 2. 🟢 Me Deben (Deudores)
- Personas que te deben dinero
- Registro opcional del monto
- Filtro rápido disponible
- Útil para préstamos o ventas pendientes

#### 3. 🔴 Les Debo (Acreedores/Proveedores)
- Personas o proveedores a los que les debes
- Registro opcional del monto
- Filtro rápido disponible
- Útil para cuentas por pagar

---

## ➕ Agregar Nuevo Contacto

### Paso a Paso

1. **Ir a Contactos**
   ```
   Dashboard → Contactos
   ```

2. **Clic en "Agregar Contacto"**
   - Botón en la parte superior derecha

3. **Completar Formulario**
   ```
   📝 Campos:
   ├── Nombre Completo *requerido
   ├── Email *requerido
   ├── Tipo de Relación:
   │   ├── Normal
   │   ├── Me Debe (Deudor)
   │   └── Le Debo (Acreedor/Proveedor)
   ├── Monto (opcional, visible solo si es deudor/acreedor)
   ├── Teléfono (opcional)
   └── Notas (opcional)
   ```

4. **Guardar**
   - Clic en "Guardar Contacto"
   - El contacto aparecerá en la lista

---

## 🔍 Filtrar Contactos

### Filtros Disponibles

```
┌────────┬────────────┬────────────┐
│ Todos  │ Me Deben   │ Les Debo   │
└────────┴────────────┴────────────┘
```

- **Todos**: Ver todos los contactos
- **Me Deben**: Solo personas que te deben
- **Les Debo**: Solo personas/proveedores a los que les debes

---

## 💰 Ejemplo de Uso de Contactos

### Caso 1: Proveedor de Servicios
```
Nombre: Compañía Eléctrica
Email: facturacion@companiaelectrica.cl
Tipo: Les Debo (Acreedor/Proveedor)
Monto: $45,000
Notas: Pago mensual - vence día 15
```

### Caso 2: Préstamo a Amigo
```
Nombre: Juan Pérez
Email: juan@email.com
Tipo: Me Debe (Deudor)
Monto: $150,000
Notas: Préstamo 15/12 - acordado pago en 3 meses
```

### Caso 3: Contacto Regular
```
Nombre: María González
Email: maria@email.com
Tipo: Normal
Notas: Amiga, envíos ocasionales
```

---

## 💱 Sistema de Divisas

### Divisas Soportadas

| Divisa | Código | Símbolo | País |
|--------|--------|---------|------|
| Peso Chileno | CLP | $ | 🇨🇱 Chile |
| Dólar Estadounidense | USD | $ | 🇺🇸 USA |
| Euro | EUR | € | 🇪🇺 Europa |

---

## 📊 Presupuestos con Divisas

### Seleccionar Divisa

1. **Ir a Presupuestos**
   ```
   Dashboard → Presupuestos
   ```

2. **Cambiar Divisa**
   - En la parte superior, selector de divisa
   - Elige: CLP, USD o EUR
   - Los montos se actualizan automáticamente

3. **Todos los valores se muestran en la divisa seleccionada**
   - Presupuesto Total
   - Total Gastado
   - Disponible
   - Montos por categoría

### Ejemplo
```
Divisa: CLP 🇨🇱

Presupuesto Total:    $23.000.000 CLP
Total Gastado:        $15.500.000 CLP
Disponible:           $7.500.000 CLP
```

---

## 🔄 Conversor de Divisas

### Acceder al Conversor

```
Dashboard → Divisas
```

### Funcionalidades

#### 1. **Tasas de Cambio Actuales**
- Muestra tasas en tiempo real
- CLP → USD
- CLP → EUR
- USD → EUR

#### 2. **Convertir Montos**
```
┌─────────────────────────────────┐
│  Monto     [1000]      Resultado│
│  Origen    [USD ▼]     [EUR ▼]  │
│                                  │
│  Botón [⇄] para intercambiar    │
└─────────────────────────────────┘
```

**Pasos:**
1. Ingresa el monto
2. Selecciona divisa origen
3. Selecciona divisa destino
4. El resultado se calcula automáticamente

#### 3. **Tabla de Referencia Rápida**
- Conversiones comunes predefinidas
- Actualiza según las divisas seleccionadas

#### 4. **Tu Saldo en Diferentes Divisas**
- Ver saldo de cuenta activa
- Convertido a CLP, USD y EUR
- Actualización automática

---

## 💡 Casos de Uso Prácticos

### Uso 1: Pago a Proveedor Internacional
```
1. Tienes cuenta en CLP
2. Proveedor cobra en USD
3. Vas a Divisas
4. Conviertes CLP → USD
5. Sabes cuánto enviar
```

### Uso 2: Control de Presupuesto Viajero
```
1. Viajas a Europa
2. Cambias presupuesto a EUR
3. Registras gastos en EUR
4. Al regresar, cambias a CLP
```

### Uso 3: Gestión de Deudas Internacionales
```
1. Amigo te debe 500 USD
2. Agregas contacto tipo "Me Debe"
3. Monto: 500
4. Vas a Divisas
5. Conviertes USD → CLP para saber equivalente local
```

---

## 📈 Tasas de Cambio

### Tasas Aproximadas (Ejemplo)
```
1 USD = 920 CLP
1 EUR = 1,000 CLP
1 USD = 0.92 EUR
```

### Conversión Rápida
```
$100 USD  →  $92,000 CLP
€50 EUR   →  $50,000 CLP
$1,000 CLP →  $1.09 USD
```

**Nota**: Las tasas son simuladas. En producción se usaría una API real.

---

## ⚠️ Consideraciones Importantes

### Sobre Contactos
- Los emails deben ser únicos
- Puedes eliminar contactos con el botón 🗑️
- Los montos en contactos son referenciales
- Las notas te ayudan a recordar contexto

### Sobre Divisas
- La divisa se guarda por usuario
- Cambiar divisa NO convierte montos existentes
- Es solo una preferencia de visualización
- Las transacciones se registran en la divisa actual

---

## 🆘 Preguntas Frecuentes

**P: ¿Puedo tener contactos con el mismo nombre?**
R: Sí, pero deben tener emails diferentes.

**P: ¿Los montos en contactos se restan automáticamente?**
R: No, son solo referencias. Debes hacer las transacciones manualmente.

**P: ¿Las tasas de cambio son reales?**
R: Son simuladas. En producción se conectaría a una API de tasas reales.

**P: ¿Puedo enviar dinero directamente desde contactos?**
R: Sí, cada contacto tiene un botón "Enviar" que te lleva a sendmoney.html.

**P: ¿Al cambiar de divisa se convierten mis saldos?**
R: No, es solo una preferencia visual. Los saldos reales no cambian.

**P: ¿Puedo agregar más divisas?**
R: Actualmente solo CLP, USD y EUR. Se pueden agregar más en el código.

---

## 🎯 Consejos de Uso

### Para Contactos
✅ Usa notas para fechas de pago  
✅ Actualiza montos cuando paguen  
✅ Organiza proveedores con tipo "Les Debo"  
✅ Revisa filtros regularmente  

### Para Divisas
✅ Cambia divisa según contexto (viaje, trabajo internacional)  
✅ Usa conversor antes de transacciones internacionales  
✅ Revisa tu saldo en diferentes monedas  
✅ Mantén registro de qué divisa usaste en cada transacción  

---

**¡Gestiona tus finanzas internacionalmente! 🌎**

Más guías: [GUIA_RAPIDA.md](GUIA_RAPIDA.md) | [GUIA_PRESUPUESTOS.md](GUIA_PRESUPUESTOS.md)
