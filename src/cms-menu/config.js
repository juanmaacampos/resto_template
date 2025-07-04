// 🏪 PLANTILLA REUTILIZABLE - CONFIGURACIÓN PARA TIENDA/RESTAURANTE
// ⚠️ IMPORTANTE: Reemplaza TODOS los valores de ejemplo con tu configuración real

export const MENU_CONFIG = {
  // 🔥 Firebase Configuration (obtener desde Firebase Console)
  // 📝 Pasos: Firebase Console > Project Settings > General > Your apps > Config
  firebaseConfig: {
    apiKey: "AIzaSyDHi_a1trI35goPoKcNPUDBMOSLKjvZKyc",
    authDomain: "cms-menu-7b4a4.firebaseapp.com",
    projectId: "cms-menu-7b4a4",
    storageBucket: "cms-menu-7b4a4.firebasestorage.app",
    messagingSenderId: "509736809578",
    appId: "1:509736809578:web:15471af092f3b46392c613",
    measurementId: "G-X4F9XDEL13"
  },
  
  // 🆔 Business/Restaurant ID (UID del propietario en Firebase Auth)
  // 📝 Obtener ejecutando en consola: firebase.auth().currentUser.uid
  businessId: "0X2PjjSrO8hZmq2wZtREoKR9gej1",
  
  // 👁️ Configuración de Visibilidad de Items
  itemVisibility: {
    // Solo items visibles son mostrados a los clientes por defecto
    hideInvisibleItems: true,
    
    // Permitir a administradores ver items ocultos
    adminCanSeeHidden: true,
    
    // Campos que controlan la visibilidad en Firebase:
    // - isHidden: boolean (true = oculto del público)
    // - isAvailable: boolean (false = no disponible)
    // - stock: number (0 = sin stock, si trackStock es true)
  },

  // 💳 MercadoPago Configuration
  // 📝 Obtener desde: https://www.mercadopago.com/developers/panel/app
  mercadoPago: {
    publicKey: "APP_USR-aff124d3-9db8-432f-b97e-7cfd30fca245", // APP_USR-xxxxxxxxx format
    currency: "ARS", // ARS, USD, BRL, etc.
    enabled: true // Cambiar a false para deshabilitar pagos
  },
  
  // 🌐 URLs de tu aplicación
  baseUrl: "https://juanmaacampos.github.io/shop_template", // Tu GitHub Pages URL
  backendUrl: "https://us-central1-cms-menu-7b4a4.cloudfunctions.net", // Tu Cloud Functions URL
  backUrls: {
    success: "https://juanmaacampos.github.io/shop_template/#/payment/success",
    pending: "https://juanmaacampos.github.io/shop_template/#/payment/pending", 
    failure: "https://juanmaacampos.github.io/shop_template/#/payment/failure"
  },
  
  // 🧪 Testing/Development Configuration
  testing: {
    enabled: false, // Cambiar a true para modo desarrollo/testing
    showTestingPanel: false, // Mostrar panel de debug
    mockData: false // Usar datos de prueba
  },

  // 🎨 Template Type (cambiar según tu tipo de negocio)
  templateType: "store", // Opciones: "restaurant", "store", "cafe", "bakery", "pharmacy"
  
  // 🌍 Localization
  locale: "es-AR", // es-AR, es-MX, en-US, pt-BR, etc.
  timezone: "America/Argentina/Buenos_Aires"
};

// 🔧 Función para obtener el UID del business/restaurant
// 📋 INSTRUCCIONES PASO A PASO:
// 1. 🔥 Crea tu proyecto en Firebase Console (https://console.firebase.google.com)
// 2. 🛠️ Configura Authentication y Firestore Database
// 3. 🏪 Ve a tu CMS panel y haz login con la cuenta del business/restaurant
// 4. 🔍 Abre las herramientas de desarrollador (F12)
// 5. 💻 En la consola ejecuta: firebase.auth().currentUser.uid
// 6. 📋 Copia ese UID y reemplaza "YOUR_BUSINESS_UID_HERE" arriba

