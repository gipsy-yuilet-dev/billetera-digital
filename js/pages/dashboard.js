/**
 * dashboard.js
 * Lógica específica de la página del dashboard (menu.html)
 */

$(document).ready(function() {
    // Requerir autenticación
    const currentUser = Helpers.requireAuth();
    if (!currentUser) return;
    
    // Obtener cuenta activa
    const activeAccount = Helpers.getActiveAccount(currentUser);
    
    /**
     * ============================================
     * INFORMACIÓN DE USUARIO Y CUENTA
     * ============================================
     */
    
    function initUserInfo() {
        // Mostrar nombre de usuario
        $('.userName').text(currentUser.name);
        
        // Mostrar avatar del usuario
        if (currentUser.avatar && $('#userAvatar').length) {
            $('#userAvatar').attr('src', currentUser.avatar);
        } else if ($('#userAvatar').length) {
            $('#userAvatar').attr('src', Helpers.generateAvatar(currentUser.name));
        }
        
        // Mostrar saldo de cuenta activa y moneda
        if ($('#userBalance').length && activeAccount) {
            const formatted = Helpers.formatCurrency(activeAccount.balance, currentUser.currency);
            $('#userBalance').text(formatted);
            
            // Mostrar moneda del usuario
            const currencyInfo = CURRENCIES[currentUser.currency];
            if (currencyInfo && $('#userCurrency').length) {
                $('#userCurrency').text(`${currencyInfo.flag} ${currencyInfo.code}`);
            }
            
            // Mostrar conversión a otras monedas
            showCurrencyConversion(activeAccount.balance, currentUser.currency);
        }
        
        // Inicializar información de conexión
        updateConnectionInfo();
        // Actualizar cada minuto
        setInterval(updateConnectionInfo, 60000);
    }
    
    /**
     * Mostrar conversión de monedas
     */
    function showCurrencyConversion(balance, fromCurrency) {
        if ($('#balanceUSD').length) {
            const usdAmount = Helpers.convertCurrency(balance, fromCurrency, 'USD');
            $('#balanceUSD').text(Helpers.formatCurrency(usdAmount, 'USD'));
        }
        
        if ($('#balanceEUR').length) {
            const eurAmount = Helpers.convertCurrency(balance, fromCurrency, 'EUR');
            $('#balanceEUR').text(Helpers.formatCurrency(eurAmount, 'EUR'));
        }
        
        if ($('#balanceCLP').length) {
            const clpAmount = Helpers.convertCurrency(balance, fromCurrency, 'CLP');
            $('#balanceCLP').text(Helpers.formatCurrency(clpAmount, 'CLP'));
        }
    }
    
    /**
     * Actualizar información de conexión (fecha y hora)
     */
    function updateConnectionInfo() {
        if ($('#connectionInfo').length) {
            const now = new Date();
            const date = now.toLocaleDateString('es-ES', { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric' 
            });
            const time = now.toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit'
            });
            $('#connectionInfo').html(`<i class="fas fa-clock"></i> ${date} - ${time}`);
        }
    }
    
    /**
     * ============================================
     * SELECTOR DE CUENTAS
     * ============================================
     */
    
    function initAccountSelector() {
        if (currentUser.accounts && currentUser.accounts.length > 1) {
            const selectorHTML = `
                <div class="mt-3">
                    <select class="form-select form-select-sm" id="accountSelector" style="max-width: 250px; margin: 0 auto;">
                        ${currentUser.accounts.map(acc => `
                            <option value="${acc.id}" ${acc.id === currentUser.activeAccountId ? 'selected' : ''}>
                                ${acc.name} - ${Helpers.formatCurrency(acc.balance, currentUser.currency)}
                            </option>
                        `).join('')}
                    </select>
                </div>
            `;
            
            $('.welcome-card .card-body').append(selectorHTML);
            
            // Evento de cambio de cuenta
            $('#accountSelector').change(function() {
                currentUser.activeAccountId = parseInt($(this).val());
                StorageService.updateCurrentUser(currentUser);
                location.reload();
            });
        }
    }
    
    /**
     * ============================================
     * TABLA DEBE Y HABER
     * ============================================
     */
    
    function initDebitCreditTable() {
        if (!$('#debitList').length || !$('#creditList').length) return;
        
        const allTransactions = TransactionService.getAllFromUser(currentUser);
        const debits = TransactionService.filterByType(allTransactions, TRANSACTION_TYPES.SEND);
        const credits = TransactionService.filterByType(allTransactions, TRANSACTION_TYPES.RECEIVE);
        
        const totals = TransactionService.calculateTotals(allTransactions);
        
        // Actualizar resumen
        $('#totalDebit').text(Helpers.formatCurrency(totals.sent, currentUser.currency));
        $('#totalCredit').text(Helpers.formatCurrency(totals.received, currentUser.currency));
        $('#finalBalance').text(Helpers.formatCurrency(totals.balance, currentUser.currency));
        
        // Llenar lista DEBE (últimas 5)
        const recentDebits = TransactionService.getRecent(debits, VALIDATION.MAX_DASHBOARD_DEBIT);
        const debitList = $('#debitList');
        
        if (recentDebits.length > 0) {
            debitList.empty();
            recentDebits.forEach(tx => {
                const time = Helpers.formatTime(tx.date);
                debitList.append(`
                    <div class="list-group-item d-flex justify-content-between align-items-center p-2">
                        <div>
                            <small class="d-block fw-bold">${tx.to}</small>
                            <small class="text-muted">${time}</small>
                        </div>
                        <span class="badge bg-danger">${Helpers.formatCurrency(tx.amount, currentUser.currency)}</span>
                    </div>
                `);
            });
        } else {
            debitList.html('<small class="text-muted p-2">Sin gastos registrados</small>');
        }
        
        // Llenar lista HABER (últimas 5)
        const recentCredits = TransactionService.getRecent(credits, VALIDATION.MAX_DASHBOARD_CREDIT);
        const creditList = $('#creditList');
        
        if (recentCredits.length > 0) {
            creditList.empty();
            recentCredits.forEach(tx => {
                const time = Helpers.formatTime(tx.date);
                creditList.append(`
                    <div class="list-group-item d-flex justify-content-between align-items-center p-2">
                        <div>
                            <small class="d-block fw-bold">${tx.from}</small>
                            <small class="text-muted">${time}</small>
                        </div>
                        <span class="badge bg-success">${Helpers.formatCurrency(tx.amount, currentUser.currency)}</span>
                    </div>
                `);
            });
        } else {
            creditList.html('<small class="text-muted p-2">Sin ingresos registrados</small>');
        }
    }
    
    /**
     * ============================================
     * TRANSACCIONES RECIENTES
     * ============================================
     */
    
    function initRecentTransactions() {
        if (!$('#recentTransactions').length) return;
        
        const allTransactions = TransactionService.getAllFromUser(currentUser);
        const recent = TransactionService.getRecent(allTransactions, VALIDATION.MAX_RECENT_TRANSACTIONS);
        const container = $('#recentTransactions');
        
        if (recent.length > 0) {
            container.empty();
            recent.forEach(tx => {
                const isReceive = tx.type === TRANSACTION_TYPES.RECEIVE;
                const icon = isReceive ? 'fa-arrow-down text-success' : 'fa-arrow-up text-danger';
                const contact = isReceive ? tx.from : tx.to;
                const sign = isReceive ? '+' : '-';
                const amountClass = isReceive ? 'text-success' : 'text-danger';
                const time = Helpers.formatTime(tx.date);
                
                container.append(`
                    <div class="transaction-item d-flex align-items-center p-2 mb-2 border-bottom">
                        <div class="me-3">
                            <i class="fas ${icon}"></i>
                        </div>
                        <div class="flex-grow-1">
                            <div class="fw-bold">${contact}</div>
                            <small class="text-muted">${time}</small>
                        </div>
                        <div class="${amountClass} fw-bold">
                            ${sign}${Helpers.formatCurrency(tx.amount, currentUser.currency)}
                        </div>
                    </div>
                `);
            });
        } else {
            container.html('<div class="text-center text-muted p-3">No hay transacciones recientes</div>');
        }
    }
    
    /**
     * ============================================
     * CONTACTOS FRECUENTES
     * ============================================
     */
    
    function initFrequentContacts() {
        if (!$('#frequentContacts').length || !currentUser.contacts) return;
        
        const container = $('#frequentContacts');
        const topContacts = currentUser.contacts.slice(0, VALIDATION.MAX_FREQUENT_CONTACTS);
        
        if (topContacts.length > 0) {
            container.empty();
            topContacts.forEach(contact => {
                container.append(`
                    <div class="col-4">
                        <div class="text-center">
                            <img src="${contact.avatar}" alt="${contact.name}" class="rounded-circle mb-2" style="width: 50px; height: 50px;">
                            <div><small>${Helpers.truncate(contact.name, 15)}</small></div>
                        </div>
                    </div>
                `);
            });
        } else {
            container.html('<div class="col-12 text-center text-muted">No hay contactos</div>');
        }
    }
    
    /**
     * ============================================
     * LOGOUT
     * ============================================
     */
    
    $('#logoutBtn').click(function(e) {
        e.preventDefault();
        AuthService.logout();
    });
    
    /**
     * ============================================
     * INICIALIZACIÓN
     * ============================================
     */
    
    initUserInfo();
    initAccountSelector();
    initDebitCreditTable();
    initRecentTransactions();
    initFrequentContacts();
});
