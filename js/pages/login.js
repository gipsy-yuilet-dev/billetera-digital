/**
 * login.js
 * Lógica específica de la página de login
 */

$(document).ready(function() {
    // Verificar si ya hay sesión activa
    if (AuthService.isAuthenticated()) {
        Helpers.redirect(ROUTES.DASHBOARD);
        return;
    }
    
    // Botón para recargar usuarios de prueba
    $('#resetUsers').click(function(e) {
        e.preventDefault();
        if (confirm('¿Deseas recargar los usuarios de prueba? Esto eliminará todos los datos actuales.')) {
            localStorage.clear();
            sessionStorage.clear();
            location.reload();
        }
    });
    
    // Manejo del formulario de login
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        
        // Limpiar mensajes previos
        Helpers.hideMessages();
        
        // Obtener datos del formulario
        const email = $('#email').val().trim().toLowerCase();
        const password = $('#password').val();
        
        // Validación básica
        if (!email || !password) {
            Helpers.showError('Por favor completa todos los campos');
            return;
        }
        
        // Verificar que existan usuarios en localStorage
        const users = localStorage.getItem('usersDB');
        if (!users) {
            Helpers.showError('No hay usuarios registrados. Haz clic en "Recargar usuarios" para cargar los usuarios de prueba.');
            return;
        }
        
        // Intentar login
        const result = AuthService.login(email, password);
        
        if (result.success) {
            Helpers.showSuccess(SUCCESS_MESSAGES.LOGIN_SUCCESS);
            setTimeout(() => {
                Helpers.redirect(ROUTES.DASHBOARD);
            }, 1000);
        } else {
            // Mostrar error más específico
            Helpers.showError(result.error);
            console.error('Error de login:', result.error);
        }
    });
});
