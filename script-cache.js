// Sistema de Cache Inteligente para Productos
// Este archivo implementa un sistema que solo carga productos desde Firebase cuando hay cambios reales

// Variables globales para el sistema de cache
let productsCache = {
    products: [],
    lastUpdate: null,
    databaseVersion: null
};

// Función para cargar productos con sistema de cache inteligente
async function loadProductsWithCache() {
    try {
        // Mostrar indicador de carga
        showLoadingIndicator();
        
        // Intentar cargar desde cache primero
        const cachedData = loadFromCache();
        
        if (cachedData && cachedData.products.length > 0) {
            // Mostrar productos del cache inmediatamente
            displayProducts(cachedData.products);
            hideLoadingIndicator();
            
            // Verificar si hay actualizaciones en segundo plano
            checkForUpdates();
        } else {
            // No hay cache, cargar desde Firebase
            await loadProductsFromFirebase();
        }
    } catch (error) {
        console.error('Error cargando productos con cache:', error);
        // Fallback: cargar desde Firebase si falla el cache
        await loadProductsFromFirebase();
    }
}

// Función para cargar productos desde Firebase
async function loadProductsFromFirebase() {
    try {
        console.log('🔄 Cargando productos desde Firebase...');
        
        // Verificar que Firebase esté disponible
        if (!window.productsCollection) {
            throw new Error('Firebase no está disponible');
        }
        
        // Importar getDocs para Firebase v9+
        const { getDocs } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        const snapshot = await getDocs(productsCollection);
        
        const products = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.Nombre || data.name || 'Sin nombre',
                description: data.Descripcion || data.description || 'Sin descripción',
                price: data.Precio || data.price || 0,
                category: data.Tipo || data.category || 'Sin categoría',
                brand: data.Marca || data.brand || 'Sin marca',
                image: data.ruta_imagen || data.image || '💊'
            };
        });
        
        // Obtener la versión de la base de datos (crear si no existe)
        const databaseVersion = await getDatabaseVersion();
        
        // Guardar en cache
        saveToCache(products, databaseVersion);
        
        // Mostrar productos
        displayProducts(products);
        updateCartCount();
        
        console.log(`✅ Productos cargados exitosamente: ${products.length}`);
        
        // Mostrar mensaje de éxito en la consola
        if (products.length > 0) {
            console.log('📦 Productos disponibles:', products.map(p => p.name));
        } else {
            console.log('⚠️ No se encontraron productos en la base de datos');
        }
        
    } catch (error) {
        console.error('❌ Error al cargar productos desde Firebase:', error);
        
        // Mostrar información detallada del error
        if (error.code) {
            console.error(`Código de error: ${error.code}`);
        }
        if (error.message) {
            console.error(`Mensaje: ${error.message}`);
        }
        
        // Cargar productos de ejemplo como fallback
        console.log('🔄 Cargando productos de ejemplo como fallback...');
        loadExampleProducts();
    } finally {
        hideLoadingIndicator();
    }
}

// Función para cargar productos de ejemplo como fallback
function loadExampleProducts() {
    console.log('🔄 Cargando productos de ejemplo como fallback...');
    
    const exampleProducts = [
        {
            id: 'ejemplo1',
            name: 'Paracetamol 500mg',
            description: 'Analgésico y antipirético',
            price: 5.99,
            category: 'Analgésicos',
            brand: 'Genérico',
            image: '💊'
        },
        {
            id: 'ejemplo2',
            name: 'Ibuprofeno 400mg',
            description: 'Antiinflamatorio no esteroideo',
            price: 6.50,
            category: 'Antiinflamatorios',
            brand: 'Genérico',
            image: '💊'
        },
        {
            id: 'ejemplo3',
            name: 'Vitamina C 1000mg',
            description: 'Suplemento vitamínico',
            price: 12.99,
            category: 'Vitaminas',
            brand: 'Genérico',
            image: '💊'
        }
    ];
    
    // Guardar en cache con versión de ejemplo
    const exampleVersion = 'ejemplo_' + Date.now().toString();
    saveToCache(exampleProducts, exampleVersion);
    
    // Mostrar productos
    displayProducts(exampleProducts);
    updateCartCount();
    
    console.log(`✅ Productos de ejemplo cargados: ${exampleProducts.length} productos`);
    console.log('📝 Nota: Estos son productos de ejemplo. Para productos reales, configura Firebase correctamente.');
}

