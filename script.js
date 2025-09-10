// Array de productos (se cargará desde JSON)
let products = [];

// Carrito de compras
let cart = [];

// Elementos del DOM (se inicializarán cuando se cargue la página)
let productsGrid, cartSidebar, cartOverlay, cartItems, cartCount, cartTotal;
let searchInput, categoryFilter, sortFilter, priceRange, priceValue;
let filtersSidebar, filtersOverlay, backToTopBtn;

// Función para cargar productos desde Firebase Storage
async function loadProductsFromJSON() {
    try {
        console.log('🔄 Cargando productos desde Firebase Storage...');
        
        // URL del archivo JSON a través del proxy local
        const firebaseStorageURL = '/products.json';
        
        console.log('📁 Cargando desde:', firebaseStorageURL);
        
        // Descargar el contenido del JSON directamente desde Firebase Storage
        const response = await fetch(firebaseStorageURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        products = data.productos || [];
        
        // Mapear los campos en español a los campos que espera la aplicación
        products = products.map((product, index) => ({
            id: (index + 1).toString(),
            name: product.nombre || 'Sin nombre',
            description: product.descripcion || 'Sin descripción',
            price: product.precio || 0,
            category: product.categoria || 'Sin categoría',
            brand: product.marca || 'Sin marca',
            image: product.imagen || '💊'
        }));
        
        console.log(`✅ Productos cargados exitosamente desde Firebase Storage: ${products.length}`);
        displayProducts(products);
        updateCartCount();
        
        // Mostrar mensaje de éxito en la consola
        if (products.length > 0) {
            console.log('📦 Productos disponibles:', products.map(p => p.name));
        } else {
            console.log('⚠️ No se encontraron productos en el JSON');
        }
        
    } catch (error) {
        console.error('❌ Error al cargar productos desde Firebase Storage:', error);
        
        // Cargar productos de ejemplo como fallback
        console.log('🔄 Cargando productos de ejemplo como fallback...');
        loadExampleProducts();
    }
}

// Función para cargar productos de ejemplo (fallback)
function loadExampleProducts() {
    products = [
        {
            id: "1",
            name: "Paracetamol 500mg",
            description: "Analgésico y antipirético para aliviar el dolor y reducir la fiebre",
            price: 5.99,
            category: "medicamentos",
            brand: "Genérico",
            image: "💊"
        },
        {
            id: "2",
            name: "Ibuprofeno 400mg",
            description: "Antiinflamatorio no esteroideo para aliviar el dolor y la inflamación",
            price: 6.50,
            category: "medicamentos",
            brand: "Genérico",
            image: "💊"
        },
        {
            id: "3",
            name: "Vitamina C 1000mg",
            description: "Suplemento vitamínico para fortalecer el sistema inmunológico",
            price: 12.99,
            category: "vitaminas",
            brand: "Genérico",
            image: "🍊"
        }
    ];
    displayProducts(products);
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar elementos del DOM
    productsGrid = document.getElementById('productsGrid');
    cartSidebar = document.getElementById('cartSidebar');
    cartOverlay = document.getElementById('cartOverlay');
    cartItems = document.getElementById('cartItems');
    cartCount = document.getElementById('cartCount');
    cartTotal = document.getElementById('cartTotal');
    searchInput = document.getElementById('searchInput');
    categoryFilter = document.getElementById('categoryFilter');
    sortFilter = document.getElementById('sortFilter');
    priceRange = document.getElementById('priceRange');
    priceValue = document.getElementById('priceValue');
    filtersSidebar = document.getElementById('filtersSidebar');
    filtersOverlay = document.getElementById('filtersOverlay');
    backToTopBtn = document.getElementById('backToTop');
    
    // Cargar productos desde JSON
    loadProductsFromJSON();
    
    // Cargar carrito desde localStorage
    loadCartFromStorage();
    
    // Actualizar visualización del carrito
    updateCartDisplay();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Configurar scroll listener
    setupScrollListener();
    
    // Inicializar el header
    handleHeaderScroll();
    
    // Actualizar contador del carrito
    updateCartCount();
});

