/**
 * transactionService.js
 * Servicio para gestión de transacciones
 * Maneja depósitos, envíos, transferencias y consultas
 */

class TransactionService {
    /**
     * ============================================
     * CREACIÓN DE TRANSACCIONES
     * ============================================
     */
    
    /**
     * Crear objeto de transacción
     * @param {string} type - Tipo de transacción (receive, send, transfer)
     * @param {number} amount - Monto
     * @param {Object} details - Detalles adicionales
     * @returns {Object} Transacción creada
     */
    static create(type, amount, details = {}) {
        return {
            id: Helpers.generateId(),
            type: type,
            amount: amount,
            date: new Date().toISOString(),
            accountId: details.accountId || null,
            ...details
        };
    }
    
    /**
     * ============================================
     * DEPÓSITOS
     * ============================================
     */
    
    /**
     * Procesar depósito en cuenta
     * @param {Object} user - Usuario
     * @param {number} accountId - ID de cuenta
     * @param {number} amount - Monto a depositar
     * @param {string} method - Método de depósito
     * @param {string} description - Descripción
     * @returns {Object} { success: boolean, error?: string }
     */
    static deposit(user, accountId, amount, method, description = 'Depósito') {
        // Validar monto
        if (!Helpers.isValidAmount(amount)) {
            return { success: false, error: ERROR_MESSAGES.INVALID_AMOUNT };
        }
        
        // Validar método
        if (!method) {
            return { success: false, error: ERROR_MESSAGES.NO_METHOD_SELECTED };
        }
        
        // Obtener cuenta
        const account = user.accounts.find(acc => acc.id === accountId);
        if (!account) {
            return { success: false, error: 'Cuenta no encontrada' };
        }
        
        // Actualizar saldo
        account.balance += amount;
        
        // Crear transacción
        const transaction = this.create(TRANSACTION_TYPES.RECEIVE, amount, {
            from: `Depósito (${method})`,
            description: description,
            accountId: accountId
        });
        
        account.transactions.push(transaction);
        
        // Guardar cambios
        StorageService.updateCurrentUser(user);
        
        return { success: true };
    }
    
    /**
     * ============================================
     * ENVÍOS DE DINERO
     * ============================================
     */
    
    /**
     * Validar datos de transferencia
     * @param {number} amount - Monto
     * @param {number} balance - Saldo disponible
     * @param {string} recipient - Email destinatario
     * @returns {Object} { isValid: boolean, error?: string }
     */
    static validateTransfer(amount, balance, recipient = null) {
        if (!Helpers.isValidAmount(amount)) {
            return { isValid: false, error: ERROR_MESSAGES.INVALID_AMOUNT };
        }
        
        if (amount > balance) {
            return { isValid: false, error: ERROR_MESSAGES.INSUFFICIENT_BALANCE };
        }
        
        if (recipient !== null && !recipient) {
            return { isValid: false, error: 'Ingresa email del destinatario' };
        }
        
        return { isValid: true };
    }
    
    /**
     * Transferencia entre cuentas propias
     * @param {Object} user - Usuario
     * @param {number} fromAccountId - ID cuenta origen
     * @param {number} toAccountId - ID cuenta destino
     * @param {number} amount - Monto
     * @param {string} description - Descripción
     * @returns {Object} { success: boolean, error?: string }
     */
    static transferBetweenOwnAccounts(user, fromAccountId, toAccountId, amount, description = '') {
        // Validar que no sean la misma cuenta
        if (fromAccountId === toAccountId) {
            return { success: false, error: ERROR_MESSAGES.SAME_ACCOUNT };
        }
        
        // Obtener cuentas
        const fromAccount = user.accounts.find(acc => acc.id === fromAccountId);
        const toAccount = user.accounts.find(acc => acc.id === toAccountId);
        
        if (!fromAccount || !toAccount) {
            return { success: false, error: 'Cuenta no encontrada' };
        }
        
        // Validar saldo
        const validation = this.validateTransfer(amount, fromAccount.balance);
        if (!validation.isValid) {
            return { success: false, error: validation.error };
        }
        
        // Actualizar saldos
        fromAccount.balance -= amount;
        toAccount.balance += amount;
        
        // Crear transacciones
        const txSend = this.create(TRANSACTION_TYPES.TRANSFER, amount, {
            to: toAccount.name,
            description: description || `Transferencia a ${toAccount.name}`,
            accountId: fromAccountId
        });
        
        const txReceive = this.create(TRANSACTION_TYPES.RECEIVE, amount, {
            from: fromAccount.name,
            description: description || `Transferencia desde ${fromAccount.name}`,
            accountId: toAccountId
        });
        
        fromAccount.transactions.push(txSend);
        toAccount.transactions.push(txReceive);
        
        // Guardar cambios
        StorageService.updateCurrentUser(user);
        
        return { success: true };
    }
    
