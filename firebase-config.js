// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDnGAwyCaGqSxhDX8woS9nbR-1kGc5D360",
    authDomain: "farmacia-9737f.firebaseapp.com",
    projectId: "farmacia-9737f",
    storageBucket: "farmacia-9737f.firebasestorage.app",
    messagingSenderId: "265524327894",
    appId: "1:265524327894:web:2b8f935db21ddf24362077",
    measurementId: "G-T5V39CTSDF"
};

// Inicializar Firebase con Firebase v9+ (modular)
let app, db, productsCollection;

async function initializeFirebase() {
    try {
        console.log('Inicializando Firebase...');
        
        // Importar Firebase v9+ (modular)
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
        const { getFirestore, collection } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        
        app = initializeApp(firebaseConfig);
        console.log('✅ Firebase app inicializado:', app.name);
        
        // Configurar Firestore con la base de datos 'farmacia'
        db = getFirestore(app, 'farmacia');
        console.log('✅ Firestore inicializado con base de datos "farmacia"');
        
        // Configurar colección de productos
        productsCollection = collection(db, 'productos');
        console.log('✅ Colección de productos configurada');
        
        // Exportar para usar en otros archivos
        window.db = db;
        window.productsCollection = productsCollection;
        window.firebaseApp = app;
        
        console.log('✅ Firebase configurado completamente');
        return true;
        
    } catch (error) {
        console.error('❌ Error al inicializar Firebase:', error);
        
        // Crear objetos mock para evitar errores en la aplicación
        window.db = {
            collection: () => ({
                get: async () => ({ docs: [] }),
                limit: () => ({ get: async () => ({ docs: [] }) })
            })
        };
        
        window.productsCollection = {
            get: async () => ({ docs: [] }),
            limit: () => ({ get: async () => ({ docs: [] }) })
        };
        
        window.firebaseApp = null;
        return false;
    }
}

// Inicializar Firebase cuando se cargue la página
document.addEventListener('DOMContentLoaded', initializeFirebase);
