/**
 * init-users.js
 * Script para inicializar usuarios de prueba en localStorage
 * Este script crea los usuarios de UsuarioWallet.txt si no existen
 */

(function() {
    // Verificar si ya existen usuarios
    const existingUsers = localStorage.getItem('usersDB');
    
    // Función para inicializar usuarios
    function initializeUsers() {
        console.log('🔄 Inicializando usuarios de prueba...');
        
        const testUsers = [
            {
                email: 'juan_soto@loquesea.com',
                password: 'Juan123',
                name: 'Juan Soto',
                activeAccountId: 1,
                currency: 'USD',
                accounts: [
                    {
                        id: 1,
                        name: 'Cuenta Corriente',
                        type: 'corriente',
                        balance: 100000,
                        transactions: [
                            {
                                id: 1,
                                type: 'receive',
                                amount: 50000,
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
                    trabajo: { name: 'Trabajo/Sueldo', type: 'income', assigned: 0, received: 0 },
                    presupuesto: { name: 'Saldo/Presupuesto', type: 'income', assigned: 0, received: 0 },
                    agua: { name: 'Agua', type: 'expense', assigned: 0, spent: 0 },
                    telecomunicaciones: { name: 'Telecomunicaciones', type: 'expense', assigned: 0, spent: 0 },
                    educacion: { name: 'Educación', type: 'expense', assigned: 0, spent: 0 },
                    vivienda: { name: 'Vivienda', type: 'expense', assigned: 0, spent: 0 },
                    transporte: { name: 'Transporte', type: 'expense', assigned: 0, spent: 0 },
                    alimentacion: { name: 'Alimentación', type: 'expense', assigned: 0, spent: 0 },
                    varios: { name: 'Gastos Varios', type: 'expense', assigned: 0, spent: 0 }
                }
            },
            {
                email: 'yolanda.sultana@loquesea.com',
                password: 'Yoli321',
                name: 'Yolanda Sultana',
                activeAccountId: 1,
                currency: 'CLP',
                accounts: [
                    {
                        id: 1,
                        name: 'Cuenta Corriente',
                        type: 'corriente',
                        balance: 1500000,
                        transactions: [
                            {
                                id: 1,
                                type: 'receive',
                                amount: 1500000,
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
                    trabajo: { name: 'Trabajo/Sueldo', type: 'income', assigned: 0, received: 0 },
                    presupuesto: { name: 'Saldo/Presupuesto', type: 'income', assigned: 0, received: 0 },
                    agua: { name: 'Agua', type: 'expense', assigned: 0, spent: 0 },
                    telecomunicaciones: { name: 'Telecomunicaciones', type: 'expense', assigned: 0, spent: 0 },
                    educacion: { name: 'Educación', type: 'expense', assigned: 0, spent: 0 },
                    vivienda: { name: 'Vivienda', type: 'expense', assigned: 0, spent: 0 },
                    transporte: { name: 'Transporte', type: 'expense', assigned: 0, spent: 0 },
                    alimentacion: { name: 'Alimentación', type: 'expense', assigned: 0, spent: 0 },
                    varios: { name: 'Gastos Varios', type: 'expense', assigned: 0, spent: 0 }
                }
            },
            {
                email: 'cgallo@loqusea.com',
                password: 'Kikiriki987',
                name: 'Claudio Gallo',
                activeAccountId: 1,
                currency: 'EUR',
                accounts: [
                    {
                        id: 1,
                        name: 'Cuenta Corriente',
                        type: 'corriente',
                        balance: 25000,
                        transactions: [
                            {
                                id: 1,
                                type: 'receive',
                                amount: 25000,
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
                    trabajo: { name: 'Trabajo/Sueldo', type: 'income', assigned: 0, received: 0 },
                    presupuesto: { name: 'Saldo/Presupuesto', type: 'income', assigned: 0, received: 0 },
                    agua: { name: 'Agua', type: 'expense', assigned: 0, spent: 0 },
                    telecomunicaciones: { name: 'Telecomunicaciones', type: 'expense', assigned: 0, spent: 0 },
                    educacion: { name: 'Educación', type: 'expense', assigned: 0, spent: 0 },
                    vivienda: { name: 'Vivienda', type: 'expense', assigned: 0, spent: 0 },
                    transporte: { name: 'Transporte', type: 'expense', assigned: 0, spent: 0 },
                    alimentacion: { name: 'Alimentación', type: 'expense', assigned: 0, spent: 0 },
                    varios: { name: 'Gastos Varios', type: 'expense', assigned: 0, spent: 0 }
                }
            }
        ];
        
        // Guardar usuarios en localStorage
        localStorage.setItem('usersDB', JSON.stringify(testUsers));
        console.log('✅ Usuarios de prueba cargados exitosamente:');
        testUsers.forEach(user => {
            console.log(`  - ${user.name} (${user.email})`);
        });
        return testUsers;
    }
    
    // Solo inicializar si no hay usuarios o si se quiere forzar la recarga
    if (!existingUsers || JSON.parse(existingUsers).length === 0) {
        initializeUsers();
    } else {
        const users = JSON.parse(existingUsers);
        console.log('ℹ️ Usuarios existentes en localStorage:', users.length);
        users.forEach(user => {
            console.log(`  - ${user.name} (${user.email})`);
        });
    }
    
    // Exponer función global para recargar usuarios
    window.reloadTestUsers = function() {
        localStorage.removeItem('usersDB');
        sessionStorage.clear();
        const users = initializeUsers();
        console.log('♻️ Usuarios recargados exitosamente');
        return users;
    };
})();
