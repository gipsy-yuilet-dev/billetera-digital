/**
 * register.js
 * Lógica específica de la página de registro
 */

$(document).ready(function() {
    // Verificar si ya hay sesión activa
    if (AuthService.isAuthenticated()) {
        Helpers.redirect(ROUTES.DASHBOARD);
        return;
    }
    
    let avatarDataURL = null;
    
    // Actualizar símbolo de moneda cuando cambia la selección
    $('#userCurrency').change(function() {
        const currency = $(this).val();
        if (currency && CURRENCIES[currency]) {
            $('#currencySymbol').text(CURRENCIES[currency].symbol);
        }
    });
    
    // Actualizar preview del avatar cuando cambia el nombre
    $('#regName').on('input', function() {
        const name = $(this).val().trim();
        if (name && !avatarDataURL) {
            $('#avatarPreview').attr('src', `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=200`);
        }
    });
    
    // Manejar subida de imagen de avatar
    $('#avatarUpload').change(function(e) {
        const file = e.target.files[0];
        if (file) {
            // Validar que sea imagen
            if (!file.type.startsWith('image/')) {
                alert('Por favor selecciona un archivo de imagen válido');
                return;
            }
            
            // Validar tamaño (máximo 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('La imagen es muy grande. Máximo 2MB.');
                return;
            }
            
            // Leer y mostrar preview
            const reader = new FileReader();
            reader.onload = function(e) {
                avatarDataURL = e.target.result;
                $('#avatarPreview').attr('src', avatarDataURL);
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Manejo del formulario de registro
    $('#registerForm').submit(function(e) {
        e.preventDefault();
        
        // Limpiar mensajes y estilos previos
        Helpers.hideMessages();
        $('#regEmail, #regPasswordConfirm').removeClass('is-invalid');
        
        // Obtener datos del formulario
        const name = $('#regName').val().trim();
        const userData = {
            name: name,
            email: $('#regEmail').val().trim(),
            password: $('#regPassword').val(),
            confirmPassword: $('#regPasswordConfirm').val(),
            initialBudget: parseFloat($('#initialBudget').val()) || VALIDATION.MIN_INITIAL_BUDGET,
            currency: $('#userCurrency').val() || 'CLP',
            avatar: avatarDataURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=200`
        };
        
        // Intentar registro
        const result = AuthService.register(userData);
        
        if (result.success) {
            Helpers.showSuccess(SUCCESS_MESSAGES.REGISTER_SUCCESS);
            Helpers.redirect(ROUTES.LOGIN, 2000);
        } else {
            // Marcar campos con error específico
            if (result.error.includes('email') || result.error.includes('correo')) {
                $('#regEmail').addClass('is-invalid');
            }
            if (result.error.includes('contraseña')) {
                $('#regPasswordConfirm').addClass('is-invalid');
            }
            
            Helpers.showError(result.error);
        }
    });
});
