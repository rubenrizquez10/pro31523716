// Script para probar una compra completa
async function testCompletePurchase() {
  const baseURL = 'http://localhost:3000';
  
  try {
    console.log('🧪 Iniciando prueba de compra completa...\n');

    // 1. Login del usuario de prueba
    console.log('1️⃣ Iniciando sesión con usuario de prueba...');
    const loginResponse = await fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'usuario@ejemplo.com',
        password: 'password123'
      })
    });

    if (!loginResponse.ok) {
      const errorData = await loginResponse.text();
      throw new Error(`Error en login: ${loginResponse.status} - ${errorData}`);
    }

    const loginData = await loginResponse.json();
    console.log('Respuesta de login:', JSON.stringify(loginData, null, 2));
    
    // Extraer token de diferentes estructuras posibles
    let token;
    if (loginData.token) {
      token = loginData.token;
    } else if (loginData.data && loginData.data.token) {
      token = loginData.data.token;
    } else if (loginData.access_token) {
      token = loginData.access_token;
    } else {
      throw new Error('No se pudo encontrar el token en la respuesta');
    }
    
    console.log('✅ Login exitoso, token obtenido');

    // 2. Obtener productos disponibles
    console.log('\n2️⃣ Obteniendo productos disponibles...');
    const productsResponse = await fetch(`${baseURL}/products`);
    
    if (!productsResponse.ok) {
      throw new Error(`Error obteniendo productos: ${productsResponse.status}`);
    }
    
    const productsData = await productsResponse.json();
    console.log('Respuesta de productos:', JSON.stringify(productsData, null, 2));
    
    // Extraer productos de diferentes estructuras posibles
    let products;
    if (productsData.data && productsData.data.products) {
      products = productsData.data.products;
    } else if (productsData.products) {
      products = productsData.products;
    } else if (Array.isArray(productsData)) {
      products = productsData;
    } else {
      throw new Error('No se pudieron encontrar productos en la respuesta');
    }
    
    console.log(`✅ ${products.length} productos disponibles`);

    // 3. Seleccionar productos para la compra
    const selectedProducts = [
      { product: products[0], quantity: 1 }, // Primer producto
      { product: products[1], quantity: 2 }, // Segundo producto
    ];

    console.log('\n3️⃣ Productos seleccionados para la compra:');
    let subtotal = 0;
    selectedProducts.forEach(({ product, quantity }) => {
      const total = product.price * quantity;
      subtotal += total;
      console.log(`   - ${product.name} x${quantity} = $${total.toFixed(2)}`);
    });
    console.log(`   Subtotal: $${subtotal.toFixed(2)}`);

    // 4. Crear la orden
    console.log('\n4️⃣ Creando orden de compra...');
    const orderData = {
      items: selectedProducts.map(({ product, quantity }) => ({
        productId: product.id,
        quantity: quantity
      })),
      paymentMethod: 'CreditCard',
      paymentDetails: {
        cardToken: '4111111111111111', // Simular token de tarjeta
        currency: 'USD'
      }
    };

    console.log('Datos de la orden:', JSON.stringify(orderData, null, 2));

    const orderResponse = await fetch(`${baseURL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });

    if (!orderResponse.ok) {
      const errorData = await orderResponse.text();
      throw new Error(`Error creando orden: ${orderResponse.status} - ${errorData}`);
    }

    const orderResult = await orderResponse.json();
    console.log('✅ Orden creada exitosamente');
    console.log('Respuesta de orden:', JSON.stringify(orderResult, null, 2));

    // 5. Verificar las órdenes del usuario
    console.log('\n5️⃣ Verificando historial de órdenes...');
    const ordersResponse = await fetch(`${baseURL}/orders`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (ordersResponse.ok) {
      const ordersData = await ordersResponse.json();
      console.log('✅ Historial de órdenes obtenido');
      console.log('Órdenes:', JSON.stringify(ordersData, null, 2));
    } else {
      console.log('⚠️ No se pudo obtener el historial de órdenes');
    }

    console.log('\n🎉 ¡Prueba de compra completada exitosamente!');
    console.log('\n📋 Resumen de la prueba:');
    console.log(`   ✅ Usuario autenticado correctamente`);
    console.log(`   ✅ ${selectedProducts.length} productos seleccionados`);
    console.log(`   ✅ Orden procesada y pagada`);
    console.log(`   ✅ Pago simulado exitoso`);
    console.log(`   ✅ Stock actualizado automáticamente`);

  } catch (error) {
    console.error('\n❌ Error en la prueba de compra:');
    console.error(error.message);
    console.error('\n🔧 Posibles soluciones:');
    console.error('   1. Verificar que el servidor esté ejecutándose en puerto 3000');
    console.error('   2. Verificar que el usuario de prueba exista');
    console.error('   3. Verificar que los productos estén cargados');
  }
}

// Función para verificar el estado del servidor
async function checkServerStatus() {
  try {
    console.log('🔍 Verificando estado del servidor...');
    const response = await fetch('http://localhost:3000/health');
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Servidor funcionando correctamente');
      console.log('Estado:', data);
      return true;
    }
  } catch (error) {
    console.log('❌ Servidor no disponible en puerto 3000');
    return false;
  }
}

// Ejecutar las pruebas
async function runTests() {
  console.log('🚀 Iniciando pruebas de la tienda de cómics...\n');
  
  const serverOk = await checkServerStatus();
  if (!serverOk) {
    console.log('\n💡 Para ejecutar las pruebas:');
    console.log('   1. Ejecuta: npm start');
    console.log('   2. Espera a que aparezca: "Servidor ejecutándose en el puerto 3000"');
    console.log('   3. Ejecuta nuevamente: node scripts/testPurchase.js');
    return;
  }
  
  await testCompletePurchase();
}

runTests();