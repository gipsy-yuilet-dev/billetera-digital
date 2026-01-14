/**
 * accounts.js
 * Lógica específica de la página de gestión de cuentas
 */

$(document).ready(function() {
    const currentUser = Helpers.requireAuth();
    if (!currentUser) return;
    
    // Mostrar nombre de usuario
    $('.userName').text(currentUser.name);
    
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
    
    const accountsList = $('#accountsList');
    
    /**
     * Renderizar cuentas
     */
    function renderAccounts() {
        accountsList.empty();
        
        if (!currentUser.accounts || currentUser.accounts.length === 0) {
            accountsList.html('<div class="col-12 p-4 text-center text-muted">No tienes cuentas</div>');
            return;
        }
        
        currentUser.accounts.forEach(account => {
            const isActive = account.id === currentUser.activeAccountId;
            const activeBadge = isActive ? '<span class="badge bg-success ms-2">Activa</span>' : '';
            const setActiveBtn = !isActive ? 
                `<button class="btn btn-sm btn-outline-primary set-active-btn" data-account-id="${account.id}">
                    <i class="fas fa-check-circle"></i> Establecer como activa
                </button>` : '';
            
            accountsList.append(`
                <div class="col-md-6 mb-4">
                    <div class="card h-100 shadow-sm ${isActive ? 'border-success' : ''}">
                        <div class="card-body">
                            <h5 class="card-title">
                                <i class="fas fa-wallet text-primary"></i> ${account.name}
                                ${activeBadge}
                            </h5>
                            <p class="text-muted mb-2">
                                <small><i class="fas fa-tag"></i> ${account.type.charAt(0).toUpperCase() + account.type.slice(1)}</small>
                            </p>
                            <h3 class="text-success mb-3">
                                ${Helpers.formatCurrency(account.balance, currentUser.currency)}
                            </h3>
                            <div class="mb-3">
                                <small class="text-muted">
                                    <i class="fas fa-list"></i> ${account.transactions?.length || 0} transacciones
                                </small>
                            </div>
                            ${setActiveBtn}
                        </div>
                    </div>
                </div>
            `);
        });
        
        // Event handler para establecer cuenta activa
        $('.set-active-btn').click(function(e) {
            e.preventDefault();
            const accountId = $(this).data('account-id');
            currentUser.activeAccountId = accountId;
            StorageService.updateCurrentUser(currentUser);
            renderAccounts();
        });
    }
    
    renderAccounts();
    
    // Crear nueva cuenta
    $('#newAccountForm').submit(function(e) {
        e.preventDefault();
        
        $('#create-error').addClass('d-none');
        
        const accountName = $('#accountName').val().trim();
        const accountType = $('#accountType').val();
        const initialBalance = parseFloat($('#initialBalance').val()) || 0;
        
        if (!accountName || !accountType) {
            $('#create-error').removeClass('d-none').text('Completa todos los campos obligatorios');
            return;
        }
        
        // Crear nueva cuenta
        const newAccountId = Math.max(...currentUser.accounts.map(a => a.id), 0) + 1;
        const newAccount = {
            id: newAccountId,
            name: accountName,
            type: accountType,
            balance: initialBalance,
            transactions: []
        };
        
        // Si hay saldo inicial, crear transacción
        if (initialBalance > 0) {
            newAccount.transactions.push({
                id: 1,
                type: TRANSACTION_TYPES.RECEIVE,
                amount: initialBalance,
                from: 'Saldo Inicial',
                date: new Date().toISOString(),
                description: 'Depósito inicial de cuenta',
                accountId: newAccountId
            });
        }
        
        currentUser.accounts.push(newAccount);
        StorageService.updateCurrentUser(currentUser);
        
        // Cerrar modal y resetear formulario
        const modal = bootstrap.Modal.getInstance(document.getElementById('newAccountModal'));
        modal.hide();
        $('#newAccountForm')[0].reset();
        
        // Re-renderizar
        renderAccounts();
    });
    
    // Logout
    $('#logoutBtn, #logoutButton').click(function(e) {
        e.preventDefault();
        AuthService.logout();
    });
});
