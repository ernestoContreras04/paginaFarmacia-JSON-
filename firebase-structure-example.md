# Estructura de la Base de Datos Firebase

## Colección: `products`

### Estructura de cada documento:

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

### Campos disponibles:

- **name** (string): Nombre del producto
- **description** (string): Descripción detallada
- **price** (number): Precio en euros
- **category** (string): Categoría del producto
- **brand** (string): Marca del producto
- **image** (string): Emoji o URL de imagen
- **type** (string): Tipo específico del producto
- **stock** (number): Cantidad disponible
- **active** (boolean): Si el producto está activo
- **createdAt** (timestamp): Fecha de creación

### Categorías sugeridas:

- medicamentos
- vitaminas
- dermatologia
- cuidado-personal
- higiene
- maternidad
- ortopedia
- nutricion

### Ejemplo de productos para cargar:

```javascript
// Ejemplo de 5 productos para probar
const sampleProducts = [
  {
    name: "Paracetamol 500mg",
    description: "Analgésico y antipirético para aliviar el dolor y reducir la fiebre",
    price: 5.99,
    category: "medicamentos",
    brand: "Genérico",
    image: "💊",
    type: "analgésico",
    stock: 100,
    active: true
  },
  {
    name: "Vitamina D3 1000UI",
    description: "Suplemento de vitamina D para la salud ósea y sistema inmunológico",
    price: 15.99,
    category: "vitaminas",
    brand: "Solgar",
    image: "☀️",
    type: "vitamina",
    stock: 75,
    active: true
  },
  {
    name: "Protector Solar SPF 50+",
    description: "Protector solar de alta protección para todo tipo de piel",
    price: 22.99,
    category: "dermatologia",
    brand: "La Roche-Posay",
    image: "🌞",
    type: "protector solar",
    stock: 50,
    active: true
  }
];
```

## Pasos para configurar Firebase:

1. Crear proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilitar Firestore Database
3. Configurar reglas de seguridad
4. Copiar la configuración al archivo `firebase-config.js`
5. Crear la colección `products`
6. Cargar los productos usando la consola de Firebase o un script de migración
