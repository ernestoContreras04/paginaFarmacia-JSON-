# 🧪 Tests para Firebase Storage

## 📋 **Archivos de Test Creados**

### 1. **`test-firebase-storage.html`** - Test Visual Completo
- **Descripción**: Página web interactiva para probar la carga del JSON
- **Características**:
  - Interfaz visual con estadísticas
  - Muestra productos de ejemplo
  - Botones para diferentes acciones
  - Manejo de errores visual

### 2. **`test-simple.js`** - Test de Consola
- **Descripción**: Script JavaScript para ejecutar en consola
- **Características**:
  - Tests automatizados
  - Verificación de conectividad
  - Test de CORS
  - Estadísticas detalladas

## 🚀 **Cómo Usar los Tests**

### **Opción 1: Test Visual (Recomendado)**

1. **Abre el archivo en tu navegador**:
   ```
   http://localhost:8000/test-firebase-storage.html
   ```

2. **El test se ejecuta automáticamente** al cargar la página

3. **Usa los botones**:
   - 🔄 **Ejecutar Test** - Vuelve a ejecutar el test
   - 📄 **Ver JSON Completo** - Muestra el JSON completo
   - 📦 **Ver Productos** - Muestra todos los productos
   - 🗑️ **Limpiar** - Limpia los resultados

### **Opción 2: Test de Consola**

1. **Abre la consola del navegador** (F12)

2. **Ejecuta uno de estos comandos**:
   ```javascript
   // Test básico
   testFirebaseStorageSimple()
   
   // Test de conectividad
   testConnectivity()
   
   // Test de CORS
   testCORS()
   
   // Todos los tests
   runAllTests()
   ```

## 📊 **Qué Verifican los Tests**

### **Test de Conectividad**
- ✅ Verifica que hay conexión a internet
- ✅ Prueba acceso a servicios externos

### **Test de CORS**
- ✅ Verifica que Firebase Storage permite peticiones CORS
- ✅ Comprueba headers de respuesta
- ✅ Identifica problemas de permisos

### **Test de Carga de Datos**
- ✅ Carga el JSON desde Firebase Storage
- ✅ Verifica la estructura de datos
- ✅ Cuenta productos, categorías y marcas
- ✅ Calcula estadísticas (precio promedio, etc.)
- ✅ Verifica que las imágenes están disponibles

## 🎯 **Resultados Esperados**

### **Test Exitoso** ✅
```
🔄 Cargando datos desde Firebase Storage...
✅ Datos cargados exitosamente!
📊 Metadata: {fecha_generacion: "2025-09-09T19:23:56.141Z", ...}
📦 Total productos: 146
🎯 Primeros 3 productos:
1. Densitium - Contorno de ojos 15ml - €536.9 (Contorno de ojos)
2. Superlativa Daily - Electra - €29.9 (Antiestrés)
3. Sensifine - Bálsamo desmaquillante - €17.9 (Bálsamo desmaquillante)
📈 Estadísticas:
   - Categorías: 45
   - Marcas: 8
   - Precio promedio: €28.45
🖼️ Productos con imágenes: 146/146
🎉 Test completado exitosamente!
```

### **Test Fallido** ❌
```
❌ Error en el test: TypeError: Failed to fetch
🔍 Detalles del error: {
  message: "Failed to fetch",
  stack: "TypeError: Failed to fetch at ..."
}
```

## 🚨 **Solución de Problemas**

### **Error 404 - Archivo no encontrado**
- Verifica que el archivo existe en `/data/products.json`
- Comprueba que la URL es correcta
- Asegúrate de que el token es válido

### **Error de CORS**
- El archivo debe ser público para lectura
- Verifica las reglas de Firebase Storage
- Asegúrate de que el token permite acceso

### **Error de conectividad**
- Verifica tu conexión a internet
- Comprueba que no hay firewall bloqueando
- Prueba acceder a la URL directamente en el navegador

### **Error de parsing JSON**
- El archivo puede estar corrupto
- Verifica que el JSON es válido
- Comprueba la codificación del archivo

## 📝 **Comandos Útiles**

### **En la consola del navegador:**
```javascript
// Verificar que el servidor está funcionando
fetch('http://localhost:8000/').then(r => console.log('Servidor:', r.status))

// Probar la URL del JSON directamente
fetch('https://firebasestorage.googleapis.com/v0/b/farmacia-9737f.firebasestorage.app/o/data%2Fproducts.json?alt=media&token=bd9be4f5-e908-49e5-8cf2-32e6c4cec290')
  .then(r => r.json())
  .then(data => console.log('JSON cargado:', data))

// Ejecutar todos los tests
runAllTests()
```

## 🎉 **Resultado Final**

Si todos los tests pasan, tu aplicación debería funcionar perfectamente cargando los 146 productos desde Firebase Storage.

**¡Los tests te ayudarán a identificar y solucionar cualquier problema antes de que afecte a los usuarios!** 🚀