    /**
     * Enviar dinero a otro usuario
     * @param {Object} sender - Usuario remitente
     * @param {string} recipientEmail - Email destinatario
     * @param {number} amount - Monto
     * @param {string} description - Descripción
     * @returns {Object} { success: boolean, error?: string }
     */
    static sendToUser(sender, recipientEmail, amount, description = '') {
        // Obtener cuenta activa del remitente
        const senderAccount = Helpers.getActiveAccount(sender);
        if (!senderAccount) {
            return { success: false, error: 'No tienes una cuenta activa' };
        }
        
        // Validar transferencia
        const validation = this.validateTransfer(amount, senderAccount.balance, recipientEmail);
        if (!validation.isValid) {
            return { success: false, error: validation.error };
        }
        
        // Verificar que no sea el mismo usuario
        if (recipientEmail.toLowerCase() === sender.email.toLowerCase()) {
            return { success: false, error: 'No puedes enviarte dinero a ti mismo' };
        }
        
        // Buscar destinatario
        const recipient = StorageService.findUserByEmail(recipientEmail);
        if (!recipient) {
            return { success: false, error: ERROR_MESSAGES.USER_NOT_FOUND };
        }
        
        // Obtener cuenta activa del destinatario
        const recipientAccount = Helpers.getActiveAccount(recipient);
        if (!recipientAccount) {
            return { success: false, error: 'El destinatario no tiene una cuenta activa' };
        }
        
        // Actualizar saldos
        senderAccount.balance -= amount;
        recipientAccount.balance += amount;
        
        // Crear transacción del remitente
        const txSend = this.create(TRANSACTION_TYPES.SEND, amount, {
            to: recipient.name,
            description: description,
            accountId: senderAccount.id
        });
        
        senderAccount.transactions.push(txSend);
        
        // Crear transacción del destinatario
        const txReceive = this.create(TRANSACTION_TYPES.RECEIVE, amount, {
            from: sender.name,
            description: description,
            accountId: recipientAccount.id
        });
        
        recipientAccount.transactions.push(txReceive);
        
        // Guardar ambos usuarios
        StorageService.updateUser(sender);
        StorageService.updateUser(recipient);
        StorageService.setCurrentUser(sender);
        
        return { success: true };
    }
    
    /**
     * ============================================
     * CONSULTAS DE TRANSACCIONES
     * ============================================
     */
    
    /**
     * Obtener todas las transacciones de un usuario
     * @param {Object} user - Usuario
     * @returns {Array} Lista de transacciones
     */
    static getAllFromUser(user) {
        return Helpers.getAllUserTransactions(user);
    }
    
    /**
     * Filtrar transacciones por tipo
     * @param {Array} transactions - Lista de transacciones
     * @param {string} type - Tipo a filtrar
     * @returns {Array} Transacciones filtradas
     */
    static filterByType(transactions, type) {
        return transactions.filter(tx => tx.type === type);
    }
    
    /**
     * Obtener transacciones recientes
     * @param {Array} transactions - Lista de transacciones
     * @param {number} limit - Cantidad a retornar
     * @returns {Array} Transacciones recientes
     */
    static getRecent(transactions, limit = 5) {
        return transactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    }
    
    /**
     * Calcular totales
     * @param {Array} transactions - Lista de transacciones
     * @returns {Object} { received: number, sent: number, balance: number }
     */
    static calculateTotals(transactions) {
        const received = transactions
            .filter(tx => tx.type === TRANSACTION_TYPES.RECEIVE)
            .reduce((sum, tx) => sum + tx.amount, 0);
        
        const sent = transactions
            .filter(tx => tx.type === TRANSACTION_TYPES.SEND)
            .reduce((sum, tx) => sum + tx.amount, 0);
        
        return {
            received: received,
            sent: sent,
            balance: received - sent
        };
    }
}