// Configurar event listeners
function setupEventListeners() {
    // Verificar que los elementos existan antes de agregar event listeners
    if (cartOverlay) {
        cartOverlay.addEventListener('click', toggleCart);
    }
    
    // Cerrar carrito con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (cartSidebar && cartSidebar.classList.contains('open')) {
                toggleCart();
            }
            if (filtersSidebar && filtersSidebar.classList.contains('open')) {
                toggleFiltersMenu();
            }
        }
    });
    
    // Cerrar carrito al hacer clic fuera en dispositivos móviles
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            cartSidebar && !cartSidebar.contains(e.target) && 
            !e.target.closest('.cart-icon') && 
            cartSidebar.classList.contains('open')) {
            toggleCart();
        }
        
        if (window.innerWidth <= 768 && 
            filtersSidebar && !filtersSidebar.contains(e.target) && 
            !e.target.closest('.menu-toggle') && 
            filtersSidebar.classList.contains('open')) {
            toggleFiltersMenu();
        }
    });
    
    // Mejorar experiencia táctil en dispositivos móviles
    if ('ontouchstart' in window) {
        setupTouchEvents();
    }
}

// Configurar eventos táctiles
function setupTouchEvents() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Configurar listener de scroll para el botón flotante
function setupScrollListener() {
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
    }
}

// Función para volver arriba
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Mostrar productos en la cuadrícula
function displayProducts(productsToShow) {
    if (!productsGrid) {
        console.error('productsGrid no encontrado');
        return;
    }
    
    productsGrid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #7f8c8d;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>No se encontraron productos</h3>
                <p>Intenta con otros términos de búsqueda o categorías</p>
            </div>
        `;
        return;
    }
    
    productsToShow.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;
        productCard.innerHTML = `
            <div class="product-image">
                ${product.image && product.image.startsWith('http') ? 
                    `<img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" onload="this.nextElementSibling.style.display='none';">` : 
                    ''
                }
                <div style="display: ${product.image && product.image.startsWith('http') ? 'none' : 'block'}; font-size: 4rem; color: #ccc;">
                    ${product.image || '💊'}
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-details">
                    <span class="product-category">${getCategoryDisplayName(product.category)}</span>
                    ${product.brand ? `<span class="product-brand">${product.brand}</span>` : ''}
                </div>
                <div class="product-price">€${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart('${product.id}')" aria-label="Añadir ${product.name} al carrito">
                    <i class="fas fa-cart-plus"></i> Añadir al Carrito
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    
    // Reconfigurar eventos táctiles si es necesario
    if ('ontouchstart' in window) {
        setupTouchEvents();
    }
}

// Obtener nombre de categoría para mostrar
function getCategoryDisplayName(category) {
    const categoryNames = {
        'medicamentos': 'Medicamentos',
        'cuidado-personal': 'Cuidado Personal',
        'vitaminas': 'Vitaminas',
        'dermatologia': 'Dermatología',
        'Contorno de ojos': 'Contorno de Ojos',
        'Antiestrés': 'Antiestrés',
        'Cuidado Personal': 'Cuidado Personal'
    };
    return categoryNames[category] || category;
}

// Filtrar productos
function filterProducts() {
    // Obtener el término de búsqueda del header o del sidebar de filtros
    const headerSearchInput = document.getElementById('headerSearchInput');
    const filtersSearchInput = document.getElementById('searchInput');
    
    const searchTerm = (headerSearchInput ? headerSearchInput.value : '') || 
                      (filtersSearchInput ? filtersSearchInput.value : '');
    
    const selectedCategory = categoryFilter ? categoryFilter.value : '';
    const selectedSort = sortFilter ? sortFilter.value : '';
    const maxPrice = priceRange ? parseFloat(priceRange.value) : 50;
    
    let filteredProducts = products.filter(product => {
        const matchesSearch = !searchTerm || 
                            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        const matchesPrice = product.price <= maxPrice;
        
        return matchesSearch && matchesCategory && matchesPrice;
    });
    
    // Aplicar ordenamiento
    if (selectedSort) {
        filteredProducts.sort((a, b) => {
            switch (selectedSort) {
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                default:
                    return 0;
            }
        });
    }
    
    displayProducts(filteredProducts);
}

// Añadir producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCartToStorage();
    updateCartDisplay();
    
    // Mostrar notificación
    showNotification(`${product.name} añadido al carrito`);
    
    // En dispositivos móviles, mostrar el carrito brevemente
    if (window.innerWidth <= 768) {
        showCartBriefly();
    }
}

