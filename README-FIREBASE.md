# Configuración de Firebase para la Farmacia

## 🚀 Configuración Inicial

### 1. Crear Proyecto en Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto"
3. Nombra tu proyecto (ej: "farmacia-web")
4. Sigue los pasos de configuración

### 2. Habilitar Firestore Database
1. En el panel izquierdo, haz clic en "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba" (para desarrollo)
4. Elige la ubicación más cercana a tus usuarios

### 3. Obtener Configuración
1. Haz clic en el ícono de configuración (⚙️) junto a "Vista general del proyecto"
2. Selecciona "Configuración del proyecto"
3. Baja hasta "Tus apps" y haz clic en "Web" (</>)
4. Registra tu app con un nombre (ej: "farmacia-web")
5. Copia la configuración que aparece

### 4. Configurar Archivos
✅ **¡Ya configurado!** Tu proyecto está configurado para: **farmacia-9737f**

El archivo `firebase-config.js` ya contiene tu configuración real:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyDnGAwyCaGqSxhDX8woS9nbR-1kGc5D360",
    authDomain: "farmacia-9737f.firebaseapp.com",
    projectId: "farmacia-9737f",
    storageBucket: "farmacia-9737f.firebasestorage.app",
    messagingSenderId: "265524327894",
    appId: "1:265524327894:web:2b8f935db21ddf24362077",
    measurementId: "G-T5V39CTSDF"
};
```

## 📊 Estructura de la Base de Datos

### Colección: `products`
Cada producto tendrá esta estructura:

```json
{
  "name": "Paracetamol 500mg",
  "description": "Analgésico y antipirético para aliviar el dolor y reducir la fiebre",
  "price": 5.99,
  "category": "medicamentos",
  "brand": "Genérico",
  "image": "💊",
  "type": "analgésico",
  "stock": 100,
  "active": true,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## 🔧 Cargar Productos de Ejemplo

### Opción 1: Usando el Script de Migración
1. Abre la consola del navegador (F12)
2. Ejecuta: `migrateProducts()`
3. Esto cargará 10 productos de ejemplo

### Opción 2: Desde Firebase Console
1. Ve a Firestore Database
2. Haz clic en "Iniciar colección"
3. ID de la colección: `products`
4. Agrega documentos manualmente con la estructura mostrada arriba

### Opción 3: Importar desde CSV/JSON
1. Prepara un archivo con tus 500 productos
2. Usa la función de importación de Firebase o
3. Crea un script personalizado para tu formato de datos

## 🎯 Funcionalidades Implementadas

- ✅ Carga automática de productos desde Firebase
- ✅ Fallback a productos de ejemplo si hay error
- ✅ Estructura de datos mejorada (nombre, descripción, precio, categoría, marca, imagen)
- ✅ Filtrado y búsqueda funcionando con la nueva estructura
- ✅ Carrito de compras compatible
- ✅ Diseño responsive optimizado

## 🚨 Solución de Problemas

### Error: "Firebase is not defined"
- Verifica que los scripts de Firebase estén cargados antes de `firebase-config.js`
- Asegúrate de que la configuración sea correcta

### Error: "productsCollection is not defined"
- Verifica que `firebase-config.js` se cargue antes que `script.js`
- Comprueba que la consola no muestre errores de Firebase

### Productos no se cargan
- Verifica las reglas de seguridad de Firestore
- Asegúrate de que la colección `products` exista
- Revisa la consola del navegador para errores

## 📱 Próximos Pasos

1. **Cargar tus 500 productos reales**
2. **Configurar imágenes reales** (reemplazar emojis)
3. **Implementar paginación** para manejar muchos productos
4. **Agregar filtros avanzados** por marca, tipo, precio
5. **Implementar búsqueda en tiempo real**
6. **Agregar sistema de inventario** (stock)
7. **Implementar autenticación** para administradores

## 🔒 Reglas de Seguridad Recomendadas

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{product} {
      allow read: if true;  // Cualquiera puede leer productos
      allow write: if false; // Solo administradores pueden escribir
    }
  }
}
```

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador
2. Verifica la configuración de Firebase
3. Comprueba que todos los archivos estén en el orden correcto
4. Asegúrate de que Firestore esté habilitado en tu proyecto

¡Tu farmacia web estará lista para manejar 500 productos desde Firebase! 🎉
