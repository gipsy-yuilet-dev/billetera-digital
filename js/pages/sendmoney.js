/**
 * sendmoney.js
 * Lógica específica de la página de envío de dinero
 */

$(document).ready(function() {
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
    
    // Mostrar saldo disponible
    if ($('#availableBalance').length) {
        $('#availableBalance').text(Helpers.formatCurrency(activeAccount.balance, currentUser.currency));
    }
    
    // Mostrar información de cuenta activa si hay múltiples cuentas
    if (currentUser.accounts && currentUser.accounts.length > 1) {
        const accountInfo = `
            <div class="alert alert-info mb-3">
                <i class="fas fa-info-circle"></i> Cuenta activa: <strong>${activeAccount.name}</strong>
            </div>
            <div class="mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="ownAccountTransfer">
                    <label class="form-check-label fw-bold" for="ownAccountTransfer">
                        <i class="fas fa-exchange-alt"></i> Transferir entre mis cuentas
                    </label>
                </div>
            </div>
            <div id="ownAccountsSection" class="d-none mb-3">
                <label class="form-label fw-bold">Cuenta Destino</label>
                <select class="form-select" id="destinationAccount">
                    <option value="">Selecciona cuenta destino</option>
                    ${currentUser.accounts.filter(acc => acc.id !== activeAccount.id).map(acc => `
                        <option value="${acc.id}">${acc.name} - ${Helpers.formatCurrency(acc.balance, currentUser.currency)}</option>
                    `).join('')}
                </select>
            </div>
        `;
        $('#sendMoneyForm').prepend(accountInfo);
        
        // Toggle entre transferencia propia y externa
        $('#ownAccountTransfer').change(function() {
            const isOwnAccount = $(this).is(':checked');
            $('#ownAccountsSection').toggleClass('d-none', !isOwnAccount);
            $('#externalTransferSection').toggleClass('d-none', isOwnAccount);
            
            if (isOwnAccount) {
                $('#recipientEmail').removeAttr('required');
                $('#destinationAccount').attr('required', 'required');
            } else {
                $('#recipientEmail').attr('required', 'required');
                $('#destinationAccount').removeAttr('required');
            }
        });
    }
    
    // Cargar contactos rápidos
    if ($('#quickContacts').length && currentUser.contacts && currentUser.contacts.length > 0) {
        const quickContacts = $('#quickContacts');
        currentUser.contacts.slice(0, VALIDATION.MAX_QUICK_CONTACTS).forEach(contact => {
            quickContacts.append(`
                <div class="col-3 text-center">
                    <img src="${contact.avatar}" alt="${contact.name}" 
                         class="rounded-circle mb-2 contact-avatar" 
                         data-email="${contact.email}" 
                         style="width: 50px; height: 50px; cursor: pointer;">
                    <div><small>${Helpers.truncate(contact.name, 12)}</small></div>
                </div>
            `);
        });
        
        // Click en contacto rápido
        $('.contact-avatar').click(function() {
            $('#recipientEmail').val($(this).data('email'));
        });
    } else if ($('#quickContacts').length) {
        $('#quickContacts').html('<small class="text-muted">No hay contactos guardados</small>');
    }
    
    // Botones de monto rápido
    $('.quick-amount').click(function() {
        $('#sendAmount').val($(this).data('amount'));
    });

    // Validación en tiempo real del monto (solo números)
    $('#sendAmount').on('keypress', function(e) {
        // Permitir solo números y punto decimal
        const charCode = e.which || e.keyCode;
        if ((charCode < 48 || charCode > 57) && charCode !== 46) {
            e.preventDefault();
            return false;
        }
    });
    
    // Verificar saldo en tiempo real
    $('#sendAmount').on('input', function() {
        const amount = parseFloat($(this).val()) || 0;
        if (amount > activeAccount.balance) {
            $(this).addClass('is-invalid');
            if (!$('#insufficientBalanceWarning').length) {
                $(this).after('<div id="insufficientBalanceWarning" class="invalid-feedback"><i class="fas fa-exclamation-triangle"></i> Saldo insuficiente. Tu saldo actual es ' + Helpers.formatCurrency(activeAccount.balance, currentUser.currency) + '</div>');
            }
        } else {
            $(this).removeClass('is-invalid');
            $('#insufficientBalanceWarning').remove();
        }
    });

    // Formulario de envío
    $('#sendMoneyForm').submit(function(e) {
        e.preventDefault();
        
        Helpers.hideMessages();
        
        const isOwnAccount = $('#ownAccountTransfer').is(':checked');
        const amount = parseFloat($('#sendAmount').val());
        const description = $('#sendDescription').val().trim();
        
        // Verificar saldo insuficiente antes de enviar
        if (amount > activeAccount.balance) {
            Helpers.showError('Saldo insuficiente. Tu saldo actual es ' + Helpers.formatCurrency(activeAccount.balance, currentUser.currency));
            return;
        }
        
        let result;
        
        if (isOwnAccount) {
            // Transferencia entre cuentas propias
            const toAccountId = parseInt($('#destinationAccount').val());
            
            if (!toAccountId) {
                Helpers.showError(ERROR_MESSAGES.SELECT_DESTINATION);
                return;
            }
            
            result = TransactionService.transferBetweenOwnAccounts(
                currentUser, 
                activeAccount.id, 
                toAccountId, 
                amount, 
                description
            );
        } else {
            // Transferencia a otro usuario
            const recipientEmail = $('#recipientEmail').val().trim();
            result = TransactionService.sendToUser(
                currentUser, 
                recipientEmail, 
                amount, 
                description
            );
        }
        
        if (result.success) {
            Helpers.showSuccess(SUCCESS_MESSAGES.TRANSFER_SUCCESS);
            $('#sendMoneyForm')[0].reset();
            setTimeout(() => Helpers.redirect(ROUTES.DASHBOARD), 2000);
        } else {
            Helpers.showError(result.error);
        }
    });
});
