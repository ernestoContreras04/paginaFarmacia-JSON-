# 🔧 Solución para Problemas de Firebase

## 📋 Problema Identificado

Tu aplicación está experimentando errores de conexión con Firebase Firestore:
- Errores 400 (Bad Request) al intentar conectar con Firestore
- Problemas con WebChannelConnection RPC
- No se pueden cargar productos desde la base de datos

## 🚀 Soluciones Implementadas

### 1. ✅ Configuración Mejorada de Firebase
- Se ha mejorado `firebase-config.js` con mejor manejo de errores
- Se agregó logging detallado para diagnosticar problemas
- Se implementó fallback automático a productos de ejemplo

### 2. ✅ Script Principal Mejorado
- Se mejoró `script.js` con mejor manejo de errores de Firebase
- Se agregó logging detallado del proceso de carga
- Se implementó verificación de disponibilidad de Firebase

### 3. ✅ Página de Diagnóstico
- Se creó `test-firebase-debug.html` para diagnosticar problemas paso a paso
- Permite probar cada componente de Firebase por separado

## 🔍 Pasos para Diagnosticar

### Paso 1: Abrir la Página de Diagnóstico
```bash
# Abrir en tu navegador
test-firebase-debug.html
```

### Paso 2: Ejecutar Tests en Orden
1. **Probar Conexión Firebase** - Verifica que Firebase SDK esté cargado
2. **Probar Firestore** - Verifica conexión a Firestore
3. **Probar Acceso a Colección** - Verifica permisos de lectura
4. **Cargar Productos** - Intenta cargar productos reales

## 🛠️ Posibles Causas y Soluciones

### Causa 1: Reglas de Seguridad de Firestore
**Problema:** Las reglas de Firestore pueden estar bloqueando el acceso público.

**Solución:** 
1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Selecciona tu proyecto `farmacia-9737f`
3. Ve a Firestore Database → Rules
4. Asegúrate de que las reglas permitan lectura pública:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /productos/{productId} {
      allow read: if true;  // Permitir lectura pública
      allow write: if false; // Solo admin puede escribir
    }
  }
}
```

### Causa 2: Proyecto Firebase No Configurado
**Problema:** El proyecto Firebase puede no estar activo o configurado correctamente.

**Solución:**
1. Verifica que el proyecto esté activo en Firebase Console
2. Asegúrate de que Firestore esté habilitado
3. Verifica que la API Key sea correcta

### Causa 3: Problemas de Red o CORS
**Problema:** Puede haber problemas de conectividad o CORS.

**Solución:**
1. Verifica tu conexión a internet
2. Intenta desde un navegador diferente
3. Verifica que no haya bloqueadores de anuncios activos

## 📱 Productos de Ejemplo (Fallback)

Si Firebase no funciona, la aplicación cargará automáticamente estos productos de ejemplo:
- Paracetamol 500mg - €5.99
- Ibuprofeno 400mg - €6.50  
- Vitamina C 1000mg - €12.99

## 🔄 Cómo Probar la Solución

### Opción 1: Usar la Página Principal
1. Abre `index.html` en tu navegador
2. Abre la consola del navegador (F12)
3. Verifica que no haya errores de Firebase
4. Los productos deberían cargarse automáticamente

### Opción 2: Usar la Página de Diagnóstico
1. Abre `test-firebase-debug.html`
2. Ejecuta los tests en orden
3. Revisa los logs para identificar el problema específico

## 📞 Soporte Adicional

Si el problema persiste:
1. Revisa la consola del navegador para errores específicos
2. Verifica que tu proyecto Firebase esté activo
3. Confirma que las reglas de Firestore permitan lectura pública
4. Intenta desde un navegador diferente o modo incógnito

## 🎯 Estado Actual

- ✅ Configuración de Firebase mejorada
- ✅ Manejo de errores implementado
- ✅ Fallback a productos de ejemplo funcionando
- ✅ Logging detallado para diagnóstico
- ⚠️ Necesita verificar reglas de Firestore
- ⚠️ Necesita verificar estado del proyecto Firebase
