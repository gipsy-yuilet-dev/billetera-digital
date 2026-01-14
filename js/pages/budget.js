/**
 * budget.js
 * Lógica específica de la página de presupuesto
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
    
    // Inicializar presupuesto si no existe
    if (!currentUser.budget) {
        currentUser.budget = {
            total: 0,
            categories: Helpers.deepClone(DEFAULT_BUDGET_CATEGORIES),
            movements: []
        };
        StorageService.updateCurrentUser(currentUser);
    }
    
    /**
     * Renderizar presupuesto
     */
    function renderBudget() {
        const categoriesList = $('#categoriesList');
        categoriesList.empty();
        
        // Calcular totales
        let totalAssigned = 0;
        let totalSpent = 0;
        
        currentUser.budget.categories.forEach(category => {
            totalAssigned += category.assigned;
            totalSpent += category.spent;
            
            const percentage = category.assigned > 0 ? (category.spent / category.assigned * 100) : 0;
            const barClass = percentage > 90 ? 'bg-danger' : percentage > 70 ? 'bg-warning' : 'bg-success';
            
            categoriesList.append(`
                <div class="col-md-6 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <h6 class="mb-0">
                                    <i class="${category.icon}"></i> ${category.name}
                                </h6>
                                <button class="btn btn-sm btn-primary assign-budget-btn" 
                                        data-category="${category.name}">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                            <div class="progress mb-2" style="height: 20px;">
                                <div class="progress-bar ${barClass}" role="progressbar" 
                                     style="width: ${Math.min(percentage, 100)}%">
                                    ${Math.round(percentage)}%
                                </div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <small>Gastado: <strong>${Helpers.formatCurrency(category.spent, currentUser.currency)}</strong></small>
                                <small>Asignado: <strong>${Helpers.formatCurrency(category.assigned, currentUser.currency)}</strong></small>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });
        
        // Actualizar resumen
        $('#totalBudget').text(Helpers.formatCurrency(currentUser.budget.total, currentUser.currency));
        $('#totalAssigned').text(Helpers.formatCurrency(totalAssigned, currentUser.currency));
        $('#totalSpent').text(Helpers.formatCurrency(totalSpent, currentUser.currency));
        $('#totalRemaining').text(Helpers.formatCurrency(currentUser.budget.total - totalSpent, currentUser.currency));
    }
    
    /**
     * Renderizar movimientos recientes
     */
    function renderMovements() {
        const movementsList = $('#movementsList');
        movementsList.empty();
        
        if (!currentUser.budget.movements || currentUser.budget.movements.length === 0) {
            movementsList.html('<tr><td colspan="5" class="text-center text-muted">No hay movimientos registrados</td></tr>');
            return;
        }
        
        const recentMovements = currentUser.budget.movements.slice(-10).reverse();
        recentMovements.forEach(mov => {
            const isIncome = mov.type === 'income';
            const icon = isIncome ? 'fa-arrow-up text-success' : 'fa-arrow-down text-danger';
            const amountClass = isIncome ? 'text-success' : 'text-danger';
            const sign = isIncome ? '+' : '-';
            
            movementsList.append(`
                <tr>
                    <td><i class="fas ${icon}"></i></td>
                    <td>${Helpers.formatDate(mov.date)}</td>
                    <td><i class="${mov.icon}"></i> ${mov.category}</td>
                    <td>${mov.description}</td>
                    <td class="${amountClass} fw-bold">${sign}${Helpers.formatCurrency(mov.amount, currentUser.currency)}</td>
                </tr>
            `);
        });
    }
    
    renderBudget();
    renderMovements();
    
    // Asignar presupuesto inicial
    $('#assignBudgetForm').submit(function(e) {
        e.preventDefault();
        const amount = parseFloat($('#budgetAmount').val());
        
        if (amount < VALIDATION.MIN_INITIAL_BUDGET) {
            alert(`El presupuesto mínimo es ${Helpers.formatCurrency(VALIDATION.MIN_INITIAL_BUDGET, currentUser.currency)}`);
            return;
        }
        
        currentUser.budget.total = amount;
        StorageService.updateCurrentUser(currentUser);
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('assignBudgetModal'));
        modal.hide();
        $('#assignBudgetForm')[0].reset();
        
        renderBudget();
    });
    
    // Asignar a categoría
    $(document).on('click', '.assign-budget-btn', function() {
        const categoryName = $(this).data('category');
        $('#categoryName').text(categoryName);
        $('#assignAmount').data('category', categoryName);
        new bootstrap.Modal(document.getElementById('assignCategoryModal')).show();
    });
    
    $('#assignCategoryForm').submit(function(e) {
        e.preventDefault();
        const categoryName = $('#assignAmount').data('category');
        const amount = parseFloat($('#assignAmount').val());
        
        const category = currentUser.budget.categories.find(c => c.name === categoryName);
        if (category) {
            category.assigned += amount;
            StorageService.updateCurrentUser(currentUser);
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('assignCategoryModal'));
            modal.hide();
            $('#assignCategoryForm')[0].reset();
            
            renderBudget();
        }
    });
    
    // Registrar gasto
    $('#expenseForm').submit(function(e) {
        e.preventDefault();
        
        const categoryName = $('#expenseCategory').val();
        const amount = parseFloat($('#expenseAmount').val());
        const description = $('#expenseDescription').val();
        
        const category = currentUser.budget.categories.find(c => c.name === categoryName);
        if (category) {
            category.spent += amount;
            
            currentUser.budget.movements.push({
                type: 'expense',
                category: categoryName,
                icon: category.icon,
                amount: amount,
                description: description,
                date: new Date().toISOString()
            });
            
            StorageService.updateCurrentUser(currentUser);
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('addExpenseModal'));
            modal.hide();
            $('#expenseForm')[0].reset();
            
            renderBudget();
            renderMovements();
        }
    });
    
    // Registrar ingreso
    $('#incomeForm').submit(function(e) {
        e.preventDefault();
        
        const categoryName = $('#incomeCategory').val();
        const amount = parseFloat($('#incomeAmount').val());
        const description = $('#incomeDescription').val();
        
        const category = currentUser.budget.categories.find(c => c.name === categoryName);
        if (category) {
            currentUser.budget.total += amount;
            
            currentUser.budget.movements.push({
                type: 'income',
                category: categoryName,
                icon: category.icon,
                amount: amount,
                description: description,
                date: new Date().toISOString()
            });
            
            StorageService.updateCurrentUser(currentUser);
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('addIncomeModal'));
            modal.hide();
            $('#incomeForm')[0].reset();
            
            renderBudget();
            renderMovements();
        }
    });
    
    // Logout
    $('#logoutBtn, #logoutButton').click(function(e) {
        e.preventDefault();
        AuthService.logout();
    });
});
