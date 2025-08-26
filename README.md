# 🏥 Farmacia Contreras Alarcón - Catálogo Online

Una página web moderna y completamente responsive para mostrar el catálogo de productos de una farmacia, con funcionalidad de carrito de compras y envío de pedidos por WhatsApp.

## ✨ Características Principales

### 🎨 Diseño y Branding
- **Logo SVG personalizado**: Diseño único con elementos de salud y farmacia
- **Colores corporativos**: Esquema de colores profesional y atractivo
- **Tipografía moderna**: Fuentes legibles y profesionales

### 📱 Diseño Responsive
- **Adaptable a todos los dispositivos**: PC, tablet y móvil
- **Breakpoints optimizados**: 1024px, 768px y 480px
- **Navegación táctil**: Optimizada para dispositivos móviles
- **Modo oscuro**: Soporte automático para preferencias del sistema

### 🛒 Funcionalidades del Carrito
- Añadir/eliminar productos
- Modificar cantidades
- Cálculo automático del total
- Persistencia en localStorage
- Envío directo por WhatsApp

### 🔍 Sistema de Búsqueda y Filtros
- **Menú lateral de filtros**: Accesible desde el botón de tres rayas
- **Búsqueda en tiempo real**: Por nombre o descripción de productos
- **Filtrado por categorías**: Medicamentos, cuidado personal, vitaminas, dermatología
- **Ordenamiento avanzado**: Por nombre (A-Z, Z-A) y precio (menor a mayor, mayor a menor)
- **Filtro de precios**: Control deslizante para establecer rango máximo de precios
- **Botón limpiar filtros**: Para resetear todos los filtros aplicados

### 📱 Experiencia Móvil Mejorada
- Carrito de pantalla completa en móviles
- Notificaciones adaptadas al dispositivo
- Botones táctiles optimizados
- Navegación con gestos

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno
- Conexión a internet (para Font Awesome)

### Instalación
1. Descarga todos los archivos en una carpeta
2. Abre `index.html` en tu navegador
3. ¡Listo para usar!

### Estructura de Archivos
```
paginaFarmacia/
├── index.html          # Página principal
├── styles.css          # Estilos CSS responsive
├── script.js           # Funcionalidad JavaScript
├── config.js           # Configuración de la farmacia
├── logo-farmacia.svg   # Logo SVG personalizado
└── README.md           # Este archivo
```

## ⚙️ Configuración

### Personalizar Información de la Farmacia
Edita `config.js` para cambiar:
- Nombre de la farmacia
- Número de teléfono
- Email y dirección
- Horarios de atención

### Personalizar Productos
Modifica el array `products` en `script.js` para:
- Añadir nuevos productos
- Cambiar precios y descripciones
- Modificar categorías
- Personalizar iconos

## 🎨 Personalización

### Colores y Tema
Los colores principales se pueden modificar en `styles.css`:
- Gradientes del header y botones
- Colores de productos y carrito
- Esquema de colores general

### Tipografía
La página usa la fuente del sistema por defecto, pero puedes cambiar a Google Fonts o cualquier otra fuente web.

## 📱 Características Responsive

### Breakpoints Implementados
- **Desktop (>1024px)**: Layout completo con sidebar del carrito
- **Tablet (768px-1024px)**: Grid adaptado, carrito más pequeño
- **Móvil (<768px)**: Layout de una columna, carrito de pantalla completa

### Optimizaciones Móviles
- Botones más grandes para dedos
- Espaciado optimizado para pantallas pequeñas
- Navegación simplificada
- Gestos táctiles mejorados

## ♿ Accesibilidad

### Características Implementadas
- Etiquetas ARIA para lectores de pantalla
- Navegación por teclado
- Contraste de colores optimizado
- Textos alternativos para iconos
- Estructura semántica HTML5

### Soporte para Lectores de Pantalla
- Roles ARIA apropiados
- Estados dinámicos anunciados
- Navegación por landmarks

## 🔧 Funcionalidades Técnicas

### JavaScript
- ES6+ compatible
- Manejo de eventos optimizado
- Gestión de estado del carrito
- Notificaciones dinámicas
- Persistencia de datos

### CSS
- Grid y Flexbox modernos
- Animaciones CSS3
- Variables CSS para consistencia
- Media queries avanzados

### HTML
- Estructura semántica
- Meta tags optimizados
- Favicon integrado
- Enlaces de contacto funcionales

## 📞 Integración con WhatsApp

### Funcionalidad
- Generación automática de mensajes
- Formato profesional del pedido
- Inclusión de totales y cantidades
- Enlace directo a WhatsApp Web/App

### Formato del Mensaje
```
🛒 PEDIDO DE FARMACIA SALUD

Hola, me gustaría hacer el siguiente pedido:

1. [Nombre del Producto]
   Cantidad: X
   Precio: $X.XX
   Subtotal: $X.XX

💰 TOTAL: $X.XX

Por favor, confírmenme la disponibilidad y el tiempo de entrega.
Gracias! 🙏
```

## 🎯 Casos de Uso

### Para Farmacias
- Mostrar catálogo de productos
- Permitir pedidos online
- Facilitar comunicación con clientes
- Reducir tiempo de atención presencial

### Para Clientes
- Explorar productos disponibles
- Comparar precios
- Hacer pedidos desde casa
- Comunicación directa con la farmacia

## 🚀 Mejoras Futuras

### Funcionalidades Planificadas
- [ ] Sistema de usuarios y cuentas
- [ ] Historial de pedidos
- [ ] Notificaciones push
- [ ] Pago online
- [ ] Sistema de reseñas
- [ ] Chat en vivo
- [ ] Geolocalización
- [ ] Modo offline

### Optimizaciones Técnicas
- [ ] Service Worker para PWA
- [ ] Lazy loading de imágenes
- [ ] Compresión de assets
- [ ] CDN para recursos externos
- [ ] Analytics y métricas

## 📄 Licencia

Este proyecto está disponible para uso personal y comercial. Se recomienda personalizar la información y branding según las necesidades específicas de cada farmacia.

## 🤝 Soporte

Para dudas o sugerencias:
- Revisa la documentación
- Verifica la consola del navegador
- Asegúrate de que todos los archivos estén presentes

---

**Desarrollado con ❤️ para farmacias que quieren digitalizarse**

*Última actualización: Diciembre 2024*
