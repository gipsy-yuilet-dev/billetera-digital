/**
 * constants.js
 * Constantes globales de la aplicación Alke Wallet
 * Centraliza todos los valores hardcodeados para facilitar mantenimiento
 */

// Validaciones
const VALIDATION = {
    MIN_PASSWORD_LENGTH: 6,
    MIN_INITIAL_BUDGET: 10000,
    MAX_QUICK_CONTACTS: 4,
    MAX_RECENT_TRANSACTIONS: 5,
    MAX_DASHBOARD_DEBIT: 5,
    MAX_DASHBOARD_CREDIT: 5,
    MAX_FREQUENT_CONTACTS: 3,
    MAX_PENDING_PAYMENTS: 3
};

// Mensajes de error
const ERROR_MESSAGES = {
    EMPTY_FIELDS: 'Por favor complete todos los campos',
    SHORT_PASSWORD: 'La contraseña debe tener al menos 6 caracteres',
    PASSWORDS_MISMATCH: 'Las contraseñas no coinciden',
    EMAIL_EXISTS: 'Este correo ya está registrado. Intenta con otro.',
    LOW_BUDGET: 'El presupuesto inicial debe ser mínimo $10,000',
    INVALID_EMAIL: 'Por favor ingresa un email válido',
    USER_NOT_FOUND: 'Usuario no encontrado',
    WRONG_PASSWORD: 'Contraseña incorrecta',
    INVALID_AMOUNT: 'Por favor ingresa un monto válido',
    INSUFFICIENT_BALANCE: 'Saldo insuficiente',
    SAME_ACCOUNT: 'No puedes transferir a la misma cuenta',
    SELECT_DESTINATION: 'Selecciona una cuenta destino',
    CONTACT_EXISTS: 'Este email ya está en tus contactos',
    BUDGET_EXCEEDED: 'Este gasto excedería tu presupuesto asignado',
    NO_METHOD_SELECTED: 'Selecciona un método de depósito'
};

// Mensajes de éxito
const SUCCESS_MESSAGES = {
    REGISTER_SUCCESS: '¡Registro exitoso! Redirigiendo...',
    LOGIN_SUCCESS: 'Inicio de sesión exitoso',
    TRANSFER_SUCCESS: 'Transferencia realizada exitosamente',
    DEPOSIT_SUCCESS: 'Depósito realizado exitosamente',
    CONTACT_SAVED: 'Contacto guardado exitosamente',
    BUDGET_SAVED: 'Presupuesto guardado exitosamente',
    ACCOUNT_CREATED: 'Cuenta creada exitosamente',
    EXPENSE_RECORDED: 'Gasto registrado exitosamente',
    INCOME_RECORDED: 'Ingreso registrado exitosamente'
};

// Claves de almacenamiento
const STORAGE_KEYS = {
    USERS_DB: 'usersDB',
    CURRENT_USER: 'currentUser'
};

// Tipos de transacciones
const TRANSACTION_TYPES = {
    RECEIVE: 'receive',
    SEND: 'send',
    TRANSFER: 'transfer'
};

// Tipos de cuentas
const ACCOUNT_TYPES = {
    CORRIENTE: 'corriente',
    AHORRO: 'ahorro',
    VISTA: 'vista'
};

// Tipos de contactos
const CONTACT_TYPES = {
    NORMAL: 'normal',
    DEBTOR: 'debtor',
    CREDITOR: 'creditor'
};

// Divisas soportadas
const CURRENCIES = {
    USD: { code: 'USD', symbol: '$', name: 'Dólar Estadounidense', flag: '🇺🇸' },
    CLP: { code: 'CLP', symbol: '$', name: 'Peso Chileno', flag: '🇨🇱' },
    EUR: { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' }
};

// Tasas de cambio (simuladas - en producción usar API real)
const EXCHANGE_RATES = {
    CLP: { USD: 0.0011, EUR: 0.0010, CLP: 1 },
    USD: { CLP: 920, EUR: 0.92, USD: 1 },
    EUR: { CLP: 1000, USD: 1.09, EUR: 1 }
};

// Iconos de categorías de presupuesto
const CATEGORY_ICONS = {
    trabajo: 'fa-briefcase text-primary',
    presupuesto: 'fa-piggy-bank text-success',
    agua: 'fa-tint text-info',
    telecomunicaciones: 'fa-broadcast-tower text-primary',
    educacion: 'fa-graduation-cap text-warning',
    vivienda: 'fa-home text-success',
    transporte: 'fa-bus text-danger',
    alimentacion: 'fa-utensils text-secondary',
    varios: 'fa-shopping-bag text-dark'
};

// Configuración de presupuesto por defecto
const DEFAULT_BUDGET_CATEGORIES = {
    // Ingresos
    trabajo: { name: 'Trabajo/Sueldo', type: 'income', assigned: 0, received: 0 },
    presupuesto: { name: 'Saldo/Presupuesto', type: 'income', assigned: 0, received: 0 },
    // Gastos
    agua: { name: 'Agua', type: 'expense', assigned: 0, spent: 0 },
    telecomunicaciones: { name: 'Telecomunicaciones', type: 'expense', assigned: 0, spent: 0 },
    educacion: { name: 'Educación', type: 'expense', assigned: 0, spent: 0 },
    vivienda: { name: 'Vivienda', type: 'expense', assigned: 0, spent: 0 },
    transporte: { name: 'Transporte', type: 'expense', assigned: 0, spent: 0 },
    alimentacion: { name: 'Alimentación', type: 'expense', assigned: 0, spent: 0 },
    varios: { name: 'Gastos Varios', type: 'expense', assigned: 0, spent: 0 }
};

// Nombres de meses en español
const MONTH_NAMES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Nombres de días en español
const DAY_NAMES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

// Rutas de navegación
const ROUTES = {
    LOGIN: 'login.html',
    REGISTER: 'register.html',
    DASHBOARD: 'menu.html',
    TRANSACTIONS: 'transactions.html',
    CONTACTS: 'contacts.html',
    ACCOUNTS: 'accounts.html',
    BUDGET: 'budget.html',
    CALENDAR: 'calendar.html',
    CURRENCY: 'currency.html',
    DEPOSIT: 'deposit.html',
    SEND_MONEY: 'sendmoney.html'
};