// Función para obtener la versión de la base de datos
async function getDatabaseVersion() {
    try {
        // Intentar obtener la versión existente
        const { doc, getDoc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        const versionRef = doc(db, 'system', 'database_version');
        const versionDoc = await getDoc(versionRef);
        
        if (versionDoc.exists()) {
            return versionDoc.data().version;
        } else {
            // Crear versión inicial si no existe
            const newVersion = Date.now().toString();
            await setDoc(versionRef, { 
                version: newVersion,
                created: new Date().toISOString(),
                description: 'Versión de control para detectar cambios en productos'
            });
            return newVersion;
        }
    } catch (error) {
        console.error('Error obteniendo versión de BD:', error);
        return Date.now().toString();
    }
}

// Función para verificar actualizaciones en segundo plano
async function checkForUpdates() {
    try {
        // Obtener la versión actual de la base de datos
        const currentVersion = await getDatabaseVersion();
        
        // Comparar con la versión en cache
        if (productsCache.databaseVersion !== currentVersion) {
            console.log('🔄 Detectados cambios en la base de datos, actualizando...');
            await loadProductsFromFirebase();
        } else {
            console.log('✅ No hay cambios en la base de datos, usando cache');
        }
    } catch (error) {
        console.error('Error verificando actualizaciones:', error);
    }
}

// Función para guardar en cache
function saveToCache(products, databaseVersion) {
    const cacheData = {
        products: products,
        lastUpdate: Date.now(),
        databaseVersion: databaseVersion
    };
    
    try {
        localStorage.setItem('productsCache', JSON.stringify(cacheData));
        productsCache = cacheData;
        console.log('💾 Productos guardados en cache');
    } catch (error) {
        console.error('Error guardando en cache:', error);
    }
}

// Función para cargar desde cache
function loadFromCache() {
    try {
        const cached = localStorage.getItem('productsCache');
        if (cached) {
            const cacheData = JSON.parse(cached);
            
            // Verificar si el cache no es muy antiguo (máximo 1 hora)
            const cacheAge = Date.now() - cacheData.lastUpdate;
            const maxAge = 60 * 60 * 1000; // 1 hora en milisegundos
            
            if (cacheAge < maxAge) {
                productsCache = cacheData;
                console.log('📦 Productos cargados desde cache');
                return cacheData;
            } else {
                console.log('⏰ Cache expirado, cargando desde Firebase');
                localStorage.removeItem('productsCache');
            }
        }
    } catch (error) {
        console.error('Error cargando desde cache:', error);
        localStorage.removeItem('productsCache');
    }
    
    return null;
}

// Función para limpiar cache
function clearCache() {
    try {
        localStorage.removeItem('productsCache');
        productsCache = {
            products: [],
            lastUpdate: null,
            databaseVersion: null
        };
        console.log('🗑️ Cache limpiado');
    } catch (error) {
        console.error('Error limpiando cache:', error);
    }
}

// Función para forzar actualización desde Firebase
async function forceRefreshProducts() {
    console.log('🔄 Forzando actualización de productos...');
    clearCache();
    await loadProductsFromFirebase();
}

// Función para mostrar indicador de carga
function showLoadingIndicator() {
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        productsGrid.innerHTML = `
            <div class="loading-container" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <div class="loading-spinner" style="width: 50px; height: 50px; border: 4px solid #f3f3f3; border-top: 4px solid #a4cc94; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
                <p>Cargando productos...</p>
            </div>
        `;
    }
}

// Función para ocultar indicador de carga
function hideLoadingIndicator() {
    // El indicador se oculta automáticamente cuando se muestran los productos
}

// Función para mostrar mensaje de error
function showErrorMessage(message) {
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        productsGrid.innerHTML = `
            <div class="error-container" style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #e74c3c;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3>Error</h3>
                <p>${message}</p>
                <button onclick="forceRefreshProducts()" style="background: #a4cc94; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer; margin-top: 1rem;">
                    Reintentar
                </button>
            </div>
        `;
    }
}

// Función para actualizar la versión de la base de datos (llamar cuando se modifiquen productos)
async function updateDatabaseVersion() {
    try {
        const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        const versionRef = doc(db, 'system', 'database_version');
        const newVersion = Date.now().toString();
        
        await setDoc(versionRef, { 
            version: newVersion,
            updated: new Date().toISOString(),
            description: 'Versión actualizada - productos modificados'
        });
        
        console.log('🔄 Versión de base de datos actualizada:', newVersion);
        return newVersion;
    } catch (error) {
        console.error('Error actualizando versión de BD:', error);
        return null;
    }
}

// Exportar funciones para uso en otros archivos
window.loadProductsWithCache = loadProductsWithCache;
window.forceRefreshProducts = forceRefreshProducts;
window.clearCache = clearCache;
window.updateDatabaseVersion = updateDatabaseVersion;
