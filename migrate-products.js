// Script para migrar productos de ejemplo a Firebase
// Ejecutar en el navegador después de cargar Firebase

const exampleProducts = [
    {
        Nombre: "Physiopure - Gel espuma",
        Descripcion: "Productos limpiadores y desmaquillantes que oxigenan la piel",
        Precio: 18.90,
        Tipo: "cuidado-personal",
        Marca: "Physiopure",
        ruta_imagen: "fotosCatalogo/Physiopure - Gel espuma - Productos limpiadores y desmaquillantes que oxigenan la piel - 18,90e.png",
        stock: 10,
        active: true
    },
    {
        Nombre: "Sebiaclear - Gel espumoso",
        Descripcion: "Piel propensa al acné",
        Precio: 18.90,
        Tipo: "dermatologia",
        Marca: "Sebiaclear",
        ruta_imagen: "fotosCatalogo/Sebiaclear - Gel espumoso - Piel propensa al acné - 18,90e.png",
        stock: 15,
        active: true
    },
    {
        Nombre: "Sensifine - Bálsamo desmaquillante",
        Descripcion: "Pieles sensibles, reactivas e intolerantes",
        Precio: 17.90,
        Tipo: "cuidado-personal",
        Marca: "Sensifine",
        ruta_imagen: "fotosCatalogo/Sensifine - Bálsamo desmaquillante - Pieles sensibles, reactivas e intolerantes 17,90e.png",
        stock: 12,
        active: true
    },
    {
        Nombre: "Topialyse - Aceite limpiador",
        Descripcion: "Piel muy seca a atópica",
        Precio: 22.90,
        Tipo: "dermatologia",
        Marca: "Topialyse",
        ruta_imagen: "fotosCatalogo/Topialyse - Aceite limpiador - Piel muy seca a atópica 22.90e.png",
        stock: 8,
        active: true
    },
    {
        Nombre: "Paracetamol 500mg",
        Descripcion: "Analgésico y antipirético para aliviar el dolor y reducir la fiebre",
        Precio: 5.99,
        Tipo: "medicamentos",
        Marca: "Genérico",
        ruta_imagen: "💊",
        stock: 50,
        active: true
    },
    {
        Nombre: "Ibuprofeno 400mg",
        Descripcion: "Antiinflamatorio no esteroideo para aliviar el dolor y la inflamación",
        Precio: 6.50,
        Tipo: "medicamentos",
        Marca: "Genérico",
        ruta_imagen: "💊",
        stock: 45,
        active: true
    },
    {
        Nombre: "Vitamina C 1000mg",
        Descripcion: "Suplemento vitamínico para fortalecer el sistema inmunológico",
        Precio: 12.99,
        Tipo: "vitaminas",
        Marca: "Genérico",
        ruta_imagen: "🍊",
        stock: 30,
        active: true
    }
];

// Función para migrar productos
async function migrateProducts() {
    try {
        console.log('🚀 Iniciando migración de productos...');
        
        if (!window.productsCollection) {
            throw new Error('Firebase no está disponible. Asegúrate de que la página esté cargada.');
        }
        
        let successCount = 0;
        let errorCount = 0;
        
        for (const product of exampleProducts) {
            try {
                // Agregar timestamp
                const productWithTimestamp = {
                    ...product,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                
                // Agregar a Firestore
                const docRef = await productsCollection.add(productWithTimestamp);
                console.log(`✅ Producto agregado: ${product.Nombre} (ID: ${docRef.id})`);
                successCount++;
                
            } catch (error) {
                console.error(`❌ Error al agregar ${product.name}:`, error);
                errorCount++;
            }
        }
        
        console.log(`\n🎉 Migración completada:`);
        console.log(`✅ Productos agregados exitosamente: ${successCount}`);
        if (errorCount > 0) {
            console.log(`❌ Errores: ${errorCount}`);
        }
        
        // Recargar productos en la página
        if (typeof loadProductsFromFirebase === 'function') {
            await loadProductsFromFirebase();
        }
        
    } catch (error) {
        console.error('❌ Error durante la migración:', error);
    }
}

// Función para limpiar todos los productos (¡CUIDADO!)
async function clearAllProducts() {
    try {
        console.log('⚠️ ADVERTENCIA: Esto eliminará TODOS los productos de la base de datos');
        
        if (!confirm('¿Estás seguro de que quieres eliminar TODOS los productos? Esta acción no se puede deshacer.')) {
            console.log('Operación cancelada por el usuario');
            return;
        }
        
        const snapshot = await productsCollection.get();
        const batch = window.db.batch();
        
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        
        await batch.commit();
        console.log(`✅ Se eliminaron ${snapshot.size} productos`);
        
    } catch (error) {
        console.error('❌ Error al limpiar productos:', error);
    }
}

// Función para mostrar productos existentes
async function showExistingProducts() {
    try {
        console.log('📋 Mostrando productos existentes...');
        
        const snapshot = await productsCollection.get();
        
        if (snapshot.empty) {
            console.log('📭 No hay productos en la base de datos');
            return;
        }
        
        console.log(`📦 Productos encontrados: ${snapshot.size}`);
        
        snapshot.docs.forEach(doc => {
            const product = doc.data();
            console.log(`- ${product.Nombre || product.name || 'Sin nombre'} (ID: ${doc.id}) - €${product.Precio || product.price || 0}`);
        });
        
    } catch (error) {
        console.error('❌ Error al mostrar productos:', error);
    }
}

// Exportar funciones al scope global
window.migrateProducts = migrateProducts;
window.clearAllProducts = clearAllProducts;
window.showExistingProducts = showExistingProducts;

console.log('🔄 Script de migración cargado. Funciones disponibles:');
console.log('- migrateProducts() - Agregar productos de ejemplo');
console.log('- clearAllProducts() - Eliminar todos los productos (¡CUIDADO!)');
console.log('- showExistingProducts() - Mostrar productos existentes');
console.log('\n💡 Ejecuta migrateProducts() para agregar productos de ejemplo');
