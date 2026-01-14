/**
 * authService.js
 * Servicio de autenticación
 * Maneja login, registro y gestión de sesiones
 */

class AuthService {
    /**
     * ============================================
     * LOGIN
     * ============================================
     */
    
    /**
     * Iniciar sesión
     * @param {string} email - Email del usuario
     * @param {string} password - Contraseña
     * @returns {Object} { success: boolean, user?: Object, error?: string }
     */
    static login(email, password) {
        const user = StorageService.findUserByEmail(email);
        
        if (!user) {
            return { 
                success: false, 
                error: ERROR_MESSAGES.USER_NOT_FOUND 
            };
        }
        
        if (user.password !== password) {
            return { 
                success: false, 
                error: ERROR_MESSAGES.WRONG_PASSWORD 
            };
        }
        
        // Guardar sesión
        StorageService.setCurrentUser(user);
        
        return { 
            success: true, 
            user: user 
        };
    }
    
    /**
     * ============================================
     * REGISTRO
     * ============================================
     */
    
    /**
     * Registrar nuevo usuario
     * @param {Object} userData - Datos del nuevo usuario
     * @returns {Object} { success: boolean, user?: Object, error?: string }
     */
    static register(userData) {
        // Validar datos
        const validation = this.validateRegistration(userData);
        if (!validation.isValid) {
            return { 
                success: false, 
                error: validation.error 
            };
        }
        
        // Verificar si el email ya existe
        if (StorageService.emailExists(userData.email)) {
            return { 
                success: false, 
                error: ERROR_MESSAGES.EMAIL_EXISTS 
            };
        }
        
        // Crear nuevo usuario
        const newUser = this.createNewUser(userData);
        
        // Guardar en base de datos
        StorageService.addUser(newUser);
        
        return { 
            success: true, 
            user: newUser 
        };
    }
    
    /**
     * Validar datos de registro
     * @param {Object} data - Datos a validar
     * @returns {Object} { isValid: boolean, error?: string }
     */
    static validateRegistration(data) {
        // Campos vacíos
        if (!data.name || !data.email || !data.password || !data.confirmPassword) {
            return { isValid: false, error: ERROR_MESSAGES.EMPTY_FIELDS };
        }
        
        // Email válido
        if (!Helpers.isValidEmail(data.email)) {
            return { isValid: false, error: ERROR_MESSAGES.INVALID_EMAIL };
        }
        
        // Contraseña mínima
        if (data.password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
            return { isValid: false, error: ERROR_MESSAGES.SHORT_PASSWORD };
        }
        
        // Contraseñas coinciden
        if (data.password !== data.confirmPassword) {
            return { isValid: false, error: ERROR_MESSAGES.PASSWORDS_MISMATCH };
        }
        
        // Presupuesto mínimo
        const budget = parseFloat(data.initialBudget) || 0;
        if (budget < VALIDATION.MIN_INITIAL_BUDGET) {
            return { isValid: false, error: ERROR_MESSAGES.LOW_BUDGET };
        }
        
        return { isValid: true };
    }
    
    /**
     * Crear objeto de nuevo usuario con estructura completa
     * @param {Object} data - Datos del formulario
     * @returns {Object} Usuario completo
     */
    static createNewUser(data) {
        const initialBudget = parseFloat(data.initialBudget) || VALIDATION.MIN_INITIAL_BUDGET;
        const userCurrency = data.currency || 'CLP';
        
        return {
            email: data.email.toLowerCase(),
            password: data.password,
            name: data.name,
            avatar: data.avatar || Helpers.generateAvatar(data.name),
            activeAccountId: 1,
            currency: userCurrency,
            accounts: [
                {
                    id: 1,
                    name: 'Cuenta Corriente',
                    type: ACCOUNT_TYPES.CORRIENTE,
                    balance: initialBudget,
                    transactions: [
                        {
                            id: 1,
                            type: TRANSACTION_TYPES.RECEIVE,
                            amount: initialBudget,
                            from: 'Presupuesto Inicial',
                            date: new Date().toISOString(),
                            description: 'Saldo de bienvenida',
                            accountId: 1
                        }
                    ]
                }
            ],
            contacts: [],
            budget: Helpers.deepClone(DEFAULT_BUDGET_CATEGORIES),
            bills: []
        };
    }
    
    /**
     * ============================================
     * SESIÓN
     * ============================================
     */
    
    /**
     * Cerrar sesión
     */
    static logout() {
        StorageService.clearCurrentUser();
        Helpers.redirect(ROUTES.LOGIN);
    }
    
    /**
     * Verificar si hay sesión activa
     * @returns {boolean}
     */
    static isAuthenticated() {
        return StorageService.isAuthenticated();
    }
    
    /**
     * Obtener usuario actual
     * @returns {Object|null}
     */
    static getCurrentUser() {
        return StorageService.getCurrentUser();
    }
}
