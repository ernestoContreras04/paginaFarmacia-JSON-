// Test simple para verificar la carga del JSON desde Firebase Storage
// Ejecutar en la consola del navegador o como script independiente

console.log('🧪 Iniciando test simple de Firebase Storage...');

async function testFirebaseStorageSimple() {
    try {
        console.log('🔄 Cargando datos desde Firebase Storage...');
        
        // URL del archivo JSON en Firebase Storage
        const firebaseStorageURL = 'https://firebasestorage.googleapis.com/v0/b/farmacia-9737f.firebasestorage.app/o/data%2Fproducts.json?alt=media&token=bd9be4f5-e908-49e5-8cf2-32e6c4cec290';
        
        console.log('📁 URL:', firebaseStorageURL);
        
        // Hacer la petición al JSON
        const response = await fetch(firebaseStorageURL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('✅ Datos cargados exitosamente!');
        console.log('📊 Metadata:', data.metadata);
        console.log('📦 Total productos:', data.productos.length);
        
        // Mostrar algunos productos de ejemplo
        console.log('🎯 Primeros 3 productos:');
        data.productos.slice(0, 3).forEach((product, index) => {
            console.log(`${index + 1}. ${product.nombre} - €${product.precio} (${product.categoria})`);
        });
        
        // Calcular estadísticas
        const categories = [...new Set(data.productos.map(p => p.categoria))];
        const brands = [...new Set(data.productos.map(p => p.marca))];
        const avgPrice = data.productos.reduce((sum, p) => sum + (p.precio || 0), 0) / data.productos.length;
        
        console.log('📈 Estadísticas:');
        console.log(`   - Categorías: ${categories.length}`);
        console.log(`   - Marcas: ${brands.length}`);
        console.log(`   - Precio promedio: €${avgPrice.toFixed(2)}`);
        
        // Verificar que las imágenes están disponibles
        const productsWithImages = data.productos.filter(p => p.imagen && p.imagen.startsWith('http'));
        console.log(`🖼️ Productos con imágenes: ${productsWithImages.length}/${data.productos.length}`);
        
        console.log('🎉 Test completado exitosamente!');
        
        return {
            success: true,
            data: data,
            stats: {
                totalProducts: data.productos.length,
                categories: categories.length,
                brands: brands.length,
                avgPrice: avgPrice,
                productsWithImages: productsWithImages.length
            }
        };
        
    } catch (error) {
        console.error('❌ Error en el test:', error);
        console.error('🔍 Detalles del error:', {
            message: error.message,
            stack: error.stack
        });
        
        return {
            success: false,
            error: error.message
        };
    }
}

// Función para test de conectividad básica
async function testConnectivity() {
    console.log('🌐 Probando conectividad básica...');
    
    try {
        const response = await fetch('https://httpbin.org/get');
        if (response.ok) {
            console.log('✅ Conectividad OK');
            return true;
        } else {
            console.log('⚠️ Conectividad limitada');
            return false;
        }
    } catch (error) {
        console.log('❌ Sin conectividad:', error.message);
        return false;
    }
}

// Función para test de CORS
async function testCORS() {
    console.log('🔒 Probando CORS...');
    
    try {
        const response = await fetch('https://firebasestorage.googleapis.com/v0/b/farmacia-9737f.firebasestorage.app/o/data%2Fproducts.json?alt=media&token=bd9be4f5-e908-49e5-8cf2-32e6c4cec290', {
            method: 'HEAD'
        });
        
        if (response.ok) {
            console.log('✅ CORS OK - Headers permitidos');
            console.log('📋 Headers CORS:', {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                'Content-Type': response.headers.get('Content-Type')
            });
            return true;
        } else {
            console.log('⚠️ CORS limitado');
            return false;
        }
    } catch (error) {
        console.log('❌ Error CORS:', error.message);
        return false;
    }
}

// Función principal que ejecuta todos los tests
async function runAllTests() {
    console.log('🚀 Ejecutando suite completa de tests...');
    console.log('='.repeat(50));
    
    // Test 1: Conectividad
    const connectivity = await testConnectivity();
    console.log('='.repeat(50));
    
    // Test 2: CORS
    const cors = await testCORS();
    console.log('='.repeat(50));
    
    // Test 3: Carga de datos
    const dataTest = await testFirebaseStorageSimple();
    console.log('='.repeat(50));
    
    // Resumen final
    console.log('📋 RESUMEN DE TESTS:');
    console.log(`   🌐 Conectividad: ${connectivity ? '✅' : '❌'}`);
    console.log(`   🔒 CORS: ${cors ? '✅' : '❌'}`);
    console.log(`   📦 Datos: ${dataTest.success ? '✅' : '❌'}`);
    
    if (dataTest.success) {
        console.log('🎉 ¡Todos los tests pasaron! La aplicación debería funcionar correctamente.');
    } else {
        console.log('⚠️ Algunos tests fallaron. Revisa los errores arriba.');
    }
    
    return {
        connectivity,
        cors,
        dataTest
    };
}

// Exportar funciones para uso en consola
if (typeof window !== 'undefined') {
    window.testFirebaseStorage = testFirebaseStorageSimple;
    window.testConnectivity = testConnectivity;
    window.testCORS = testCORS;
    window.runAllTests = runAllTests;
}

// Si se ejecuta directamente (Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        testFirebaseStorageSimple,
        testConnectivity,
        testCORS,
        runAllTests
    };
}

console.log('📝 Tests disponibles:');
console.log('   - testFirebaseStorageSimple() - Test básico de carga de datos');
console.log('   - testConnectivity() - Test de conectividad');
console.log('   - testCORS() - Test de CORS');
console.log('   - runAllTests() - Ejecutar todos los tests');
console.log('');
console.log('💡 Ejecuta runAllTests() para probar todo automáticamente');
