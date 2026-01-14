/**
 * calendar.js
 * Lógica específica de la página de calendario
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
    
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    
    const allTransactions = Helpers.getAllUserTransactions(currentUser);
    
    /**
     * Renderizar calendario
     */
    function renderCalendar(month, year) {
        const calendar = $('#calendar');
        calendar.empty();
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        $('#monthYear').text(`${MONTH_NAMES[month]} ${year}`);
        
        // Headers días de la semana
        const headerRow = $('<div class="row g-2 mb-2"></div>');
        DAY_NAMES.forEach(day => {
            headerRow.append(`<div class="col text-center fw-bold">${day}</div>`);
        });
        calendar.append(headerRow);
        
        // Días del mes
        let dayCount = 1;
        let row = $('<div class="row g-2"></div>');
        
        // Espacios vacíos antes del primer día
        for (let i = 0; i < firstDay; i++) {
            row.append('<div class="col"><div class="calendar-day empty"></div></div>');
        }
        
        // Días del mes
        for (let day = dayCount; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateStr = date.toISOString().split('T')[0];
            
            // Transacciones de este día
            const dayTransactions = allTransactions.filter(tx => {
                const txDate = new Date(tx.date).toISOString().split('T')[0];
                return txDate === dateStr;
            });
            
            const isToday = new Date().toDateString() === date.toDateString();
            const todayClass = isToday ? 'today' : '';
            const hasTransactionsClass = dayTransactions.length > 0 ? 'has-transactions' : '';
            
            row.append(`
                <div class="col">
                    <div class="calendar-day ${todayClass} ${hasTransactionsClass}" data-date="${dateStr}">
                        <div class="day-number">${day}</div>
                        ${dayTransactions.length > 0 ? `<div class="transaction-count">${dayTransactions.length}</div>` : ''}
                    </div>
                </div>
            `);
            
            // Nueva fila cada 7 días
            if ((firstDay + day) % 7 === 0) {
                calendar.append(row);
                row = $('<div class="row g-2"></div>');
            }
        }
        
        // Agregar última fila si no está vacía
        if (row.children().length > 0) {
            calendar.append(row);
        }
    }
    
    /**
     * Mostrar transacciones del día
     */
    function showDayTransactions(dateStr) {
        const date = new Date(dateStr);
        const dayTransactions = allTransactions.filter(tx => {
            const txDate = new Date(tx.date).toISOString().split('T')[0];
            return txDate === dateStr;
        });
        
        const modalTitle = $('#dayModalLabel');
        const modalBody = $('#dayTransactions');
        
        modalTitle.text(Helpers.formatDate(date));
        modalBody.empty();
        
        if (dayTransactions.length === 0) {
            modalBody.html('<p class="text-muted text-center">No hay transacciones este día</p>');
        } else {
            // Calcular totales del día
            const dayTotals = TransactionService.calculateTotals(dayTransactions);
            
            modalBody.append(`
                <div class="row mb-3">
                    <div class="col-6">
                        <div class="card text-center">
                            <div class="card-body p-2">
                                <small class="text-muted">Recibido</small>
                                <h6 class="text-success mb-0">${Helpers.formatCurrency(dayTotals.received, currentUser.currency)}</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card text-center">
                            <div class="card-body p-2">
                                <small class="text-muted">Enviado</small>
                                <h6 class="text-danger mb-0">${Helpers.formatCurrency(dayTotals.sent, currentUser.currency)}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list-group">
            `);
            
            dayTransactions.forEach(tx => {
                const isReceive = tx.type === TRANSACTION_TYPES.RECEIVE;
                const icon = isReceive ? 'fa-arrow-down text-success' : 'fa-arrow-up text-danger';
                const contact = isReceive ? tx.from : tx.to;
                const sign = isReceive ? '+' : '-';
                const amountClass = isReceive ? 'text-success' : 'text-danger';
                
                modalBody.append(`
                    <div class="list-group-item">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <i class="fas ${icon}"></i>
                                <strong>${contact}</strong>
                                <br><small class="text-muted">${tx.description || 'Sin descripción'}</small>
                            </div>
                            <div class="${amountClass} fw-bold">
                                ${sign}${Helpers.formatCurrency(tx.amount, currentUser.currency)}
                            </div>
                        </div>
                    </div>
                `);
            });
            
            modalBody.append('</div>');
        }
        
        new bootstrap.Modal(document.getElementById('dayModal')).show();
    }
    
    // Renderizar calendario inicial
    renderCalendar(currentMonth, currentYear);
    
    // Navegación de mes
    $('#prevMonth').click(function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });
    
    $('#nextMonth').click(function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });
    
    // Click en día
    $(document).on('click', '.calendar-day:not(.empty)', function() {
        const dateStr = $(this).data('date');
        if (dateStr) {
            showDayTransactions(dateStr);
        }
    });
    
    // Logout
    $('#logoutBtn, #logoutButton').click(function(e) {
        e.preventDefault();
        AuthService.logout();
    });
});