export function validateConfig() {
  const requiredFields = [
    { key: 'businessId', value: MENU_CONFIG.businessId, placeholder: 'YOUR_BUSINESS_UID_HERE' },
    { key: 'firebaseConfig.apiKey', value: MENU_CONFIG.firebaseConfig.apiKey, placeholder: 'YOUR_FIREBASE_API_KEY' },
    { key: 'firebaseConfig.projectId', value: MENU_CONFIG.firebaseConfig.projectId, placeholder: 'your-project-id' },
    { key: 'mercadoPago.publicKey', value: MENU_CONFIG.mercadoPago.publicKey, placeholder: 'YOUR_MERCADOPAGO_PUBLIC_KEY' }
  ];

  const missingConfig = requiredFields.filter(field => 
    field.value === field.placeholder || !field.value || field.value.includes('YOUR_')
  );

  if (missingConfig.length > 0) {
    console.warn("⚠️ CONFIGURACIÓN INCOMPLETA - PLANTILLA REUTILIZABLE");
    console.log("🔧 Faltan configurar los siguientes campos:");
    missingConfig.forEach(field => {
      console.log(`   ❌ ${field.key}: ${field.value}`);
    });
    console.log("\n📝 GUÍA COMPLETA DE CONFIGURACIÓN:");
    console.log("🔥 1. Firebase Setup:");
    console.log("   - Ve a https://console.firebase.google.com");
    console.log("   - Crea un nuevo proyecto");
    console.log("   - Configura Authentication y Firestore");
    console.log("   - Copia la configuración a firebaseConfig");
    console.log("\n💳 2. MercadoPago Setup:");
    console.log("   - Ve a https://www.mercadopago.com/developers/panel/app");
    console.log("   - Crea una nueva aplicación");
    console.log("   - Copia tu Public Key");
    console.log("\n🆔 3. Business ID:");
    console.log("   - Haz login en tu CMS como propietario");
    console.log("   - Ejecuta en consola: firebase.auth().currentUser.uid");
    console.log("   - Copia el UID obtenido");
    return false;
  }
  
  console.log("✅ Configuración completa y válida");
  return true;
}

// 🏪 TERMINOLOGÍA PERSONALIZABLE POR TIPO DE NEGOCIO
// 🎨 Cambia estos valores según tu tipo de negocio

export const STORE_TERMINOLOGY = {
  // 🏷️ Nombres del negocio
  businessName: "Anthony Burger", // Cambiar por el nombre real
  menuName: "Menu", // catálogo, menú, carta, productos
  menuNameCapitalized: "Nuestro MEnu", // Para títulos
  
  // 📦 Productos/Items
  items: "productos", // productos, platos, artículos, items
  itemsCapitalized: "Productos",
  addToCart: "Agregar al Carrito", // Agregar al Carrito, Pedir, Ordenar
  orderSummary: "Carrito de Compras", // Carrito, Pedido, Orden
  
  // 📂 Categorías
  categoriesOfMenu: "Categorías de Productos", // Personalizar según negocio
  featuredProducts: "Productos Destacados",
  allProducts: "Todos los Productos",
  
  // 🚚 Opciones de servicio (personalizar según tu negocio)
  serviceOptions: {
    delivery: "Envío a Domicilio", // Para tiendas online
    pickup: "Retiro en Local", // Para restaurantes/tiendas locales
    shipping: "Envío Nacional", // Para e-commerce
    dineIn: "Para Comer Aquí", // Solo para restaurantes
    takeaway: "Para Llevar" // Solo para restaurantes
  }
};

// 🎨 CONFIGURACIONES PREDEFINIDAS POR TIPO DE NEGOCIO
// Usa estas configuraciones como punto de partida

export const BUSINESS_TEMPLATES = {
  
  store: {
    businessName: "Mi Tienda",
    menuName: "catálogo",
    menuNameCapitalized: "Nuestro Menu",
    items: "platos",
    itemsCapitalized: "Platos",
    addToCart: "Agregar al Carrito",
    orderSummary: "Carrito de Compras",
    categoriesOfMenu: "Categorías de Platos",
    featuredProducts: "Platos Destacados",
    allProducts: "Todos los Platos",
    serviceOptions: {
      delivery: "Envío a Domicilio",
      pickup: "Retiro en Tienda",
      shipping: "Envío Nacional"
    }
  },
  
};

// 🔄 Función para aplicar configuración según tipo de negocio
export function applyBusinessTemplate(templateType = 'store') {
  if (BUSINESS_TEMPLATES[templateType]) {
    Object.assign(STORE_TERMINOLOGY, BUSINESS_TEMPLATES[templateType]);
    console.log(`✅ Aplicada configuración para: ${templateType}`);
  } else {
    console.warn(`⚠️ Tipo de negocio no reconocido: ${templateType}`);
    console.log(`📝 Tipos disponibles: ${Object.keys(BUSINESS_TEMPLATES).join(', ')}`);
  }
}

// 🚀 INICIALIZACIÓN AUTOMÁTICA
// Aplica la configuración según el templateType definido arriba
if (MENU_CONFIG.templateType && BUSINESS_TEMPLATES[MENU_CONFIG.templateType]) {
  applyBusinessTemplate(MENU_CONFIG.templateType);
}

//note
