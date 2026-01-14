/**
 * helpers.js
 * Funciones auxiliares reutilizables en toda la aplicación
 */

class Helpers {
    /**
     * ============================================
     * GESTIÓN DE CUENTAS
     * ============================================
     */
    
    /**
     * Obtener cuenta activa del usuario
     * @param {Object} user - Usuario
     * @returns {Object|null} Cuenta activa o null
     */
    static getActiveAccount(user) {
        if (!user || !user.accounts || user.accounts.length === 0) {
            return null;
        }
        
        const activeAccount = user.accounts.find(acc => acc.id === user.activeAccountId);
        return activeAccount || user.accounts[0];
    }
    
    /**
     * Obtener todas las transacciones de un usuario
     * @param {Object} user - Usuario
     * @returns {Array} Lista de transacciones con información de cuenta
     */
    static getAllUserTransactions(user) {
        if (!user || !user.accounts) return [];
        
        const allTransactions = [];
        user.accounts.forEach(account => {
            if (account.transactions) {
                account.transactions.forEach(tx => {
                    allTransactions.push({
                        ...tx,
                        accountId: account.id,
                        accountName: account.name
                    });
                });
            }
        });
        
        return allTransactions;
    }
    
    /**
     * ============================================
     * FORMATEO DE DATOS
     * ============================================
     */
    
    /**
     * Formatear monto con símbolo de moneda
     * @param {number} amount - Monto a formatear
     * @param {string} currency - Código de moneda (USD, CLP, EUR)
     * @returns {string} Monto formateado
     */
    static formatCurrency(amount, currency = 'USD') {
        const symbol = this.getCurrencySymbol(currency);
        const formatted = amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        return `${symbol}${formatted}`;
    }
    
    /**
     * Obtener símbolo de moneda
     * @param {string} currency - Código de moneda
     * @returns {string} Símbolo de moneda
     */
    static getCurrencySymbol(currency) {
        return CURRENCIES[currency]?.symbol || '$';
    }
    
    /**
     * Formatear fecha a string legible
     * @param {string|Date} date - Fecha a formatear
     * @returns {string} Fecha formateada
     */
    static formatDate(date) {
        const d = new Date(date);
        return d.toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
    
    /**
     * Formatear hora
     * @param {string|Date} date - Fecha con hora
     * @returns {string} Hora formateada
     */
    static formatTime(date) {
        const d = new Date(date);
        return d.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }
    
    /**
     * ============================================
     * VALIDACIONES
     * ============================================
     */
    
    /**
     * Validar email
     * @param {string} email - Email a validar
     * @returns {boolean} True si es válido
     */
    static isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    /**
     * Validar monto
     * @param {number} amount - Monto a validar
     * @returns {boolean} True si es válido (positivo)
     */
    static isValidAmount(amount) {
        return !isNaN(amount) && amount > 0;
    }
    
    /**
     * ============================================
     * NAVEGACIÓN
     * ============================================
     */
    
    /**
     * Redirigir a otra página
     * @param {string} route - Ruta de destino
     * @param {number} delay - Delay en milisegundos (opcional)
     */
    static redirect(route, delay = 0) {
        setTimeout(() => {
            window.location.href = route;
        }, delay);
    }
    
    /**
     * Verificar autenticación y redirigir si no está logueado
     * @returns {Object|null} Usuario actual o null (redirige a login)
     */
    static requireAuth() {
        const currentPage = window.location.pathname.split("/").pop();
        const publicPages = ['login.html', 'register.html', 'index.html', ''];
        
        if (!publicPages.includes(currentPage)) {
            const user = StorageService.getCurrentUser();
            if (!user) {
                this.redirect(ROUTES.LOGIN);
                return null;
            }
            return user;
        }
        
        return StorageService.getCurrentUser();
    }
    
    /**
     * ============================================
     * UI HELPERS
     * ============================================
     */
    
    /**
     * Mostrar mensaje de error
     * @param {string} message - Mensaje a mostrar
     * @param {string} elementId - ID del elemento donde mostrar (opcional)
     */
    static showError(message, elementId = 'error-msg') {
        const errorElement = $(`#${elementId}`);
        if (errorElement.length) {
            const textElement = errorElement.find('#error-text, .error-text');
            if (textElement.length) {
                textElement.text(message);
            }
            errorElement.removeClass('d-none').hide().fadeIn();
        } else {
            alert(message);
        }
    }
    
    /**
     * Mostrar mensaje de éxito
     * @param {string} message - Mensaje a mostrar
     * @param {string} elementId - ID del elemento donde mostrar (opcional)
     */
    static showSuccess(message, elementId = 'success-msg') {
        const successElement = $(`#${elementId}`);
        if (successElement.length) {
            const textElement = successElement.find('#success-text, .success-text');
            if (textElement.length) {
                textElement.text(message);
            }
            successElement.removeClass('d-none').hide().fadeIn();
        } else {
            alert(message);
        }
    }
    
    /**
     * Ocultar todos los mensajes
     */
    static hideMessages() {
        $('#error-msg, #success-msg').addClass('d-none');
    }
    
    /**
     * Generar avatar usando UI Avatars
     * @param {string} name - Nombre para el avatar
     * @returns {string} URL del avatar
     */
    static generateAvatar(name) {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
    }
    
    /**
     * ============================================
     * CONVERSIÓN DE DIVISAS
     * ============================================
     */
    
    /**
     * Convertir entre divisas
     * @param {number} amount - Monto a convertir
     * @param {string} from - Divisa origen
     * @param {string} to - Divisa destino
     * @returns {number} Monto convertido
     */
    static convertCurrency(amount, from, to) {
        if (from === to) return amount;
        
        const rate = EXCHANGE_RATES[from]?.[to];
        if (!rate) {
            console.error(`No existe tasa de cambio de ${from} a ${to}`);
            return amount;
        }
        
        return amount * rate;
    }
    
    /**
     * ============================================
     * UTILIDADES GENERALES
     * ============================================
     */
    
    /**
     * Generar ID único basado en timestamp
     * @returns {number} ID único
     */
    static generateId() {
        return Date.now();
    }
    
    /**
     * Copiar objeto profundo (deep clone)
     * @param {Object} obj - Objeto a copiar
     * @returns {Object} Copia del objeto
     */
    static deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    
    /**
     * Truncar texto
     * @param {string} text - Texto a truncar
     * @param {number} maxLength - Longitud máxima
     * @returns {string} Texto truncado
     */
    static truncate(text, maxLength = 50) {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
}
