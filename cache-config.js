// Configuración del Sistema de Cache Inteligente
// Este archivo contiene las configuraciones y constantes del sistema de cache

// Configuración del cache
const CACHE_CONFIG = {
    // Tiempo máximo de vida del cache (en milisegundos)
    MAX_AGE: 60 * 60 * 1000, // 1 hora
    
    // Tiempo de verificación de actualizaciones (en milisegundos)
    UPDATE_CHECK_INTERVAL: 5 * 60 * 1000, // 5 minutos
    
    // Nombre de la clave en localStorage
    STORAGE_KEY: 'productsCache',
    
    // Nombre del documento de control de versión en Firestore
    VERSION_DOC_PATH: 'system/database_version',
    
    // Configuración de reintentos
    MAX_RETRIES: 3,
    RETRY_DELAY: 2000, // 2 segundos
};

// Configuración de Firebase
const FIREBASE_CONFIG = {
    // Colección de productos
    PRODUCTS_COLLECTION: 'products',
    
    // Campos de ordenamiento por defecto
    DEFAULT_ORDER_BY: 'Nombre',
    
    // Configuración de consultas
    QUERY_LIMIT: 1000, // Máximo de productos a cargar
};

// Configuración de la interfaz de usuario
const UI_CONFIG = {
    // Mensajes de estado
    MESSAGES: {
        LOADING: 'Cargando productos...',
        CACHE_LOADED: 'Productos cargados desde cache',
        UPDATING: 'Actualizando productos...',
        ERROR: 'Error cargando productos',
        NO_PRODUCTS: 'No se encontraron productos',
        CACHE_EXPIRED: 'Cache expirado, cargando desde Firebase',
        UPDATES_DETECTED: 'Detectados cambios en la base de datos',
        NO_UPDATES: 'No hay cambios en la base de datos',
        CACHE_SAVED: 'Productos guardados en cache',
        CACHE_CLEARED: 'Cache limpiado',
        VERSION_UPDATED: 'Versión de base de datos actualizada'
    },
    
    // Colores para los indicadores
    COLORS: {
        PRIMARY: '#a4cc94',
        SUCCESS: '#27ae60',
        WARNING: '#f39c12',
        ERROR: '#e74c3c',
        INFO: '#3498db'
    },
    
    // Configuración de animaciones
    ANIMATIONS: {
        LOADING_SPINNER_DURATION: '1s',
        FADE_IN_DURATION: '0.3s',
        SLIDE_DURATION: '0.3s'
    }
};

// Configuración de rendimiento
const PERFORMANCE_CONFIG = {
    // Tamaño máximo del cache en bytes
    MAX_CACHE_SIZE: 10 * 1024 * 1024, // 10 MB
    
    // Tiempo de debounce para búsquedas
    SEARCH_DEBOUNCE: 300, // 300ms
    
    // Lazy loading de imágenes
    LAZY_LOADING_THRESHOLD: 0.1, // 10% del viewport
    
    // Compresión de datos en cache
    COMPRESS_CACHE: true,
    
    // Limpieza automática del cache
    AUTO_CLEANUP: true,
    CLEANUP_INTERVAL: 24 * 60 * 60 * 1000 // 24 horas
};

// Configuración de monitoreo y logs
const MONITORING_CONFIG = {
    // Habilitar logs detallados
    ENABLE_VERBOSE_LOGS: true,
    
    // Habilitar métricas de rendimiento
    ENABLE_PERFORMANCE_METRICS: true,
    
    // Habilitar reportes de errores
    ENABLE_ERROR_REPORTING: true,
    
    // Nivel de log (debug, info, warn, error)
    LOG_LEVEL: 'info',
    
    // Tamaño máximo del historial de logs
    MAX_LOG_HISTORY: 100
};

// Exportar configuraciones
window.CACHE_CONFIG = CACHE_CONFIG;
window.FIREBASE_CONFIG = FIREBASE_CONFIG;
window.UI_CONFIG = UI_CONFIG;
window.PERFORMANCE_CONFIG = PERFORMANCE_CONFIG;
window.MONITORING_CONFIG = MONITORING_CONFIG;

// Función para obtener configuración
function getCacheConfig() {
    return {
        cache: CACHE_CONFIG,
        firebase: FIREBASE_CONFIG,
        ui: UI_CONFIG,
        performance: PERFORMANCE_CONFIG,
        monitoring: MONITORING_CONFIG
    };
}

// Función para actualizar configuración
function updateCacheConfig(newConfig) {
    Object.assign(CACHE_CONFIG, newConfig.cache || {});
    Object.assign(FIREBASE_CONFIG, newConfig.firebase || {});
    Object.assign(UI_CONFIG, newConfig.ui || {});
    Object.assign(PERFORMANCE_CONFIG, newConfig.performance || {});
    Object.assign(MONITORING_CONFIG, newConfig.monitoring || {});
    
    console.log('Configuración del cache actualizada:', getCacheConfig());
}

// Función para resetear configuración a valores por defecto
function resetCacheConfig() {
    // Recargar la página para restaurar configuración por defecto
    location.reload();
}

// Exportar funciones de configuración
window.getCacheConfig = getCacheConfig;
window.updateCacheConfig = updateCacheConfig;
window.resetCacheConfig = resetCacheConfig;
