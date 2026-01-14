/**
 * deposit.js
 * Lógica específica de la página de depósitos
 */

$(document).ready(function() {
    // Verificar autenticación
    const currentUser = Helpers.requireAuth();
    if (!currentUser) return;
    
    const activeAccount = Helpers.getActiveAccount(currentUser);
    
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
    
    // Botones de monto rápido
    $('.amount-btn').click(function() {
        const amount = $(this).data('amount');
        $('#depositAmount').val(amount);
    });

    // Formulario de depósito
    $('#depositForm').submit(function(e) {
        e.preventDefault();
        
        Helpers.hideMessages();
        
        const amount = parseFloat($('#depositAmount').val());
        const description = $('#depositDescription').val() || 'Depósito';
        const method = $('#depositMethod').val();
        
        // Realizar depósito usando el servicio
        const result = TransactionService.deposit(
            currentUser, 
            activeAccount.id, 
            amount, 
            method, 
            description
        );
        
        if (result.success) {
            Helpers.showSuccess(SUCCESS_MESSAGES.DEPOSIT_SUCCESS);
            $('#depositForm')[0].reset();
            setTimeout(() => Helpers.redirect(ROUTES.DASHBOARD), 2000);
        } else {
            Helpers.showError(result.error);
        }
    });
});
