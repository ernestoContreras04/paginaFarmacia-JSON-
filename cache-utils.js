// Utilidades del Sistema de Cache Inteligente
// Este archivo contiene funciones auxiliares para el manejo del cache

// Función para comprimir datos antes de guardar en cache
function compressData(data) {
    try {
        if (PERFORMANCE_CONFIG.COMPRESS_CACHE) {
            // Convertir a string y comprimir usando LZ-string si está disponible
            const jsonString = JSON.stringify(data);
            
            if (typeof LZString !== 'undefined') {
                return LZString.compress(jsonString);
            } else {
                // Fallback: usar compresión básica eliminando espacios innecesarios
                return jsonString.replace(/\s+/g, ' ').trim();
            }
        }
        return JSON.stringify(data);
    } catch (error) {
        console.error('Error comprimiendo datos:', error);
        return JSON.stringify(data);
    }
}

// Función para descomprimir datos del cache
function decompressData(compressedData) {
    try {
        if (PERFORMANCE_CONFIG.COMPRESS_CACHE && typeof LZString !== 'undefined') {
            // Intentar descomprimir con LZ-string
            const decompressed = LZString.decompress(compressedData);
            if (decompressed) {
                return JSON.parse(decompressed);
            }
        }
        
        // Fallback: parsear directamente
        return JSON.parse(compressedData);
    } catch (error) {
        console.error('Error descomprimiendo datos:', error);
        return null;
    }
}

// Función para calcular el tamaño del cache
function getCacheSize() {
    try {
        const cacheData = localStorage.getItem(CACHE_CONFIG.STORAGE_KEY);
        if (cacheData) {
            return new Blob([cacheData]).size;
        }
        return 0;
    } catch (error) {
        console.error('Error calculando tamaño del cache:', error);
        return 0;
    }
}

// Función para verificar si el cache está lleno
function isCacheFull() {
    const currentSize = getCacheSize();
    return currentSize > PERFORMANCE_CONFIG.MAX_CACHE_SIZE;
}

// Función para limpiar cache automáticamente
function autoCleanupCache() {
    if (!PERFORMANCE_CONFIG.AUTO_CLEANUP) return;
    
    try {
        const cacheData = localStorage.getItem(CACHE_CONFIG.STORAGE_KEY);
        if (cacheData) {
            const parsed = JSON.parse(cacheData);
            const cacheAge = Date.now() - parsed.lastUpdate;
            
            // Limpiar si es muy antiguo (más de 24 horas)
            if (cacheAge > PERFORMANCE_CONFIG.CLEANUP_INTERVAL) {
                localStorage.removeItem(CACHE_CONFIG.STORAGE_KEY);
                console.log('🗑️ Cache limpiado automáticamente por antigüedad');
            }
        }
    } catch (error) {
        console.error('Error en limpieza automática del cache:', error);
    }
}

// Función para obtener estadísticas del cache
function getCacheStats() {
    try {
        const cacheData = localStorage.getItem(CACHE_CONFIG.STORAGE_KEY);
        if (cacheData) {
            const parsed = JSON.parse(cacheData);
            const cacheAge = Date.now() - parsed.lastUpdate;
            const size = getCacheSize();
            
            return {
                hasCache: true,
                productCount: parsed.products ? parsed.products.length : 0,
                lastUpdate: new Date(parsed.lastUpdate).toLocaleString(),
                age: cacheAge,
                ageFormatted: formatTime(cacheAge),
                size: size,
                sizeFormatted: formatBytes(size),
                isExpired: cacheAge > CACHE_CONFIG.MAX_AGE,
                databaseVersion: parsed.databaseVersion
            };
        }
        
        return {
            hasCache: false,
            productCount: 0,
            lastUpdate: null,
            age: 0,
            ageFormatted: 'N/A',
            size: 0,
            sizeFormatted: '0 B',
            isExpired: true,
            databaseVersion: null
        };
    } catch (error) {
        console.error('Error obteniendo estadísticas del cache:', error);
        return null;
    }
}

