/**
 * transactions.js
 * Lógica específica de la página de transacciones
 */

$(document).ready(function() {
    const currentUser = Helpers.requireAuth();
    if (!currentUser) return;
    
    // Mostrar nombre de usuario
    $('.userName').text(currentUser.name);
    
    // Mostrar fecha actual
    const today = new Date();
    const dateStr = today.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    $('#currentDate').text(dateStr);
    
    // Actualizar información de conexión
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
    updateConnectionInfo();
    setInterval(updateConnectionInfo, 60000);
    
    const transactionsList = $('#transactionsList');
    let allTransactions = TransactionService.getAllFromUser(currentUser);
    let currentFilter = 'all';
    
    /**
     * Renderizar transacciones
     */
    function renderTransactions(filter = 'all') {
        let filteredTransactions = allTransactions;
        
        if (filter === 'received') {
            filteredTransactions = TransactionService.filterByType(allTransactions, TRANSACTION_TYPES.RECEIVE);
        } else if (filter === 'sent') {
            filteredTransactions = TransactionService.filterByType(allTransactions, TRANSACTION_TYPES.SEND);
        }
        
        // Ordenar por fecha (más reciente primero)
        filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Actualizar resumen
        const totals = TransactionService.calculateTotals(allTransactions);
        $('#totalTransactions').text(allTransactions.length);
        $('#totalReceived').text(Helpers.formatCurrency(totals.received, currentUser.currency));
        $('#totalSent').text(Helpers.formatCurrency(totals.sent, currentUser.currency));
        
        // Limpiar y renderizar lista
        transactionsList.empty();
        
        if (filteredTransactions.length === 0) {
            transactionsList.html('<div class="text-center p-5 text-muted"><i class="fas fa-inbox fa-3x mb-3 d-block"></i>No hay transacciones para mostrar</div>');
            return;
        }
        
        // Agrupar por fecha
        let currentDate = null;
        filteredTransactions.forEach(tx => {
            const txDate = new Date(tx.date);
            const dateStr = Helpers.formatDate(tx.date);
            
            // Agregar divisor de fecha si es diferente
            if (dateStr !== currentDate) {
                currentDate = dateStr;
                transactionsList.append(`
                    <div class="date-divider my-3">
                        <h6 class="text-muted fw-bold">${dateStr}</h6>
                    </div>
                `);
            }
            
            // Crear elemento de transacción
            const isReceive = tx.type === TRANSACTION_TYPES.RECEIVE;
            const icon = isReceive ? 'fa-arrow-down' : 'fa-arrow-up';
            const iconClass = isReceive ? 'transaction-icon-receive' : 'transaction-icon-send';
            const contact = isReceive ? tx.from : tx.to;
            const sign = isReceive ? '+' : '-';
            const amountClass = isReceive ? 'amount-positive' : 'amount-negative';
            const timeStr = Helpers.formatTime(tx.date);
            
            transactionsList.append(`
                <div class="card transaction-card mb-3 border-0 shadow-sm">
                    <div class="card-body p-3">
                        <div class="d-flex align-items-center">
                            <div class="me-3">
                                <div class="${iconClass} rounded-circle d-flex align-items-center justify-content-center" 
                                     style="width: 50px; height: 50px;">
                                    <i class="fas ${icon} fa-lg"></i>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="mb-1 fw-bold">${contact}</h6>
                                <small class="text-muted">${timeStr} • ${tx.description || 'Sin descripción'}</small>
                                ${tx.accountName ? `<br><small class="text-muted"><i class="fas fa-wallet"></i> ${tx.accountName}</small>` : ''}
                            </div>
                            <div class="text-end">
                                <h5 class="mb-0 ${amountClass} fw-bold">
                                    ${sign}${Helpers.formatCurrency(tx.amount, currentUser.currency)}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });
    }
    
    // Renderizar inicialmente
    renderTransactions();
    
    // Filtros
    $('#filterAll').click(function() {
        $('.btn-group .btn').removeClass('active');
        $(this).addClass('active');
        currentFilter = 'all';
        renderTransactions('all');
    });
    
    $('#filterReceived').click(function() {
        $('.btn-group .btn').removeClass('active');
        $(this).addClass('active');
        currentFilter = 'received';
        renderTransactions('received');
    });
    
    $('#filterSent').click(function() {
        $('.btn-group .btn').removeClass('active');
        $(this).addClass('active');
        currentFilter = 'sent';
        renderTransactions('sent');
    });
    
    // Logout
    $('#logoutBtn, #logoutButton').click(function(e) {
        e.preventDefault();
        AuthService.logout();
    });
});
