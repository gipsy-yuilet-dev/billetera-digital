// js/script.js
// Author : Julieta Eyzaguirre -Yuli Melek dev 
// --- 1. Simulación de "Base de Datos" de Usuarios ---
// Usuarios iniciales (solo para demo) - ACTUALIZADO CON MÚLTIPLES CUENTAS
//Creamos una constante para inicializar Usuarios en DB 
const initialUsersDB = [
    {
        email: 'usuario@alke.com',
        password: '123456',
        name: 'Ihor',
        activeAccountId: 1, // ID de cuenta activa
        accounts: [
            {
                id: 1,
                name: 'Cuenta Corriente',
                type: 'corriente',
                balance: 11547.54,
                transactions: [
                    { id: 1, type: 'receive', amount: 1500.00, from: 'Ana P.', date: new Date('2026-01-10T14:30:00').toISOString(), description: 'Pago de servicio', accountId: 1 },
                    { id: 2, type: 'send', amount: 350.00, to: 'Carlos D.', date: new Date('2026-01-09T10:15:00').toISOString(), description: 'Cena compartida', accountId: 1 },
                    { id: 3, type: 'receive', amount: 2000.00, from: 'Beatriz L.', date: new Date('2026-01-08T16:45:00').toISOString(), description: 'Transferencia', accountId: 1 }
                ]
            },
            {
                id: 2,
                name: 'Cuenta de Ahorro',
                type: 'ahorro',
                balance: 5000.00,
                transactions: [
                    { id: 1, type: 'receive', amount: 5000.00, from: 'Depósito inicial', date: new Date('2026-01-01T10:00:00').toISOString(), description: 'Ahorro inicial', accountId: 2 }
                ]
            }
        ],
        contacts: [
            { name: 'Ana P.', email: 'ana@example.com', avatar: 'https://ui-avatars.com/api/?name=Ana+P&background=random' },
            { name: 'Carlos D.', email: 'carlos@example.com', avatar: 'https://ui-avatars.com/api/?name=Carlos+D&background=random' },
            { name: 'Beatriz L.', email: 'bea@example.com', avatar: 'https://ui-avatars.com/api/?name=Beatriz+L&background=random' }
        ]
    },
    {
        email: 'maria@alke.com',
        password: 'password',
        name: 'María',
        activeAccountId: 1,
        accounts: [
            {
                id: 1,
                name: 'Cuenta Corriente',
                type: 'corriente',
                balance: 500.00,
                transactions: []
            }
        ],
        contacts: []
    }
];

// Función para cargar usuarios desde localStorage o usar iniciales
function loadUsers() {
    const storedUsers = localStorage.getItem('usersDB');
    if (storedUsers) {
        return JSON.parse(storedUsers);
    } else {
        // Primera vez, guardar usuarios iniciales
        localStorage.setItem('usersDB', JSON.stringify(initialUsersDB));
        return initialUsersDB;
    }
}

// Función para guardar usuarios en localStorage
function saveUsers(users) {
    localStorage.setItem('usersDB', JSON.stringify(users));
}

// Cargar usuarios
let usersDB = loadUsers();

// Función para obtener cuenta activa del usuario
function getActiveAccount(user) {
    if (user.accounts && user.accounts.length > 0) {
        return user.accounts.find(acc => acc.id === user.activeAccountId) || user.accounts[0];
    }
    // Migrar usuario antiguo sin cuentas
    if (user.balance !== undefined && !user.accounts) {
        user.accounts = [{
            id: 1,
            name: 'Cuenta Corriente',
            type: 'corriente',
            balance: user.balance || 0,
            transactions: user.transactions || []
        }];
        user.activeAccountId = 1;
        return user.accounts[0];
    }
    return null;
}

// Función para obtener todas las transacciones del usuario
function getAllUserTransactions(user) {
    if (!user.accounts) return [];
    let allTransactions = [];
    user.accounts.forEach(account => {
        if (account.transactions) {
            account.transactions.forEach(tx => {
                allTransactions.push({...tx, accountId: account.id, accountName: account.name});
            });
        }
    });
    return allTransactions;
}