// Mostrar carrito brevemente en móviles
function showCartBriefly() {
    if (!cartSidebar.classList.contains('open')) {
        toggleCart();
        setTimeout(() => {
            if (cartSidebar.classList.contains('open')) {
                toggleCart();
            }
        }, 2000);
    }
}

// Remover producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartDisplay();
}

// Actualizar cantidad de un producto
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCartToStorage();
        updateCartDisplay();
    }
}

// Actualizar visualización del carrito
function updateCartDisplay() {
    // Actualizar contador del carrito
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Actualizar items del carrito
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #7f8c8d; margin-top: 2rem;">El carrito está vacío</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    ${item.image && item.image.startsWith('http') ? 
                        `<img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" onload="this.nextElementSibling.style.display='none';">` : 
                        ''
                    }
                    <div style="display: ${item.image && item.image.startsWith('http') ? 'none' : 'block'}; font-size: 1.2rem; color: white;">
                        ${item.image || '💊'}
                    </div>
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">€${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)" aria-label="Reducir cantidad de ${item.name}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)" aria-label="Aumentar cantidad de ${item.name}">+</button>
                </div>
                <button class="quantity-btn" onclick="removeFromCart('${item.id}')" style="background: #ff4757; color: white;" aria-label="Eliminar ${item.name} del carrito">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    
    // Actualizar total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `€${total.toFixed(2)}`;
}

// Mostrar/ocultar carrito
function toggleCart() {
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('open');
    
    // Mejorar experiencia en móviles
    if (window.innerWidth <= 768) {
        document.body.style.overflow = cartSidebar.classList.contains('open') ? 'hidden' : '';
        
        // En móviles, el carrito ocupa toda la pantalla
        if (cartSidebar.classList.contains('open')) {
            cartSidebar.style.right = '0';
        } else {
            cartSidebar.style.right = '-100%';
        }
    } else {
        document.body.style.overflow = cartSidebar.classList.contains('open') ? 'hidden' : '';
    }
    
    // Actualizar aria-hidden para accesibilidad
    cartSidebar.setAttribute('aria-hidden', !cartSidebar.classList.contains('open'));
}

// Función para abrir/cerrar menú de filtros
function toggleFiltersMenu() {
    filtersSidebar.classList.toggle('open');
    filtersOverlay.classList.toggle('open');
    
    // Mejorar experiencia en móviles
    if (window.innerWidth <= 768) {
        document.body.style.overflow = filtersSidebar.classList.contains('open') ? 'hidden' : '';
        
        // En móviles, el menú ocupa toda la pantalla
        if (filtersSidebar.classList.contains('open')) {
            filtersSidebar.style.right = '0';
        } else {
            filtersSidebar.style.right = '-100%';
        }
    }
    
    // Actualizar aria-hidden para accesibilidad
    filtersSidebar.setAttribute('aria-hidden', !filtersSidebar.classList.contains('open'));
}

// Función para abrir/cerrar menú principal
function toggleMainMenu() {
    const mainMenuSidebar = document.getElementById('mainMenuSidebar');
    const mainMenuOverlay = document.getElementById('mainMenuOverlay');
    
    mainMenuSidebar.classList.toggle('open');
    mainMenuOverlay.classList.toggle('open');
    
    // Mejorar experiencia en móviles
    if (window.innerWidth <= 768) {
        document.body.style.overflow = mainMenuSidebar.classList.contains('open') ? 'hidden' : '';
        
        // En móviles, el menú ocupa toda la pantalla
        if (mainMenuSidebar.classList.contains('open')) {
            mainMenuSidebar.style.left = '0';
        } else {
            mainMenuSidebar.style.left = '-100%';
        }
    }
    
    // Actualizar aria-hidden para accesibilidad
    mainMenuSidebar.setAttribute('aria-hidden', !mainMenuSidebar.classList.contains('open'));
}

