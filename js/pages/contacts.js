/**
 * contacts.js
 * Lógica específica de la página de contactos
 */

$(document).ready(function() {
    const currentUser = Helpers.requireAuth();
    if (!currentUser) return;
    
    let currentFilter = 'all';
    
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
    
    /**
     * Renderizar contactos
     */
    function renderContacts(filter = 'all') {
        const contactsList = $('#contacts-list');
        contactsList.empty();
        
        let contacts = currentUser.contacts || [];
        
        // Filtrar según tipo
        if (filter === 'debtors') {
            contacts = contacts.filter(c => c.type === CONTACT_TYPES.DEBTOR);
        } else if (filter === 'creditors') {
            contacts = contacts.filter(c => c.type === CONTACT_TYPES.CREDITOR);
        }
        
        if (contacts.length > 0) {
            contacts.forEach((contact, index) => {
                const actualIndex = currentUser.contacts.indexOf(contact);
                const typeIcon = contact.type === CONTACT_TYPES.DEBTOR ? 'fa-hand-holding-usd text-success' : 
                               contact.type === CONTACT_TYPES.CREDITOR ? 'fa-file-invoice-dollar text-danger' : 
                               'fa-user text-primary';
                const typeBadge = contact.type === CONTACT_TYPES.DEBTOR ? '<span class="badge bg-success">Te debe</span>' : 
                                contact.type === CONTACT_TYPES.CREDITOR ? '<span class="badge bg-danger">Le debes</span>' : 
                                '<span class="badge bg-primary">Normal</span>';
                
                const amountDisplay = (contact.type === CONTACT_TYPES.DEBTOR || contact.type === CONTACT_TYPES.CREDITOR) && contact.amount > 0 
                    ? `<p class="mb-1"><strong>Monto:</strong> ${Helpers.formatCurrency(contact.amount, currentUser.currency)}</p>` 
                    : '';
                
                const phoneDisplay = contact.phone ? `<p class="mb-1"><i class="fas fa-phone"></i> ${contact.phone}</p>` : '';
                const notesDisplay = contact.notes ? `<p class="mb-1 text-muted"><small>${contact.notes}</small></p>` : '';
                
                contactsList.append(`
                    <div class="col-md-6 col-lg-4 mb-3">
                        <div class="card h-100 shadow-sm contact-card">
                            <div class="card-body">
                                <div class="d-flex align-items-center mb-3">
                                    <img src="${contact.avatar}" alt="${contact.name}" 
                                         class="rounded-circle me-3" style="width: 60px; height: 60px;">
                                    <div class="flex-grow-1">
                                        <h5 class="mb-1">${contact.name}</h5>
                                        ${typeBadge}
                                    </div>
                                </div>
                                <div class="mb-2">
                                    <p class="mb-1"><i class="fas ${typeIcon}"></i> ${contact.email}</p>
                                    ${phoneDisplay}
                                    ${amountDisplay}
                                    ${notesDisplay}
                                </div>
                                <div class="d-flex gap-2">
                                    <a href="sendmoney.html" class="btn btn-sm btn-primary flex-grow-1">
                                        <i class="fas fa-paper-plane"></i> Enviar
                                    </a>
                                    <button class="btn btn-sm btn-danger delete-contact-btn" data-index="${actualIndex}">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            });
        } else {
            const message = filter === 'debtors' ? 'No hay contactos que te deban' : 
                           filter === 'creditors' ? 'No hay contactos a los que les debas' : 
                           'No tienes contactos guardados';
            contactsList.html(`<div class="col-12 p-4 text-center text-muted">${message}</div>`);
        }
    }
    
    // Render inicial
    renderContacts();
    
    // Filtros
    $('#filterAll').click(function() {
        $('.btn-group .btn').removeClass('active');
        $(this).addClass('active');
        currentFilter = 'all';
        renderContacts('all');
    });
    
    $('#filterDebtors').click(function() {
        $('.btn-group .btn').removeClass('active');
        $(this).addClass('active');
        currentFilter = 'debtors';
        renderContacts('debtors');
    });
    
    $('#filterCreditors').click(function() {
        $('.btn-group .btn').removeClass('active');
        $(this).addClass('active');
        currentFilter = 'creditors';
        renderContacts('creditors');
    });
    
    // Validación: no permitir números en nombres de contactos
    $('#contactName').on('keypress', function(e) {
        const charCode = e.which || e.keyCode;
        // Permitir solo letras, espacios, acentos y caracteres especiales (no números)
        if (charCode >= 48 && charCode <= 57) {
            e.preventDefault();
            return false;
        }
    });
    
    $('#contactName').on('input', function() {
        const value = $(this).val();
        const hasNumbers = /\d/.test(value);
        if (hasNumbers) {
            $(this).addClass('is-invalid');
            if (!$('#nameValidationError').length) {
                $(this).after('<div id="nameValidationError" class="invalid-feedback">El nombre no puede contener números</div>');
            }
        } else {
            $(this).removeClass('is-invalid');
            $('#nameValidationError').remove();
        }
    });
    
    // Mostrar/ocultar campo de monto según tipo
    $('#contactType').change(function() {
        const type = $(this).val();
        if (type === CONTACT_TYPES.DEBTOR || type === CONTACT_TYPES.CREDITOR) {
            $('#amountContainer').show();
        } else {
            $('#amountContainer').hide();
            $('#contactAmount').val(0);
        }
    });
    
    // Guardar nuevo contacto
    $('#saveContactBtn').click(function() {
        const name = $('#contactName').val().trim();
        const email = $('#contactEmail').val().trim().toLowerCase();
        const type = $('#contactType').val();
        const amount = parseFloat($('#contactAmount').val()) || 0;
        const phone = $('#contactPhone').val().trim();
        const notes = $('#contactNotes').val().trim();
        
        if (!name || !email) {
            alert('Por favor completa nombre y email');
            return;
        }
        
        if (!Helpers.isValidEmail(email)) {
            alert('Email inválido');
            return;
        }
        
        // Verificar si el contacto ya existe
        const exists = currentUser.contacts.some(c => c.email === email);
        if (exists) {
            alert('Este email ya está en tus contactos');
            return;
        }
        
        // Crear nuevo contacto
        const newContact = {
            name: name,
            email: email,
            type: type,
            amount: amount,
            phone: phone,
            notes: notes,
            avatar: Helpers.generateAvatar(name)
        };
        
        currentUser.contacts.push(newContact);
        StorageService.updateCurrentUser(currentUser);
        
        // Cerrar modal y limpiar form
        const modal = bootstrap.Modal.getInstance(document.getElementById('addContactModal'));
        modal.hide();
        $('#addContactForm')[0].reset();
        $('#amountContainer').hide();
        
        // Re-renderizar
        renderContacts(currentFilter);
    });
    
    // Eliminar contacto
    $(document).on('click', '.delete-contact-btn', function() {
        const index = $(this).data('index');
        if (confirm('¿Eliminar este contacto?')) {
            currentUser.contacts.splice(index, 1);
            StorageService.updateCurrentUser(currentUser);
            renderContacts(currentFilter);
        }
    });
    
    // Logout
    $('#logoutBtn, #logoutButton').click(function(e) {
        e.preventDefault();
        AuthService.logout();
    });
});
