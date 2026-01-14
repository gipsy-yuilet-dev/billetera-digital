/**
 * currency.js
 * Lógica específica de la página de conversor de divisas
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
    
    // Mostrar saldo en todas las divisas
    function displayBalanceInCurrencies() {
        $('#balanceUSD').text(Helpers.formatCurrency(
            Helpers.convertCurrency(activeAccount.balance, currentUser.currency, CURRENCIES.USD),
            CURRENCIES.USD
        ));
        $('#balanceCLP').text(Helpers.formatCurrency(
            Helpers.convertCurrency(activeAccount.balance, currentUser.currency, CURRENCIES.CLP),
            CURRENCIES.CLP
        ));
        $('#balanceEUR').text(Helpers.formatCurrency(
            Helpers.convertCurrency(activeAccount.balance, currentUser.currency, CURRENCIES.EUR),
            CURRENCIES.EUR
        ));
    }
    
    displayBalanceInCurrencies();
    
    // Conversor
    $('#converterForm').on('submit', function(e) {
        e.preventDefault();
        
        const amount = parseFloat($('#amountFrom').val());
        const fromCurrency = $('#currencyFrom').val();
        const toCurrency = $('#currencyTo').val();
        
        if (!amount || amount <= 0) {
            $('#conversionResult').html('<div class="alert alert-warning">Ingresa un monto válido</div>');
            return;
        }
        
        const result = Helpers.convertCurrency(amount, fromCurrency, toCurrency);
        const rate = EXCHANGE_RATES[fromCurrency][toCurrency];
        
        $('#conversionResult').html(`
            <div class="card">
                <div class="card-body text-center">
                    <h3 class="text-primary mb-3">
                        ${Helpers.formatCurrency(amount, fromCurrency)}
                    </h3>
                    <div class="mb-3">
                        <i class="fas fa-arrow-down fa-2x text-muted"></i>
                    </div>
                    <h3 class="text-success mb-3">
                        ${Helpers.formatCurrency(result, toCurrency)}
                    </h3>
                    <small class="text-muted">
                        Tasa: 1 ${fromCurrency} = ${rate} ${toCurrency}
                    </small>
                </div>
            </div>
        `);
    });
    
    // Intercambiar divisas
    $('#swapCurrencies').click(function() {
        const fromCurrency = $('#currencyFrom').val();
        const toCurrency = $('#currencyTo').val();
        
        $('#currencyFrom').val(toCurrency);
        $('#currencyTo').val(fromCurrency);
    });
    
    // Tabla de tasas de cambio
    function displayExchangeRates() {
        const ratesTable = $('#exchangeRatesTable');
        ratesTable.empty();
        
        Object.keys(EXCHANGE_RATES).forEach(from => {
            Object.keys(EXCHANGE_RATES[from]).forEach(to => {
                if (from !== to) {
                    const rate = EXCHANGE_RATES[from][to];
                    ratesTable.append(`
                        <tr>
                            <td><strong>1 ${from}</strong></td>
                            <td><i class="fas fa-arrow-right text-muted"></i></td>
                            <td><strong>${rate} ${to}</strong></td>
                        </tr>
                    `);
                }
            });
        });
    }
    
    displayExchangeRates();
    
    // Logout
    $('#logoutBtn, #logoutButton').click(function(e) {
        e.preventDefault();
        AuthService.logout();
    });
});