// Función para formatear tiempo
function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} día(s)`;
    if (hours > 0) return `${hours} hora(s)`;
    if (minutes > 0) return `${minutes} minuto(s)`;
    return `${seconds} segundo(s)`;
}

// Función para formatear bytes
function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Función para validar datos del cache
function validateCacheData(data) {
    try {
        if (!data || typeof data !== 'object') return false;
        if (!Array.isArray(data.products)) return false;
        if (typeof data.lastUpdate !== 'number') return false;
        if (typeof data.databaseVersion !== 'string') return false;
        
        // Validar que los productos tengan la estructura correcta
        for (const product of data.products) {
            if (!product.id || !product.name) return false;
        }
        
        return true;
    } catch (error) {
        console.error('Error validando datos del cache:', error);
        return false;
    }
}

// Función para crear backup del cache
function backupCache() {
    try {
        const cacheData = localStorage.getItem(CACHE_CONFIG.STORAGE_KEY);
        if (cacheData) {
            const backup = {
                data: cacheData,
                timestamp: Date.now(),
                version: '1.0'
            };
            
            localStorage.setItem('productsCache_backup', JSON.stringify(backup));
            console.log('💾 Backup del cache creado');
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error creando backup del cache:', error);
        return false;
    }
}

// Función para restaurar backup del cache
function restoreCacheBackup() {
    try {
        const backupData = localStorage.getItem('productsCache_backup');
        if (backupData) {
            const backup = JSON.parse(backupData);
            localStorage.setItem(CACHE_CONFIG.STORAGE_KEY, backup.data);
            console.log('🔄 Backup del cache restaurado');
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error restaurando backup del cache:', error);
        return false;
    }
}

// Función para exportar cache como archivo
function exportCache() {
    try {
        const cacheData = localStorage.getItem(CACHE_CONFIG.STORAGE_KEY);
        if (cacheData) {
            const dataStr = JSON.stringify(JSON.parse(cacheData), null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `products-cache-${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            
            console.log('📤 Cache exportado como archivo');
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error exportando cache:', error);
        return false;
    }
}

// Función para importar cache desde archivo
function importCache(file) {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const cacheData = JSON.parse(e.target.result);
                    if (validateCacheData(cacheData)) {
                        localStorage.setItem(CACHE_CONFIG.STORAGE_KEY, JSON.stringify(cacheData));
                        console.log('📥 Cache importado desde archivo');
                        resolve(true);
                    } else {
                        reject(new Error('Formato de archivo inválido'));
                    }
                } catch (error) {
                    reject(new Error('Error parseando archivo'));
                }
            };
            reader.readAsText(file);
        } catch (error) {
            reject(error);
        }
    });
}

// Función para mostrar información del cache en la consola
function logCacheInfo() {
    const stats = getCacheStats();
    if (stats) {
        console.group('📊 Información del Cache de Productos');
        console.log('Estado:', stats.hasCache ? '✅ Activo' : '❌ Inactivo');
        console.log('Productos:', stats.productCount);
        console.log('Última actualización:', stats.lastUpdate);
        console.log('Antigüedad:', stats.ageFormatted);
        console.log('Tamaño:', stats.sizeFormatted);
        console.log('Versión BD:', stats.databaseVersion);
        console.log('Expiró:', stats.isExpired ? '⚠️ Sí' : '✅ No');
        console.groupEnd();
    }
}

// Función para monitorear cambios en el cache
function monitorCacheChanges() {
    let lastSize = getCacheSize();
    
    setInterval(() => {
        const currentSize = getCacheSize();
        if (currentSize !== lastSize) {
            console.log('🔄 Cambio detectado en el cache:', {
                anterior: formatBytes(lastSize),
                actual: formatBytes(currentSize),
                diferencia: formatBytes(currentSize - lastSize)
            });
            lastSize = currentSize;
        }
    }, 10000); // Verificar cada 10 segundos
}

// Exportar funciones de utilidades
window.cacheUtils = {
    compressData,
    decompressData,
    getCacheSize,
    isCacheFull,
    autoCleanupCache,
    getCacheStats,
    validateCacheData,
    backupCache,
    restoreCacheBackup,
    exportCache,
    importCache,
    logCacheInfo,
    monitorCacheChanges
};

// Inicializar utilidades cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    // Configurar limpieza automática
    if (PERFORMANCE_CONFIG.AUTO_CLEANUP) {
        autoCleanupCache();
        setInterval(autoCleanupCache, PERFORMANCE_CONFIG.CLEANUP_INTERVAL);
    }
    
    // Mostrar información del cache en consola
    if (MONITORING_CONFIG.ENABLE_VERBOSE_LOGS) {
        setTimeout(logCacheInfo, 1000);
    }
    
    // Iniciar monitoreo de cambios
    if (MONITORING_CONFIG.ENABLE_PERFORMANCE_METRICS) {
        monitorCacheChanges();
    }
});
