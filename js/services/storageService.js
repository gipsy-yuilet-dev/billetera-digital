/**
 * storageService.js
 * Servicio centralizado para manejo de localStorage y sessionStorage
 * Todas las operaciones de persistencia pasan por aquí
 */

class StorageService {
    /**
     * ============================================
     * GESTIÓN DE USUARIOS (localStorage)
     * ============================================
     */
    
    /**
     * Obtener todos los usuarios de la base de datos
     * @returns {Array} Lista de usuarios
     */
    static getUsers() {
        const users = localStorage.getItem(STORAGE_KEYS.USERS_DB);
        return users ? JSON.parse(users) : [];
    }
    
    /**
     * Guardar todos los usuarios en la base de datos
     * @param {Array} users - Lista de usuarios a guardar
     */
    static saveUsers(users) {
        localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users));
    }
    
    /**
     * Buscar usuario por email
     * @param {string} email - Email del usuario
     * @returns {Object|null} Usuario encontrado o null
     */
    static findUserByEmail(email) {
        const users = this.getUsers();
        return users.find(u => u.email === email.toLowerCase()) || null;
    }
    
    /**
     * Agregar nuevo usuario a la base de datos
     * @param {Object} user - Datos del nuevo usuario
     * @returns {boolean} True si se agregó exitosamente
     */
    static addUser(user) {
        const users = this.getUsers();
        users.push(user);
        this.saveUsers(users);
        return true;
    }
    
    /**
     * Actualizar datos de un usuario existente
     * @param {Object} user - Usuario con datos actualizados
     * @returns {boolean} True si se actualizó exitosamente
     */
    static updateUser(user) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.email === user.email);
        
        if (index !== -1) {
            users[index] = user;
            this.saveUsers(users);
            return true;
        }
        return false;
    }
    
    /**
     * Verificar si un email ya está registrado
     * @param {string} email - Email a verificar
     * @returns {boolean} True si el email existe
     */
    static emailExists(email) {
        return this.findUserByEmail(email) !== null;
    }
    
    /**
     * ============================================
     * GESTIÓN DE SESIÓN (sessionStorage)
     * ============================================
     */
    
    /**
     * Obtener usuario de la sesión actual
     * @returns {Object|null} Usuario actual o null
     */
    static getCurrentUser() {
        const user = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        return user ? JSON.parse(user) : null;
    }
    
    /**
     * Establecer usuario en la sesión actual
     * @param {Object} user - Usuario a establecer en sesión
     */
    static setCurrentUser(user) {
        sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    }
    
    /**
     * Actualizar usuario actual (sesión y localStorage)
     * @param {Object} user - Usuario con datos actualizados
     * @returns {boolean} True si se actualizó exitosamente
     */
    static updateCurrentUser(user) {
        this.setCurrentUser(user);
        return this.updateUser(user);
    }
    
    /**
     * Cerrar sesión actual
     */
    static clearCurrentUser() {
        sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
    
    /**
     * Verificar si hay una sesión activa
     * @returns {boolean} True si hay usuario logueado
     */
    static isAuthenticated() {
        return this.getCurrentUser() !== null;
    }
    
    /**
     * ============================================
     * INICIALIZACIÓN DE DATOS
     * ============================================
     */
    
    /**
     * Inicializar base de datos con usuarios de prueba
     * Solo se ejecuta si no hay datos previos
     */
    static initializeDatabase() {
        if (this.getUsers().length === 0) {
            const initialUsers = [
                {
                    email: 'usuario@alke.com',
                    password: '123456',
                    name: 'Ihor',
                    activeAccountId: 1,
                    currency: 'USD',
                    accounts: [
                        {
                            id: 1,
                            name: 'Cuenta Corriente',
                            type: 'corriente',
                            balance: 11547.54,
                            transactions: [
                                { 
                                    id: 1, 
                                    type: 'receive', 
                                    amount: 1500.00, 
                                    from: 'Ana P.', 
                                    date: new Date('2026-01-10T14:30:00').toISOString(), 
                                    description: 'Pago de servicio', 
                                    accountId: 1 
                                },
                                { 
                                    id: 2, 
                                    type: 'send', 
                                    amount: 350.00, 
                                    to: 'Carlos D.', 
                                    date: new Date('2026-01-09T10:15:00').toISOString(), 
                                    description: 'Cena compartida', 
                                    accountId: 1 
                                }
                            ]
                        },
                        {
                            id: 2,
                            name: 'Cuenta de Ahorro',
                            type: 'ahorro',
                            balance: 5000.00,
                            transactions: [
                                { 
                                    id: 1, 
                                    type: 'receive', 
                                    amount: 5000.00, 
                                    from: 'Depósito inicial', 
                                    date: new Date('2026-01-01T10:00:00').toISOString(), 
                                    description: 'Ahorro inicial', 
                                    accountId: 2 
                                }
                            ]
                        }
                    ],
                    contacts: [
                        { name: 'Ana P.', email: 'ana@example.com', type: 'normal', avatar: 'https://ui-avatars.com/api/?name=Ana+P&background=random' },
                        { name: 'Carlos D.', email: 'carlos@example.com', type: 'normal', avatar: 'https://ui-avatars.com/api/?name=Carlos+D&background=random' }
                    ],
                    budget: JSON.parse(JSON.stringify(DEFAULT_BUDGET_CATEGORIES))
                },
                {
                    email: 'maria@alke.com',
                    password: 'password',
                    name: 'María',
                    activeAccountId: 1,
                    currency: 'USD',
                    accounts: [
                        {
                            id: 1,
                            name: 'Cuenta Corriente',
                            type: 'corriente',
                            balance: 500.00,
                            transactions: []
                        }
                    ],
                    contacts: [],
                    budget: JSON.parse(JSON.stringify(DEFAULT_BUDGET_CATEGORIES))
                }
            ];
            
            this.saveUsers(initialUsers);
        }
    }
}

// Inicializar base de datos al cargar el script
StorageService.initializeDatabase();