// Función para expandir/contraer submenús
function toggleSubmenu(button) {
    const menuItem = button.closest('.menu-item');
    const icon = button.querySelector('i');
    
    // Cambiar el icono de + a - y viceversa
    if (icon.classList.contains('fa-plus')) {
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
        menuItem.classList.add('expanded');
    } else {
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
        menuItem.classList.remove('expanded');
    }
    
    // Aquí puedes agregar lógica para mostrar/ocultar submenús
    // Por ejemplo, mostrar productos de esa categoría
    const category = menuItem.querySelector('.menu-text').textContent.toLowerCase();
    console.log(`Categoría seleccionada: ${category}`);
}

// Función para actualizar el rango de precios
function updatePriceRange() {
    const value = priceRange.value;
    priceValue.textContent = `€0 - €${value}`;
    filterProducts();
}

// Función para limpiar todos los filtros
function clearFilters() {
    searchInput.value = '';
    categoryFilter.value = '';
    sortFilter.value = '';
    priceRange.value = 50;
    priceValue.textContent = '€0 - €50';
    filterProducts();
    showNotification('Filtros limpiados');
}

// Vaciar carrito
function clearCart() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        cart = [];
        saveCartToStorage();
        updateCartDisplay();
        showNotification('Carrito vaciado');
    }
}

// Enviar carrito por WhatsApp
function sendToWhatsApp() {
    if (cart.length === 0) {
        showNotification('El carrito está vacío');
        return;
    }
    
    const phoneNumber = '+34636363611'; // Número de la farmacia
    const message = formatCartForWhatsApp();
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Formatear carrito para WhatsApp
function formatCartForWhatsApp() {
    let message = `🛒 *PEDIDO DE FARMACIA SALUD*\n\n`;
    message += `Hola, me gustaría hacer el siguiente pedido:\n\n`;
    
    cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}*\n`;
        message += `   Cantidad: ${item.quantity}\n`;
        message += `   Precio: €${item.price.toFixed(2)}\n`;
        message += `   Subtotal: €${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `💰 *TOTAL: €${total.toFixed(2)}*\n\n`;
    message += `Por favor, confírmenme la disponibilidad y el tiempo de entrega.\n`;
    message += `Gracias! 🙏`;
    
    return message;
}

// Guardar carrito en localStorage
function saveCartToStorage() {
    localStorage.setItem('farmaciaCart', JSON.stringify(cart));
}

// Cargar carrito desde localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('farmaciaCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Mostrar notificación
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
        font-size: 0.9rem;
    `;
    notification.textContent = message;
    
    // Ajustar posición en móviles
    if (window.innerWidth <= 768) {
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateY(-100px);
            transition: transform 0.3s ease;
            max-width: none;
            font-weight: 500;
            font-size: 0.9rem;
            text-align: center;
        `;
    }
    
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        if (window.innerWidth <= 768) {
            notification.style.transform = 'translateY(0)';
        } else {
            notification.style.transform = 'translateX(0)';
        }
    }, 100);
    
    // Ocultar y remover notificación
    setTimeout(() => {
        if (window.innerWidth <= 768) {
            notification.style.transform = 'translateY(-100px)';
        } else {
            notification.style.transform = 'translateX(400px)';
        }
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Función para manejar el scroll del header
function handleHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Usar requestAnimationFrame para evitar parpadeos
    requestAnimationFrame(() => {
        if (scrollTop > 20) {
            if (!header.classList.contains('scrolled')) {
                header.classList.add('scrolled');
            }
        } else {
            if (header.classList.contains('scrolled')) {
                header.classList.remove('scrolled');
            }
        }
    });
}

// Event listener para el scroll con throttling para mejor rendimiento
let ticking = false;
function throttledScrollHandler() {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleHeaderScroll();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', throttledScrollHandler, { passive: true });

// Función para actualizar solo el contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}


