// Configuración de la Farmacia
const FARMACIA_CONFIG = {
    // Información de la farmacia
    nombre: "Farmacia Contreras Alarcón",
    telefono: "+34636363611",
    email: "farmaciacontrerasalarcon@gmail.com",
    direccion: "C. de Sta. Cruz de Marcenado, 30, Centro, 28015 Madrid",
    
    // Horarios
    horarios: {
        semana: "9:00 - 21:00",
        finDeSemana: "9:30 - 14:00",
    },
    
    // Configuración del carrito
    carrito: {
        autoCerrar: true,
        tiempoAutoCerrar: 2000, // milisegundos
        mostrarNotificaciones: true
    },
    
    // Configuración de productos
    productos: {
        itemsPorPagina: 12,
        mostrarPrecios: true,
        mostrarStock: false
    },
    
    // Configuración de WhatsApp
    whatsapp: {
        mensajeInicial: "Hola, me gustaría hacer el siguiente pedido:",
        incluirTotal: true,
        incluirDireccion: true
    },
    
    // Configuración de la interfaz
    ui: {
        tema: "claro", // claro, oscuro, auto
        animaciones: true,
        modoResponsive: true,
        botonVolverArriba: true
    }
};

// Función para obtener configuración
function getConfig(key) {
    return key ? FARMACIA_CONFIG[key] : FARMACIA_CONFIG;
}

// Función para actualizar configuración
function updateConfig(key, value) {
    if (FARMACIA_CONFIG.hasOwnProperty(key)) {
        FARMACIA_CONFIG[key] = value;
        // Guardar en localStorage
        localStorage.setItem('farmaciaConfig', JSON.stringify(FARMACIA_CONFIG));
    }
}

// Cargar configuración desde localStorage al iniciar
document.addEventListener('DOMContentLoaded', function() {
    const savedConfig = localStorage.getItem('farmaciaConfig');
    if (savedConfig) {
        Object.assign(FARMACIA_CONFIG, JSON.parse(savedConfig));
    }
});

// Exportar para uso global
window.FARMACIA_CONFIG = FARMACIA_CONFIG;
window.getConfig = getConfig;
window.updateConfig = updateConfig;
