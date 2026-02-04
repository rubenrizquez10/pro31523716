# 🛒 **DATOS DE EJEMPLO PARA COMPRAS - FUNCIONANDO ✅**

## 👤 **USUARIO DE PRUEBA (CREADO AUTOMÁTICAMENTE)**

```
📧 Email: usuario@ejemplo.com
🔐 Contraseña: password123
👤 Nombre Completo: Juan Pérez
```

## 💳 **INFORMACIÓN DE PAGO (PARA FRONTEND)**

```
💳 Número de Tarjeta: 4111111111111111
📅 Mes/Año: 12/25
🔒 CVV: 123
👤 Nombre en Tarjeta: Juan Perez
```

**Nota:** El backend usa un sistema de tokens, pero el frontend puede mostrar estos campos para la UX.

## 📦 **INFORMACIÓN DE ENVÍO**

```
🏠 Dirección: Calle Falsa 123
🏙️ Ciudad: Madrid
📮 Código Postal: 28001
🌍 País: España
📞 Teléfono: +34 600 123 456
```

## ✅ **ESTADO ACTUAL - TODO FUNCIONANDO**

- ✅ **Usuario de prueba**: Creado automáticamente al iniciar servidor
- ✅ **Login**: Funciona perfectamente con las credenciales
- ✅ **Productos**: 15 productos con stock 100 cada uno
- ✅ **Carrito**: Funciona correctamente
- ✅ **Checkout**: Procesa órdenes exitosamente
- ✅ **Pagos**: Sistema de pagos simulado funcionando
- ✅ **Historial**: Se guardan las órdenes correctamente

## 🧪 **PRUEBA AUTOMATIZADA EXITOSA**

El script `scripts/testPurchase.js` confirma que todo funciona:

```bash
node scripts/testPurchase.js
```

**Resultado:**
```
🎉 ¡Prueba de compra completada exitosamente!

📋 Resumen de la prueba:
   ✅ Usuario autenticado correctamente
   ✅ 2 productos seleccionados  
   ✅ Orden procesada y pagada
   ✅ Pago simulado exitoso
   ✅ Stock actualizado automáticamente
```

## 🛍️ **PRODUCTOS SUGERIDOS PARA COMPRAR**

### **Pack Marvel ($90.97)**
- The Amazing Spider-Man #1 - $29.99
- Iron Man #1 - $28.99  
- X-Men #1 - $32.99

### **Pack DC Comics ($94.97)**
- Batman: The Dark Knight Returns #1 - $34.99
- Wonder Woman #1 - $31.99
- The Flash #1 - $27.99

### **Pack Económico ($77.97)**
- Deadpool #1 - $23.99
- Saga #1 - $24.99
- Wolverine #1 - $25.99

## 🎯 **PASOS PARA REALIZAR LA COMPRA**

### **1. Acceder a la Tienda**
- Ve a: http://localhost:5173/

### **2. Iniciar Sesión**
- Clic en "Iniciar Sesión"
- Email: `usuario@ejemplo.com`
- Contraseña: `password123`

### **3. Agregar Productos**
- Navega por los productos
- Haz clic en "Agregar al carrito" en los productos que quieras
- El contador del carrito se actualizará

### **4. Ver Carrito**
- Clic en "Carrito (X)" en la barra superior
- Revisa los productos y cantidades
- Modifica si es necesario

### **5. Checkout**
- Clic en "Proceder al Checkout"
- Completa la información de envío
- Ingresa los datos de la tarjeta de prueba
- Clic en "Realizar Pedido"

## ✅ **CONFIRMACIÓN**

Después de completar la compra verás:
- ✅ Mensaje de confirmación
- ✅ Carrito vacío
- ✅ Orden en el historial (si implementado)

## 🔧 **NOTAS TÉCNICAS**

- **Pagos**: Solo simulados, no se procesan pagos reales
- **Stock**: Cada producto tiene 100 unidades disponibles
- **Impuestos**: Se calculan automáticamente (16%)
- **Validaciones**: Todos los campos son validados

## 🎮 **PARA DESARROLLADORES**

Si quieres probar la API directamente:

```bash
# 1. Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@ejemplo.com","password":"password123"}'

# 2. Crear orden (usar el token del login)
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "items": [
      {"productId": 1, "quantity": 1},
      {"productId": 2, "quantity": 2}
    ],
    "paymentInfo": {
      "cardNumber": "4111111111111111",
      "expiryDate": "12/25",
      "cvv": "123",
      "cardholderName": "Juan Perez"
    }
  }'
```

¡Listo para probar compras! 🎉