$(document).ready(function() {
    
    // --- 2. Lógica de Registro de Nuevos Usuarios ---
    $('#registerForm').submit(function(e) {
        e.preventDefault();
        
        // Limpiar mensajes previos
        $('#error-msg').addClass('d-none');
        $('#success-msg').addClass('d-none');
        $('#regEmail').removeClass('is-invalid');
        $('#regPasswordConfirm').removeClass('is-invalid');
        
        const name = $('#regName').val().trim();
        const email = $('#regEmail').val().trim().toLowerCase();
        const password = $('#regPassword').val();
        const confirmPassword = $('#regPasswordConfirm').val();
        const initialBudget = parseFloat($('#initialBudget').val()) || 10000;
        
        // Validación de campos vacíos
        if (!name || !email || !password || !confirmPassword) {
            $('#error-text').text('Por favor complete todos los campos.');
            $('#error-msg').removeClass('d-none');
            return;
        }
        
        // Validación de contraseña mínima
        if (password.length < 6) {
            $('#error-text').text('La contraseña debe tener al menos 6 caracteres.');
            $('#error-msg').removeClass('d-none');
            return;
        }
        
        // Validación de presupuesto mínimo
        if (initialBudget < 10000) {
            $('#error-text').text('El presupuesto inicial debe ser mínimo $10,000.');
            $('#error-msg').removeClass('d-none');
            return;
        }
        
        // Validación: Verificar que las contraseñas coincidan
        if (password !== confirmPassword) {
            $('#regPasswordConfirm').addClass('is-invalid');
            $('#error-text').text('Las contraseñas no coinciden.');
            $('#error-msg').removeClass('d-none');
            return;
        }
        
        // Validación: Verificar que el email no esté registrado
        const existingUser = usersDB.find(u => u.email === email);
        if (existingUser) {
            $('#regEmail').addClass('is-invalid');
            $('#error-text').text('Este correo ya está registrado. Intenta con otro.');
            $('#error-msg').removeClass('d-none');
            return;
        }
        
        // Crear nuevo usuario
        const newUser = {
            email: email,
            password: password,
            name: name,
            activeAccountId: 1,
            accounts: [
                {
                    id: 1,
                    name: 'Cuenta Corriente',
                    type: 'corriente',
                    balance: initialBudget,
                    transactions: [
                        {
                            id: 1,
                            type: 'receive',
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
            budget: {
                // Categorías de INGRESOS
                trabajo: { name: 'Trabajo/Sueldo', type: 'income', assigned: 0, received: 0 },
                presupuesto: { name: 'Saldo/Presupuesto', type: 'income', assigned: 0, received: 0 },
                // Categorías de GASTOS
                agua: { name: 'Agua', type: 'expense', assigned: 0, spent: 0 },
                telecomunicaciones: { name: 'Telecomunicaciones', type: 'expense', assigned: 0, spent: 0 },
                educacion: { name: 'Educación', type: 'expense', assigned: 0, spent: 0 },
                vivienda: { name: 'Vivienda', type: 'expense', assigned: 0, spent: 0 },
                transporte: { name: 'Transporte', type: 'expense', assigned: 0, spent: 0 },
                alimentacion: { name: 'Alimentación', type: 'expense', assigned: 0, spent: 0 },
                varios: { name: 'Gastos Varios', type: 'expense', assigned: 0, spent: 0 }
            }
        };
        
        // Agregar a la base de datos y guardar
        usersDB.push(newUser);
        saveUsers(usersDB);
        
        // Mostrar mensaje de éxito
        $('#success-msg').removeClass('d-none');
        
        // Redirigir al login después de 2 segundos
        setTimeout(function() {
            window.location.href = 'login.html';
        }, 2000);
    });
    
    // --- 3. Lógica de Login y Validación ---
    $('#loginForm').submit(function(e) {
        e.preventDefault(); // Evita que la página se recargue

        const email = $('#email').val();
        const password = $('#password').val();
        
        // Recargar usuarios desde localStorage (por si hubo cambios)
        usersDB = loadUsers();
        
        // Buscamos si existe un usuario con ese email y contraseña
        const user = usersDB.find(u => u.email === email && u.password === password);

        if(user) {
            // Si el usuario existe, guardamos sus datos en la sesión del navegador
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            
            // Redirigimos al dashboard
            window.location.href = 'menu.html';
        } else {
            // Si no existe, mostramos el mensaje de error con una animación
            $('#error-msg').removeClass('d-none').hide().fadeIn();
        }
    });

    // --- 3. Gestión de Sesión en Páginas Internas ---
    // Intentamos obtener el usuario guardado en la sesión
    const currentUserData = sessionStorage.getItem('currentUser');
    let currentUser = null;

    if (currentUserData) {
        currentUser = JSON.parse(currentUserData);
    } else {
        // Si no hay usuario logueado y NO estamos en login o index, redirigimos al login
        const currentPage = window.location.pathname.split("/").pop();
        if (currentPage !== 'login.html' && currentPage !== 'index.html' && currentPage !== '' && currentPage !=='register.html') {
            // Comentado para facilitar pruebas locales, descomentar en producción
            // window.location.href = 'login.html'; 
        }
    }
    
    // --- 4. Lógica del Dashboard (menu.html) ---
    if ($('#userBalance').length && currentUser) {
        // Obtener cuenta activa
        const activeAccount = getActiveAccount(currentUser);
        
        // Personalizamos el saludo y el saldo
        $('.userName').text(currentUser.name);
        $('#userBalance').text('$' + activeAccount.balance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}));
        
        // Mostrar selector de cuentas si hay más de una
        if (currentUser.accounts && currentUser.accounts.length > 1) {
            const accountSelector = `
                <div class="mt-3">
                    <select class="form-select form-select-sm" id="accountSelector" style="max-width: 250px; margin: 0 auto;">
                        ${currentUser.accounts.map(acc => `
                            <option value="${acc.id}" ${acc.id === currentUser.activeAccountId ? 'selected' : ''}>
                                ${acc.name} - $${acc.balance.toFixed(2)}
                            </option>
                        `).join('')}
                    </select>
                </div>
            `;
            $('.welcome-card .card-body').append(accountSelector);
            
            // Cambiar cuenta activa
            $('#accountSelector').change(function() {
                const newAccountId = parseInt($(this).val());
                currentUser.activeAccountId = newAccountId;
                sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                // Actualizar en localStorage
                usersDB = loadUsers();
                const userIndex = usersDB.findIndex(u => u.email === currentUser.email);
                if (userIndex !== -1) {
                    usersDB[userIndex].activeAccountId = newAccountId;
                    saveUsers(usersDB);
                }
                
                // Recargar página
                location.reload();
            });
        }
        
        // --- NUEVO: Cargar Tabla DEBE y HABER ---
        if ($('#debitList').length && $('#creditList').length) {
            const debitList = $('#debitList');
            const creditList = $('#creditList');
            
            // Obtener todas las transacciones del usuario
            const allTransactions = getAllUserTransactions(currentUser);
            
            // Separar transacciones
            const debits = allTransactions.filter(tx => tx.type === 'send');
            const credits = allTransactions.filter(tx => tx.type === 'receive');
            
            // Calcular totales
            const totalDebit = debits.reduce((sum, tx) => sum + tx.amount, 0);
            const totalCredit = credits.reduce((sum, tx) => sum + tx.amount, 0);
            const finalBalance = totalCredit - totalDebit;
            
            // Actualizar resumen
            $('#totalDebit').text('$' + totalDebit.toFixed(2));
            $('#totalCredit').text('$' + totalCredit.toFixed(2));
            $('#finalBalance').text('$' + finalBalance.toFixed(2));
            
            // Llenar lista DEBE (últimas 5)
            if (debits.length > 0) {
                debits.slice(-5).reverse().forEach(tx => {
                    const date = new Date(tx.date);
                    const debitHtml = `
                        <div class="list-group-item border-0 py-2">
                            <div class="d-flex justify-content-between">
                                <small>${tx.to} <span class="badge bg-secondary">${tx.accountName}</span></small>
                                <small class="text-danger fw-bold">-$${tx.amount.toFixed(2)}</small>
                            </div>
                            <small class="text-muted">${date.toLocaleDateString('es-ES')}</small>
                        </div>
                    `;
                    debitList.append(debitHtml);
                });
            } else {
                debitList.html('<small class="text-muted p-2">Sin gastos registrados</small>');
            }
            
            // Llenar lista HABER (últimas 5)
            if (credits.length > 0) {
                credits.slice(-5).reverse().forEach(tx => {
                    const date = new Date(tx.date);
                    const creditHtml = `
                        <div class="list-group-item border-0 py-2">
                            <div class="d-flex justify-content-between">
                                <small>${tx.from} <span class="badge bg-secondary">${tx.accountName}</span></small>
                                <small class="text-success fw-bold">+$${tx.amount.toFixed(2)}</small>
                            </div>
                            <small class="text-muted">${date.toLocaleDateString('es-ES')}</small>
                        </div>
                    `;
                    creditList.append(creditHtml);
                });
            } else {
                creditList.html('<small class="text-muted p-2">Sin ingresos registrados</small>');
            }
        }
        
        // Cargar últimas transacciones
        if ($('#recentTransactions').length) {
            const recentList = $('#recentTransactions');
            const allTransactions = getAllUserTransactions(currentUser);
            const recentTransactions = allTransactions.slice(-3).reverse(); // Últimas 3
            
            if (recentTransactions.length > 0) {
                recentTransactions.forEach(tx => {
                    const date = new Date(tx.date);
                    const icon = tx.type === 'receive' ? 'fa-arrow-down text-success' : 'fa-arrow-up text-danger';
                    const contact = tx.type === 'receive' ? tx.from : tx.to;
                    const sign = tx.type === 'receive' ? '+' : '-';
                    const colorClass = tx.type === 'receive' ? 'text-success' : 'text-danger';
                    
                    const txHtml = `
                        <div class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <i class="fas ${icon} me-2"></i>
                                <strong>${contact}</strong><br>
                                <small class="text-muted">${date.toLocaleDateString('es-ES')} - ${date.toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'})}</small>
                            </div>
                            <span class="${colorClass} fw-bold">${sign}$${tx.amount.toFixed(2)}</span>
                        </div>
                    `;
                    recentList.append(txHtml);
                });
            } else {
                recentList.html('<div class="text-center text-muted p-3">No hay transacciones recientes</div>');
            }
        }
        
        // Cargar contactos frecuentes
        if ($('#frequentContacts').length && currentUser.contacts) {
            const contactsList = $('#frequentContacts');
            const topContacts = currentUser.contacts.slice(0, 3);
            
            if (topContacts.length > 0) {
                topContacts.forEach(contact => {
                    const contactHtml = `
                        <div class="col-4 text-center">
                            <img src="${contact.avatar}" class="rounded-circle mb-2" width="50" alt="${contact.name}">
                            <div class="small fw-bold">${contact.name.split(' ')[0]}</div>
                        </div>
                    `;
                    contactsList.append(contactHtml);
                });
            } else {
                contactsList.html('<div class="col-12 text-center text-muted">No hay contactos</div>');
            }
        }
        
        // Cargar cuentas por pagar (transacciones enviadas)
        if ($('#pendingPayments').length && currentUser.transactions) {
            const paymentsList = $('#pendingPayments');
            const sentTransactions = currentUser.transactions.filter(tx => tx.type === 'send').slice(-3).reverse();
            
            if (sentTransactions.length > 0) {
                sentTransactions.forEach(tx => {
                    const date = new Date(tx.date);
                    const paymentHtml = `
                        <div class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>${tx.to}</strong><br>
                                <small class="text-muted">${date.toLocaleDateString('es-ES')}</small>
                            </div>
                            <span class="text-danger fw-bold">-$${tx.amount.toFixed(2)}</span>
                        </div>
                    `;
                    paymentsList.append(paymentHtml);
                });
            } else {
                paymentsList.html('<div class="text-center text-muted p-3">No hay pagos realizados</div>');
            }
        }
    }

    // --- 5. Lógica de la Página de Contactos (contacts.html) ---
    if ($('#contacts-list').length && currentUser) {
        let currentFilter = 'all';
        
        function renderContacts(filter = 'all') {
            const contactsList = $('#contacts-list');
            contactsList.empty();
            
            let contacts = currentUser.contacts || [];
            
            // Filtrar según tipo
            if (filter === 'debtors') {
                contacts = contacts.filter(c => c.type === 'debtor');
            } else if (filter === 'creditors') {
                contacts = contacts.filter(c => c.type === 'creditor');
            }
            
            if (contacts.length > 0) {
                contacts.forEach((contact, index) => {
                    const typeIcon = contact.type === 'debtor' ? 'fa-hand-holding-usd text-success' : 
                                     contact.type === 'creditor' ? 'fa-file-invoice-dollar text-danger' : 
                                     'fa-user text-primary';
                    const typeLabel = contact.type === 'debtor' ? 'Te debe' : 
                                      contact.type === 'creditor' ? 'Le debes' : 
                                      'Normal';
                    const amount = contact.amount > 0 ? `$${contact.amount.toFixed(2)}` : '';
                    
                    const contactHtml = `
                        <div class="list-group-item p-3 d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center flex-grow-1">
                                <img src="${contact.avatar}" class="rounded-circle me-3" width="50" alt="${contact.name}">
                                <div>
                                    <h6 class="mb-0">${contact.name}</h6>
                                    <small class="text-muted">${contact.email}</small>
                                    <br>
                                    <span class="badge bg-secondary mt-1">
                                        <i class="fas ${typeIcon} me-1"></i>${typeLabel}
                                        ${amount ? ' • ' + amount : ''}
                                    </span>
                                    ${contact.phone ? `<br><small class="text-muted"><i class="fas fa-phone me-1"></i>${contact.phone}</small>` : ''}
                                    ${contact.notes ? `<br><small class="text-muted fst-italic">${contact.notes}</small>` : ''}
                                </div>
                            </div>
                            <div>
                                <a href="sendmoney.html?to=${contact.email}" class="btn btn-outline-primary btn-sm rounded-pill">
                                    Enviar <i class="fas fa-chevron-right ms-1"></i>
                                </a>
                                <button class="btn btn-outline-danger btn-sm rounded-pill delete-contact-btn" data-index="${index}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `;
                    contactsList.append(contactHtml);
                });
            } else {
                const message = filter === 'debtors' ? 'No hay contactos que te deban' : 
                               filter === 'creditors' ? 'No hay contactos a los que les debas' : 
                               'No tienes contactos guardados';
                contactsList.html(`<div class="p-4 text-center text-muted">${message}</div>`);
            }
        }
        
        // Render inicial
        renderContacts();
        
        // Filtros
        $('#filterAll').click(function() {
            $('.btn-group .btn').removeClass('active');
            $(this).addClass('active');
            renderContacts('all');
        });
        
        $('#filterDebtors').click(function() {
            $('.btn-group .btn').removeClass('active');
            $(this).addClass('active');
            renderContacts('debtors');
        });
        
        $('#filterCreditors').click(function() {
            $('.btn-group .btn').removeClass('active');
            $(this).addClass('active');
            renderContacts('creditors');
        });
        
        // Mostrar/ocultar campo de monto según tipo
        $('#contactType').change(function() {
            const type = $(this).val();
            if (type === 'debtor' || type === 'creditor') {
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
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
            };
            
            currentUser.contacts.push(newContact);
            
            // Guardar
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            let usersDB = loadUsers();
            const userIndex = usersDB.findIndex(u => u.email === currentUser.email);
            if (userIndex !== -1) {
                usersDB[userIndex] = currentUser;
                saveUsers(usersDB);
            }
            
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
                
                // Guardar
                sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                let usersDB = loadUsers();
                const userIndex = usersDB.findIndex(u => u.email === currentUser.email);
                if (userIndex !== -1) {
                    usersDB[userIndex] = currentUser;
                    saveUsers(usersDB);
                }
                
                renderContacts(currentFilter);
            }
        });
    }

    // --- 6. Lógica de la Página de Transacciones (transactions.html) ---
    if ($('#transactionsList').length && currentUser) {
        const transactionsList = $('#transactionsList');
        let allTransactions = getAllUserTransactions(currentUser);
        let currentFilter = 'all';
        
        // Función para renderizar transacciones
        function renderTransactions(filter = 'all') {
            let filteredTransactions = allTransactions;
            
            if (filter === 'received') {
                filteredTransactions = allTransactions.filter(tx => tx.type === 'receive');
            } else if (filter === 'sent') {
                filteredTransactions = allTransactions.filter(tx => tx.type === 'send');
            }
            
            // Ordenar por fecha (más reciente primero)
            filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // Actualizar resumen
            const totalReceived = allTransactions.filter(tx => tx.type === 'receive').reduce((sum, tx) => sum + tx.amount, 0);
            const totalSent = allTransactions.filter(tx => tx.type === 'send').reduce((sum, tx) => sum + tx.amount, 0);
            $('#totalTransactions').text(allTransactions.length);
            $('#totalReceived').text('$' + totalReceived.toFixed(2));
            $('#totalSent').text('$' + totalSent.toFixed(2));
            
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
                const dateStr = txDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
                
                // Agregar divisor de fecha si es diferente
                if (dateStr !== currentDate) {
                    currentDate = dateStr;
                    transactionsList.append(`<div class="date-divider">${dateStr}</div>`);
                }
                
                // Crear elemento de transacción
                const icon = tx.type === 'receive' ? 'fa-arrow-down' : 'fa-arrow-up';
                const iconClass = tx.type === 'receive' ? 'transaction-icon-receive' : 'transaction-icon-send';
                const contact = tx.type === 'receive' ? tx.from : tx.to;
                const sign = tx.type === 'receive' ? '+' : '-';
                const amountClass = tx.type === 'receive' ? 'amount-positive' : 'amount-negative';
                const timeStr = txDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
                
                const txHtml = `
                    <div class="list-group-item p-3 transaction-item border-0">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center flex-grow-1">
                                <div class="rounded-circle ${iconClass} p-2 me-3">
                                    <i class="fas ${icon} fa-lg"></i>
                                </div>
                                <div>
                                    <h6 class="mb-0">${contact}</h6>
                                    <small class="text-muted">
                                        <i class="fas fa-clock me-1"></i>${timeStr}
                                        ${tx.description ? ' • ' + tx.description : ''}
                                    </small>
                                    <br>
                                    <small class="badge bg-secondary">${tx.accountName || 'Cuenta Principal'}</small>
                                </div>
                            </div>
                            <span class="${amountClass} fs-5">${sign}$${tx.amount.toFixed(2)}</span>
                        </div>
                    </div>
                `;
                transactionsList.append(txHtml);
            });
        }
        
        // Renderizar inicialmente
        renderTransactions();
        
        // Filtros
        $('#filterAll').click(function() {
            $('.btn-group .btn').removeClass('active');
            $(this).addClass('active');
            renderTransactions('all');
        });
        
        $('#filterReceived').click(function() {
            $('.btn-group .btn').removeClass('active');
            $(this).addClass('active');
            renderTransactions('received');
        });
        
        $('#filterSent').click(function() {
            $('.btn-group .btn').removeClass('active');
            $(this).addClass('active');
            renderTransactions('sent');
        });
    }

    // --- 7. Lógica de Depósito (deposit.html) ---
    if ($('#depositForm').length && currentUser) {
        const activeAccount = getActiveAccount(currentUser);
        
        // Botones de monto rápido
        $('.amount-btn').click(function() {
            const amount = $(this).data('amount');
            $('#depositAmount').val(amount);
        });

        $('#depositForm').submit(function(e) {
            e.preventDefault();
            
            $('#success-msg').addClass('d-none');
            $('#error-msg').addClass('d-none');
            
            const amount = parseFloat($('#depositAmount').val());
            const description = $('#depositDescription').val() || 'Depósito';
            const method = $('#depositMethod').val();
            
            if (!method) {
                $('#error-text').text('Por favor selecciona un método de depósito.');
                $('#error-msg').removeClass('d-none');
                return;
            }
            
            if (amount <= 0) {
                $('#error-text').text('El monto debe ser mayor a cero.');
                $('#error-msg').removeClass('d-none');
                return;
            }
            
            // Actualizar saldo de la cuenta activa
            activeAccount.balance += amount;
            
            // Crear transacción
            const newTransaction = {
                id: activeAccount.transactions.length + 1,
                type: 'receive',
                amount: amount,
                from: 'Depósito (' + method + ')',
                date: new Date().toISOString(),
                description: description,
                accountId: activeAccount.id
            };
            activeAccount.transactions.push(newTransaction);
            
            // Guardar en sessionStorage y localStorage
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Actualizar en la base de datos
            usersDB = loadUsers();
            const userIndex = usersDB.findIndex(u => u.email === currentUser.email);
            if (userIndex !== -1) {
                usersDB[userIndex] = currentUser;
                saveUsers(usersDB);
            }
            
            // Mostrar éxito
            $('#success-msg').removeClass('d-none');
            
            // Limpiar formulario
            $('#depositForm')[0].reset();
            
            // Redirigir al dashboard después de 2 segundos
            setTimeout(function() {
                window.location.href = 'menu.html';
            }, 2000);
        });
    }

    // --- 8. Lógica de Envío de Dinero (sendmoney.html) ---
    if ($('#sendMoneyForm').length && currentUser) {
        const activeAccount = getActiveAccount(currentUser);
        
        // Mostrar saldo disponible
        $('#availableBalance').text('$' + activeAccount.balance.toFixed(2));
        
        // Mostrar información de cuenta activa
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
                            <option value="${acc.id}">${acc.name} - $${acc.balance.toFixed(2)}</option>
                        `).join('')}
                    </select>
                </div>
            `;
            $('#sendMoneyForm').prepend(accountInfo);
            
            // Toggle entre transferencia propia y externa
            $('#ownAccountTransfer').change(function() {
                if ($(this).is(':checked')) {
                    $('#ownAccountsSection').removeClass('d-none');
                    $('#recipientEmail').closest('.mb-4').addClass('d-none');
                    $('#quickContacts').closest('.mb-4').addClass('d-none');
                    $('#recipientEmail').prop('required', false);
                } else {
                    $('#ownAccountsSection').addClass('d-none');
                    $('#recipientEmail').closest('.mb-4').removeClass('d-none');
                    $('#quickContacts').closest('.mb-4').removeClass('d-none');
                    $('#recipientEmail').prop('required', true);
                }
            });
        }
        
        // Cargar contactos rápidos
        const quickContacts = $('#quickContacts');
        if (currentUser.contacts && currentUser.contacts.length > 0) {
            currentUser.contacts.slice(0, 4).forEach(contact => {
                const contactHtml = `
                    <div class="text-center contact-avatar" data-email="${contact.email}">
                        <img src="${contact.avatar}" class="rounded-circle mb-1" width="50" alt="${contact.name}">
                        <small class="d-block">${contact.name.split(' ')[0]}</small>
                    </div>
                `;
                quickContacts.append(contactHtml);
            });
            
            // Click en contacto rápido
            $('.contact-avatar').click(function() {
                const email = $(this).data('email');
                $('#recipientEmail').val(email);
            });
        } else {
            quickContacts.html('<small class="text-muted">No hay contactos guardados</small>');
        }
        
        // Botones de monto rápido
        $('.quick-amount').click(function() {
            const amount = $(this).data('amount');
            $('#sendAmount').val(amount);
        });

        $('#sendMoneyForm').submit(function(e) {
            e.preventDefault();
            
            $('#success-msg').addClass('d-none');
            $('#error-msg').addClass('d-none');
            
            const isOwnAccount = $('#ownAccountTransfer').is(':checked');
            const amount = parseFloat($('#sendAmount').val());
            const description = $('#sendDescription').val().trim();
            
            // Validación de monto
            if (amount <= 0) {
                $('#error-text').text('El monto debe ser mayor a cero.');
                $('#error-msg').removeClass('d-none');
                return;
            }
            
            if (amount > activeAccount.balance) {
                $('#error-text').text('Saldo insuficiente. Tu saldo disponible es: $' + activeAccount.balance.toFixed(2));
                $('#error-msg').removeClass('d-none');
                return;
            }
            
            // CASO 1: Transferencia entre cuentas propias
            if (isOwnAccount) {
                const destinationAccountId = parseInt($('#destinationAccount').val());
                
                if (!destinationAccountId) {
                    $('#error-text').text('Por favor selecciona una cuenta destino.');
                    $('#error-msg').removeClass('d-none');
                    return;
                }
                
                const destinationAccount = currentUser.accounts.find(acc => acc.id === destinationAccountId);
                
                if (!destinationAccount) {
                    $('#error-text').text('Cuenta destino no encontrada.');
                    $('#error-msg').removeClass('d-none');
                    return;
                }
                
                // Descontar de cuenta origen
                activeAccount.balance -= amount;
                
                // Agregar a cuenta destino
                destinationAccount.balance += amount;
                
                // Crear transacciones en ambas cuentas
                const senderTransaction = {
                    id: activeAccount.transactions.length + 1,
                    type: 'send',
                    amount: amount,
                    to: destinationAccount.name + ' (Propia)',
                    date: new Date().toISOString(),
                    description: description,
                    accountId: activeAccount.id
                };
                activeAccount.transactions.push(senderTransaction);
                
                const receiverTransaction = {
                    id: destinationAccount.transactions.length + 1,
                    type: 'receive',
                    amount: amount,
                    from: activeAccount.name + ' (Propia)',
                    date: new Date().toISOString(),
                    description: description,
                    accountId: destinationAccount.id
                };
                destinationAccount.transactions.push(receiverTransaction);
                
                // Guardar
                sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                usersDB = loadUsers();
                const userIndex = usersDB.findIndex(u => u.email === currentUser.email);
                if (userIndex !== -1) {
                    usersDB[userIndex] = currentUser;
                    saveUsers(usersDB);
                }
                
                $('#success-msg').removeClass('d-none');
                $('#sendMoneyForm')[0].reset();
                
                setTimeout(function() {
                    window.location.href = 'menu.html';
                }, 2000);
                
                return;
            }
            
            // CASO 2: Transferencia a otro usuario
            const recipientEmail = $('#recipientEmail').val().trim().toLowerCase();
            
            // Validaciones
            if (recipientEmail === currentUser.email) {
                $('#error-text').text('No puedes enviarte dinero a ti mismo. Usa "Transferir entre mis cuentas".');
                $('#error-msg').removeClass('d-none');
                return;
            }
            
            // Verificar que el destinatario existe
            usersDB = loadUsers();
            const recipient = usersDB.find(u => u.email === recipientEmail);
            
            if (!recipient) {
                $('#error-text').text('El destinatario no existe. Verifica el email.');
                $('#error-msg').removeClass('d-none');
                return;
            }
            
            // Actualizar saldo de cuenta remitente
            activeAccount.balance -= amount;
            
            // Crear transacción del remitente
            const senderTransaction = {
                id: activeAccount.transactions.length + 1,
                type: 'send',
                amount: amount,
                to: recipient.name,
                date: new Date().toISOString(),
                description: description,
                accountId: activeAccount.id
            };
            activeAccount.transactions.push(senderTransaction);
            
            // Obtener cuenta activa del destinatario
            const recipientActiveAccount = getActiveAccount(recipient);
            
            // Actualizar saldo del destinatario
            recipientActiveAccount.balance += amount;
            
            // Crear transacción del destinatario
            const recipientTransaction = {
                id: recipientActiveAccount.transactions.length + 1,
                type: 'receive',
                amount: amount,
                from: currentUser.name,
                date: new Date().toISOString(),
                description: description,
                accountId: recipientActiveAccount.id
            };
            recipientActiveAccount.transactions.push(recipientTransaction);
            
            // Guardar ambos usuarios
            const senderIndex = usersDB.findIndex(u => u.email === currentUser.email);
            const recipientIndex = usersDB.findIndex(u => u.email === recipientEmail);
            
            if (senderIndex !== -1) {
                usersDB[senderIndex] = currentUser;
            }
            if (recipientIndex !== -1) {
                usersDB[recipientIndex] = recipient;
            }
            
            saveUsers(usersDB);
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Mostrar éxito
            $('#success-msg').removeClass('d-none');
            
            // Limpiar formulario
            $('#sendMoneyForm')[0].reset();
            
            // Redirigir al dashboard después de 2 segundos
            setTimeout(function() {
                window.location.href = 'menu.html';
            }, 2000);
        });
    }

    // --- 9. Lógica de Gestión de Cuentas (accounts.html) ---
    if ($('#accountsList').length && currentUser) {
        const accountsList = $('#accountsList');
        
        // Función para renderizar cuentas
        function renderAccounts() {
            accountsList.empty();
            
            if (!currentUser.accounts || currentUser.accounts.length === 0) {
                accountsList.html('<div class="col-12 text-center text-muted">No hay cuentas disponibles</div>');
                return;
            }
            
            currentUser.accounts.forEach(account => {
                const isActive = account.id === currentUser.activeAccountId;
                const typeIcons = {
                    'corriente': 'fa-money-check-alt',
                    'ahorro': 'fa-piggy-bank',
                    'inversion': 'fa-chart-line',
                    'otro': 'fa-wallet'
                };
                const typeColors = {
                    'corriente': 'primary',
                    'ahorro': 'success',
                    'inversion': 'warning',
                    'otro': 'secondary'
                };
                const icon = typeIcons[account.type] || 'fa-wallet';
                const color = typeColors[account.type] || 'secondary';
                
                const accountHtml = `
                    <div class="col-md-4">
                        <div class="card account-card ${isActive ? 'active' : ''}" data-account-id="${account.id}">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-start mb-3">
                                    <div>
                                        <h6 class="text-muted mb-1">
                                            <i class="fas ${icon} text-${color} me-2"></i>${account.type.toUpperCase()}
                                        </h6>
                                        <h5 class="mb-0 fw-bold">${account.name}</h5>
                                    </div>
                                    ${isActive ? '<span class="badge bg-primary">Activa</span>' : ''}
                                </div>
                                <h3 class="text-${color} mb-3">$${account.balance.toFixed(2)}</h3>
                                <small class="text-muted">
                                    <i class="fas fa-list me-1"></i>${account.transactions.length} transacciones
                                </small>
                                ${!isActive ? `
                                    <div class="mt-3">
                                        <button class="btn btn-sm btn-outline-primary w-100 set-active-btn" data-account-id="${account.id}">
                                            <i class="fas fa-check-circle me-1"></i>Usar esta cuenta
                                        </button>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `;
                accountsList.append(accountHtml);
            });
            
            // Event handler para establecer cuenta activa
            $('.set-active-btn').click(function(e) {
                e.stopPropagation();
                const accountId = parseInt($(this).data('account-id'));
                currentUser.activeAccountId = accountId;
                sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                // Actualizar en localStorage
                usersDB = loadUsers();
                const userIndex = usersDB.findIndex(u => u.email === currentUser.email);
                if (userIndex !== -1) {
                    usersDB[userIndex].activeAccountId = accountId;
                    saveUsers(usersDB);
                }
                
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
                $('#create-error').text('Por favor completa todos los campos obligatorios.').removeClass('d-none');
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
                    type: 'receive',
                    amount: initialBalance,
                    from: 'Saldo inicial',
                    date: new Date().toISOString(),
                    description: 'Apertura de cuenta',
                    accountId: newAccountId
                });
            }
            
            currentUser.accounts.push(newAccount);
            
            // Guardar
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            usersDB = loadUsers();
            const userIndex = usersDB.findIndex(u => u.email === currentUser.email);
            if (userIndex !== -1) {
                usersDB[userIndex] = currentUser;
                saveUsers(usersDB);
            }
            
            // Cerrar modal y resetear formulario
            const modal = bootstrap.Modal.getInstance(document.getElementById('newAccountModal'));
            modal.hide();
            $('#newAccountForm')[0].reset();
            
            // Re-renderizar
            renderAccounts();
        });
    }

    // Botón de Cerrar Sesión
    $('#logoutBtn').click(function(e) {
        e.preventDefault();
        sessionStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
});

// --- 10. PRESUPUESTO POR CATEGORÍAS ---
$(document).ready(function() {
    if (window.location.pathname.includes('budget.html')) {
        const currentUserData = sessionStorage.getItem('currentUser');
        
        if (!currentUserData) {
            window.location.href = 'login.html';
            return;
        }
        
        const currentUser = JSON.parse(currentUserData);
        
        // Inicializar budget si no existe
        if (!currentUser.budget) {
            currentUser.budget = {
                // Categorías de INGRESOS
                trabajo: { name: 'Trabajo/Sueldo', type: 'income', assigned: 0, received: 0 },
                presupuesto: { name: 'Saldo/Presupuesto', type: 'income', assigned: 0, received: 0 },
                // Categorías de GASTOS
                agua: { name: 'Agua', type: 'expense', assigned: 0, spent: 0 },
                telecomunicaciones: { name: 'Telecomunicaciones', type: 'expense', assigned: 0, spent: 0 },
                educacion: { name: 'Educación', type: 'expense', assigned: 0, spent: 0 },
                vivienda: { name: 'Vivienda', type: 'expense', assigned: 0, spent: 0 },
                transporte: { name: 'Transporte', type: 'expense', assigned: 0, spent: 0 },
                alimentacion: { name: 'Alimentación', type: 'expense', assigned: 0, spent: 0 },
                varios: { name: 'Gastos Varios', type: 'expense', assigned: 0, spent: 0 }
            };
        }
        
        // Divisa por defecto
        if (!currentUser.currency) {
            currentUser.currency = 'USD';
        }
        
        // Cargar divisa guardada
        $('#budgetCurrency').val(currentUser.currency);
        
        // Cambiar divisa
        $('#budgetCurrency').change(function() {
            currentUser.currency = $(this).val();
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            let usersDB = loadUsers();
            const userIndex = usersDB.findIndex(u => u.email === currentUser.email);
            if (userIndex !== -1) {
                usersDB[userIndex].currency = currentUser.currency;
                saveUsers(usersDB);
            }
            renderBudget();
        });
        
        // Obtener símbolo de divisa
        function getCurrencySymbol(currency) {
            const symbols = {
                'USD': '$',
                'CLP': '$',
                'EUR': '€'
            };
            return symbols[currency] || '$';
        }
        
        // Iconos para cada categoría
        const categoryIcons = {
            // Ingresos
            trabajo: 'fa-briefcase text-primary',
            presupuesto: 'fa-piggy-bank text-success',
            // Gastos
            agua: 'fa-tint text-info',
            telecomunicaciones: 'fa-broadcast-tower text-primary',
            educacion: 'fa-graduation-cap text-warning',
            vivienda: 'fa-home text-success',
            transporte: 'fa-bus text-danger',
            alimentacion: 'fa-utensils text-secondary',
            varios: 'fa-shopping-bag text-dark'
        };
        
        function renderBudget() {
            const budget = currentUser.budget;
            const currency = currentUser.currency || 'USD';
            const symbol = getCurrencySymbol(currency);
            
            // Actualizar símbolos de divisa
            $('#currencySymbol').text(symbol);
            $('.currencySymbol').text(symbol);
            
            let totalAssignedExpenses = 0;
            let totalSpent = 0;
            let totalAssignedIncome = 0;
            let totalReceived = 0;
            
            // Calcular totales separados
            for (let key in budget) {
                const category = budget[key];
                if (category.type === 'expense') {
                    totalAssignedExpenses += category.assigned || 0;
                    totalSpent += category.spent || 0;
                } else if (category.type === 'income') {
                    totalAssignedIncome += category.assigned || 0;
                    totalReceived += category.received || 0;
                }
            }
            
            const totalAvailable = totalAssignedExpenses - totalSpent;
            const percentSpent = totalAssignedExpenses > 0 ? (totalSpent / totalAssignedExpenses * 100).toFixed(1) : 0;
            
            // Actualizar resumen
            $('#totalAssigned').html(symbol + totalAssignedExpenses.toFixed(2));
            $('#totalSpent').html(symbol + totalSpent.toFixed(2));
            $('#totalAvailable').html(symbol + totalAvailable.toFixed(2));
            
            // Actualizar barra de progreso
            const progressBar = $('#budgetProgress');
            progressBar.css('width', percentSpent + '%');
            progressBar.text(percentSpent + '%');
            
            if (percentSpent >= 90) {
                progressBar.removeClass('bg-success bg-warning').addClass('bg-danger');
            } else if (percentSpent >= 70) {
                progressBar.removeClass('bg-success bg-danger').addClass('bg-warning');
            } else {
                progressBar.removeClass('bg-warning bg-danger').addClass('bg-success');
            }
            
            // Renderizar categorías
            const container = $('#categoriesContainer');
            container.empty();
            
            // Primero las de INGRESOS
            let incomeHTML = '<div class="col-12"><h4 class="text-success"><i class="fas fa-plus-circle me-2"></i>Ingresos</h4></div>';
            for (let key in budget) {
                const category = budget[key];
                if (category.type !== 'income') continue;
                
                const received = category.received || 0;
                const assigned = category.assigned || 0;
                const percent = assigned > 0 ? (received / assigned * 100).toFixed(1) : 0;
                
                let progressClass = 'bg-success';
                if (percent >= 90) progressClass = 'bg-primary';
                else if (percent >= 70) progressClass = 'bg-info';
                
                incomeHTML += `
                    <div class="col-md-6 mb-3">
                        <div class="card shadow-sm border-success">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <i class="fas ${categoryIcons[key]} me-2"></i>${category.name}
                                </h5>
                                <div class="row text-center mb-2">
                                    <div class="col-6">
                                        <small class="text-muted">Esperado</small>
                                        <div class="fw-bold">${symbol}${assigned.toFixed(2)}</div>
                                    </div>
                                    <div class="col-6">
                                        <small class="text-muted">Recibido</small>
                                        <div class="fw-bold text-success">${symbol}${received.toFixed(2)}</div>
                                    </div>
                                </div>
                                <div class="progress mb-2" style="height: 20px;">
                                    <div class="progress-bar ${progressClass}" role="progressbar" style="width: ${percent}%">${percent}%</div>
                                </div>
                                <button class="btn btn-sm btn-outline-success w-100 record-income-btn" data-category="${key}" data-name="${category.name}">
                                    <i class="fas fa-plus-circle me-1"></i>Registrar Ingreso
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }
            container.append(incomeHTML);
            
            // Luego las de GASTOS
            let expenseHTML = '<div class="col-12 mt-3"><h4 class="text-danger"><i class="fas fa-minus-circle me-2"></i>Gastos</h4></div>';
            for (let key in budget) {
                const category = budget[key];
                if (category.type !== 'expense') continue;
                
                const spent = category.spent || 0;
                const assigned = category.assigned || 0;
                const available = assigned - spent;
                const percent = assigned > 0 ? (spent / assigned * 100).toFixed(1) : 0;
                
                let progressClass = 'bg-success';
                if (percent >= 90) progressClass = 'bg-danger';
                else if (percent >= 70) progressClass = 'bg-warning';
                
                expenseHTML += `
                    <div class="col-md-6 mb-3">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <i class="fas ${categoryIcons[key]} me-2"></i>${category.name}
                                </h5>
                                <div class="row text-center mb-2">
                                    <div class="col-4">
                                        <small class="text-muted">Asignado</small>
                                        <div class="fw-bold">${symbol}${assigned.toFixed(2)}</div>
                                    </div>
                                    <div class="col-4">
                                        <small class="text-muted">Gastado</small>
                                        <div class="fw-bold text-danger">${symbol}${spent.toFixed(2)}</div>
                                    </div>
                                    <div class="col-4">
                                        <small class="text-muted">Disponible</small>
                                        <div class="fw-bold text-success">${symbol}${available.toFixed(2)}</div>
                                    </div>
                                </div>
                                <div class="progress mb-2" style="height: 20px;">
                                    <div class="progress-bar ${progressClass}" role="progressbar" style="width: ${percent}%">${percent}%</div>
                                </div>
                                <button class="btn btn-sm btn-outline-danger w-100 record-expense-btn" data-category="${key}" data-name="${category.name}">
                                    <i class="fas fa-receipt me-1"></i>Registrar Gasto
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                            </div>
                        </div>
                    </div>
                `;
            }
            container.append(expenseHTML);
        }
        
        // Cargar valores actuales en el modal
        function loadBudgetValues() {
            const budget = currentUser.budget;
            for (let key in budget) {
                $(`#${key}`).val(budget[key].assigned);
            }
        }
        
        // Guardar presupuestos
        $('#saveBudgetBtn').click(function() {
            const budget = currentUser.budget;
            
            // Ingresos
            budget.trabajo.assigned = parseFloat($('#trabajo').val()) || 0;
            budget.presupuesto.assigned = parseFloat($('#presupuesto').val()) || 0;
            
            // Gastos
            budget.agua.assigned = parseFloat($('#agua').val()) || 0;
            budget.telecomunicaciones.assigned = parseFloat($('#telecomunicaciones').val()) || 0;
            budget.educacion.assigned = parseFloat($('#educacion').val()) || 0;
            budget.vivienda.assigned = parseFloat($('#vivienda').val()) || 0;
            budget.transporte.assigned = parseFloat($('#transporte').val()) || 0;
            budget.alimentacion.assigned = parseFloat($('#alimentacion').val()) || 0;
            budget.varios.assigned = parseFloat($('#varios').val()) || 0;
            
            // Guardar en sesión
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Guardar en localStorage
            let usersDB = loadUsers();
            const userIndex = usersDB.findIndex(u => u.email === currentUser.email);
            if (userIndex !== -1) {
                usersDB[userIndex] = currentUser;
                saveUsers(usersDB);
            }
            
            // Cerrar modal y re-renderizar
            const modal = bootstrap.Modal.getInstance(document.getElementById('assignBudgetModal'));
            modal.hide();
            renderBudget();
        });
        
        // Abrir modal para registrar ingreso
        $(document).on('click', '.record-income-btn', function() {
            const category = $(this).data('category');
            const name = $(this).data('name');
            
            $('#incomeCategory').val(category);
            $('#incomeCategoryName').val(name);
            $('#incomeAmount').val('');
            $('#incomeDescription').val('');
            
            const modal = new bootstrap.Modal(document.getElementById('recordIncomeModal'));
            modal.show();
        });
        
        // Guardar ingreso
        $('#saveIncomeBtn').click(function() {
            const category = $('#incomeCategory').val();
            const amount = parseFloat($('#incomeAmount').val());
            const description = $('#incomeDescription').val();
            
            if (!amount || amount <= 0 || !description) {
                alert('Por favor complete todos los campos correctamente');
                return;
            }
            
            // Registrar ingreso en categoría
            const categoryBudget = currentUser.budget[category];
            categoryBudget.received = (categoryBudget.received || 0) + amount;
            
            // Crear transacción en la cuenta activa
            const activeAccount = getActiveAccount(currentUser);
            if (activeAccount) {
                const transactionId = activeAccount.transactions.length > 0 
                    ? Math.max(...activeAccount.transactions.map(t => t.id)) + 1 
                    : 1;
                
                activeAccount.transactions.push({
                    id: transactionId,
                    type: 'receive',
                    amount: amount,
                    from: categoryBudget.name,
                    date: new Date().toISOString(),
                    description: description,
                    accountId: activeAccount.id,
                    category: category
                });
                
                activeAccount.balance += amount;
            }
            
            // Guardar
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            let usersDB = loadUsers();
            const userIndex = usersDB.findIndex(u => u.email === currentUser.email);
            if (userIndex !== -1) {
                usersDB[userIndex] = currentUser;
                saveUsers(usersDB);
            }
            
            // Cerrar modal y re-renderizar
            const modal = bootstrap.Modal.getInstance(document.getElementById('recordIncomeModal'));
            modal.hide();
            $('#recordIncomeForm')[0].reset();
            renderBudget();
        });
        
        // Abrir modal para registrar gasto
        $(document).on('click', '.record-expense-btn', function() {
            const category = $(this).data('category');
            const name = $(this).data('name');
            
            $('#expenseCategory').val(category);
            $('#expenseCategoryName').val(name);
            $('#expenseAmount').val('');
            $('#expenseDescription').val('');
            
            const modal = new bootstrap.Modal(document.getElementById('recordExpenseModal'));
            modal.show();
        });
        
        // Guardar gasto
        $('#saveExpenseBtn').click(function() {
            const category = $('#expenseCategory').val();
            const amount = parseFloat($('#expenseAmount').val());
            const description = $('#expenseDescription').val();
            
            if (!amount || amount <= 0 || !description) {
                alert('Por favor complete todos los campos correctamente');
                return;
            }
            
            // Verificar que no exceda el presupuesto
            const categoryBudget = currentUser.budget[category];
            const newSpent = categoryBudget.spent + amount;
            
            if (newSpent > categoryBudget.assigned) {
                if (!confirm(`Este gasto excederá tu presupuesto asignado. ¿Deseas continuar?`)) {
                    return;
                }
            }
            
            // Registrar gasto
            categoryBudget.spent += amount;
            
            // Crear transacción en la cuenta activa
            const activeAccount = getActiveAccount(currentUser);
            if (activeAccount) {
                // Verificar saldo suficiente
                if (activeAccount.balance < amount) {
                    alert('Saldo insuficiente en tu cuenta activa');
                    return;
                }
                
                const transactionId = activeAccount.transactions.length > 0 
                    ? Math.max(...activeAccount.transactions.map(t => t.id)) + 1 
                    : 1;
                
                activeAccount.transactions.push({
                    id: transactionId,
                    type: 'send',
                    amount: amount,
                    to: categoryBudget.name,
                    date: new Date().toISOString(),
                    description: description,
                    accountId: activeAccount.id,
                    category: category
                });
                
                activeAccount.balance -= amount;
            }
            
            // Guardar
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            let usersDB = loadUsers();
            const userIndex = usersDB.findIndex(u => u.email === currentUser.email);
            if (userIndex !== -1) {
                usersDB[userIndex] = currentUser;
                saveUsers(usersDB);
            }
            
            // Cerrar modal y re-renderizar
            const modal = bootstrap.Modal.getInstance(document.getElementById('recordExpenseModal'));
            modal.hide();
            $('#recordExpenseForm')[0].reset();
            renderBudget();
        });
        
        // Botón logout
        $('#logoutButton').click(function(e) {
            e.preventDefault();
            sessionStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
        
        // Inicializar modal con valores actuales
        $('#assignBudgetModal').on('show.bs.modal', function() {
            loadBudgetValues();
        });
        
        // Render inicial
        renderBudget();
    }
});

// --- 11. CALENDARIO DE TRANSACCIONES ---
$(document).ready(function() {
    if (window.location.pathname.includes('calendar.html')) {
        const currentUserData = sessionStorage.getItem('currentUser');
        
        if (!currentUserData) {
            window.location.href = 'login.html';
            return;
        }
        
        const currentUser = JSON.parse(currentUserData);
        let currentDate = new Date();
        
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                           'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        
        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            // Actualizar encabezado
            $('#currentMonthYear').text(`${monthNames[month]} ${year}`);
            
            // Obtener todas las transacciones del usuario
            const allTransactions = getAllUserTransactions(currentUser);
            
            // Crear mapa de transacciones por fecha
            const transactionsByDate = {};
            allTransactions.forEach(t => {
                const date = new Date(t.date);
                const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                if (!transactionsByDate[dateKey]) {
                    transactionsByDate[dateKey] = [];
                }
                transactionsByDate[dateKey].push(t);
            });
            
            // Primer día del mes
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const startingDayOfWeek = firstDay.getDay();
            const daysInMonth = lastDay.getDate();
            
            // Días del mes anterior
            const prevMonthLastDay = new Date(year, month, 0).getDate();
            
            const grid = $('#calendarGrid');
            grid.empty();
            
            // Headers de días
            dayNames.forEach(day => {
                grid.append(`<div class="calendar-day-header">${day}</div>`);
            });
            
            // Días del mes anterior
            for (let i = startingDayOfWeek - 1; i >= 0; i--) {
                const day = prevMonthLastDay - i;
                grid.append(`<div class="calendar-day other-month"><span class="day-number">${day}</span></div>`);
            }
            
            // Días del mes actual
            const today = new Date();
            for (let day = 1; day <= daysInMonth; day++) {
                const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
                const transactions = transactionsByDate[dateKey] || [];
                const hasTransactions = transactions.length > 0;
                
                let classes = 'calendar-day';
                if (isToday) classes += ' today';
                if (hasTransactions) classes += ' has-transactions';
                
                let dotsHTML = '';
                if (hasTransactions) {
                    const income = transactions.filter(t => t.type === 'receive').length;
                    const expense = transactions.filter(t => t.type === 'send').length;
                    
                    dotsHTML = '<div class="transaction-dots">';
                    for (let i = 0; i < Math.min(income, 3); i++) {
                        dotsHTML += '<div class="transaction-dot income"></div>';
                    }
                    for (let i = 0; i < Math.min(expense, 3); i++) {
                        dotsHTML += '<div class="transaction-dot expense"></div>';
                    }
                    dotsHTML += '</div>';
                }
                
                grid.append(`
                    <div class="${classes}" data-date="${dateKey}">
                        <span class="day-number">${day}</span>
                        ${dotsHTML}
                    </div>
                `);
            }
            
            // Días del siguiente mes
            const remainingDays = 42 - (startingDayOfWeek + daysInMonth);
            for (let day = 1; day <= remainingDays; day++) {
                grid.append(`<div class="calendar-day other-month"><span class="day-number">${day}</span></div>`);
            }
            
            // Event listeners para los días
            $('.calendar-day:not(.other-month)').click(function() {
                const dateKey = $(this).data('date');
                if (dateKey) {
                    showDayTransactions(dateKey, transactionsByDate[dateKey] || []);
                }
            });
        }
        
        function showDayTransactions(dateKey, transactions) {
            const date = new Date(dateKey);
            const formattedDate = `${date.getDate()} de ${monthNames[date.getMonth()]} de ${date.getFullYear()}`;
            
            $('#selectedDate').text(formattedDate);
            
            if (transactions.length === 0) {
                $('#dayTransactionsList').html('<p class="text-muted">No hay transacciones en este día</p>');
            } else {
                let html = '<div class="list-group">';
                transactions.forEach(t => {
                    const time = new Date(t.date).toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'});
                    const isIncome = t.type === 'receive';
                    const icon = isIncome ? 'fa-arrow-down text-success' : 'fa-arrow-up text-danger';
                    const color = isIncome ? 'success' : 'danger';
                    const label = isIncome ? 'De' : 'Para';
                    const contact = isIncome ? t.from : t.to;
                    
                    html += `
                        <div class="list-group-item">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas ${icon} me-2"></i>
                                    <strong class="text-${color}">$${t.amount.toFixed(2)}</strong>
                                    <div class="small text-muted">${label}: ${contact}</div>
                                    <div class="small">${t.description}</div>
                                </div>
                                <div class="text-end">
                                    <div class="small text-muted">${time}</div>
                                </div>
                            </div>
                        </div>
                    `;
                });
                html += '</div>';
                $('#dayTransactionsList').html(html);
            }
            
            $('#dayTransactionsCard').show();
            $('html, body').animate({
                scrollTop: $('#dayTransactionsCard').offset().top - 20
            }, 500);
        }
        
        // Navegación de meses
        $('#prevMonth').click(function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
        
        $('#nextMonth').click(function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
        
        // Logout
        $('#logoutButton').click(function(e) {
            e.preventDefault();
            sessionStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
        
        // Render inicial
        renderCalendar();
    }
});

// --- 12. CONVERSOR DE DIVISAS ---
$(document).ready(function() {
    if (window.location.pathname.includes('currency.html')) {
        const currentUserData = sessionStorage.getItem('currentUser');
        
        if (!currentUserData) {
            window.location.href = 'login.html';
            return;
        }
        
        const currentUser = JSON.parse(currentUserData);
        
        // Tasas de cambio (simuladas - en producción usar API real)
        const exchangeRates = {
            CLP: { USD: 0.0011, EUR: 0.0010, CLP: 1 },
            USD: { CLP: 920, EUR: 0.92, USD: 1 },
            EUR: { CLP: 1000, USD: 1.09, EUR: 1 }
        };
        
        // Actualizar fecha de última actualización
        $('#lastUpdate').text(new Date().toLocaleString('es-ES'));
        
        // Actualizar tasas en la UI
        $('#clpToUsd').text(exchangeRates.CLP.USD.toFixed(4));
        $('#clpToEur').text(exchangeRates.CLP.EUR.toFixed(4));
        $('#usdToEur').text(exchangeRates.USD.EUR.toFixed(2));
        
        // Función de conversión
        function convert() {
            const amount = parseFloat($('#sourceAmount').val()) || 0;
            const sourceCurrency = $('#sourceCurrency').val();
            const targetCurrency = $('#targetCurrency').val();
            
            let result = 0;
            
            if (sourceCurrency === targetCurrency) {
                result = amount;
            } else {
                result = amount * exchangeRates[sourceCurrency][targetCurrency];
            }
            
            $('#targetAmount').val(result.toFixed(2));
            updateConversionTable();
        }
        
        // Función para mostrar tabla de referencia
        function updateConversionTable() {
            const sourceCurrency = $('#sourceCurrency').val();
            const targetCurrency = $('#targetCurrency').val();
            const rate = exchangeRates[sourceCurrency][targetCurrency];
            
            const amounts = [1, 10, 100, 1000, 10000, 100000];
            let tableHTML = '<table class="table table-sm table-hover"><thead><tr><th>' + sourceCurrency + '</th><th>' + targetCurrency + '</th></tr></thead><tbody>';
            
            amounts.forEach(amt => {
                const converted = (amt * rate).toFixed(2);
                tableHTML += `<tr><td>${amt.toLocaleString()}</td><td>${parseFloat(converted).toLocaleString()}</td></tr>`;
            });
            
            tableHTML += '</tbody></table>';
            $('#conversionTable').html(tableHTML);
        }
        
        // Eventos
        $('#sourceAmount, #sourceCurrency, #targetCurrency').on('input change', convert);
        
        // Botón swap
        $('#swapBtn').click(function() {
            const temp = $('#sourceCurrency').val();
            $('#sourceCurrency').val($('#targetCurrency').val());
            $('#targetCurrency').val(temp);
            convert();
        });
        
        // Mostrar saldo del usuario en diferentes divisas
        function showUserBalance() {
            const activeAccount = getActiveAccount(currentUser);
            if (!activeAccount) return;
            
            const balance = activeAccount.balance;
            const container = $('#userBalanceConversions');
            
            container.empty();
            
            // Asumir que el saldo está en USD por defecto
            const currencies = [
                { code: 'USD', symbol: '$', flag: '🇺🇸', name: 'Dólares' },
                { code: 'CLP', symbol: '$', flag: '🇨🇱', name: 'Pesos Chilenos' },
                { code: 'EUR', symbol: '€', flag: '🇪🇺', name: 'Euros' }
            ];
            
            currencies.forEach(curr => {
                const converted = balance * exchangeRates.USD[curr.code];
                const html = `
                    <div class="col-md-4 mb-3">
                        <div class="card shadow-sm">
                            <div class="card-body text-center">
                                <div class="display-1">${curr.flag}</div>
                                <h5 class="mt-2">${curr.name}</h5>
                                <h3 class="text-success">${curr.symbol}${converted.toLocaleString('es-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
                                <small class="text-muted">${curr.code}</small>
                            </div>
                        </div>
                    </div>
                `;
                container.append(html);
            });
        }
        
        // Logout
        $('#logoutButton').click(function(e) {
            e.preventDefault();
            sessionStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
        
        // Inicializar
        convert();
        showUserBalance();
    }
});