# 🛒 GUÍA COMPLETA: CÓMO REALIZAR UNA COMPRA DE EJEMPLO

## 📋 **DATOS DE PRUEBA PRECONFIGURADOS**

### **👤 Usuario de Prueba:**
```
📧 Email: usuario@ejemplo.com
🔐 Contraseña: password123
👤 Nombre: Juan Pérez
```

### **💳 Información de Pago (Tarjeta de Prueba):**
```
💳 Número de Tarjeta: 4111111111111111
📅 Fecha de Vencimiento: 12/25
🔒 CVV: 123
👤 Nombre en la Tarjeta: Juan Perez
```

### **📦 Información de Envío:**
```
🏠 Dirección: Calle Falsa 123
🏙️ Ciudad: Madrid
📮 Código Postal: 28001
🌍 País: España
📞 Teléfono: +34 600 123 456
```

---

## 🎯 **PASO A PASO: REALIZAR UNA COMPRA**

### **Paso 1: Acceder a la Tienda**
1. Ve a: **http://localhost:5173/**
2. Verás la página principal con productos de cómics

### **Paso 2: Registrarse o Iniciar Sesión**

**Opción A - Usar Usuario de Prueba (Recomendado):**
1. Haz clic en **"Iniciar Sesión"**
2. Ingresa:
   - Email: `usuario@ejemplo.com`
   - Contraseña: `password123`
3. Haz clic en **"Iniciar Sesión"**

**Opción B - Crear Nuevo Usuario:**
1. Haz clic en **"Registrarse"**
2. Completa el formulario con tus datos
3. Haz clic en **"Registrarse"**

### **Paso 3: Explorar Productos**
1. Ve a la sección de productos (debería aparecer automáticamente)
2. Verás 15 productos de cómics con:
   - ✅ Imagen de superhéroe colorida
   - ✅ Stock de 100 unidades cada uno
   - ✅ Precios entre $23.99 - $34.99

### **Paso 4: Agregar Productos al Carrito**
1. **Selecciona productos**, por ejemplo:
   - The Amazing Spider-Man #1 ($29.99)
   - Batman: The Dark Knight Returns #1 ($34.99)
   - Wolverine #1 ($25.99)

2. **Para cada producto:**
   - Haz clic en **"Agregar al carrito"**
   - Verás una notificación verde: "✅ [Producto] agregado al carrito!"
   - El contador del carrito se actualizará automáticamente

### **Paso 5: Revisar el Carrito**
1. Haz clic en **"Carrito (3)"** en la barra superior
2. Verás:
   - Lista de productos seleccionados
   - Cantidad de cada producto
   - Precio individual y total
   - **Subtotal**: ~$90.97
   - **Impuestos (16%)**: ~$14.56
   - **Total**: ~$105.53

3. **Puedes:**
   - Cambiar cantidades con los botones +/-
   - Eliminar productos con el botón "Eliminar"

### **Paso 6: Proceder al Checkout**
1. Haz clic en **"Proceder al Checkout"**
2. Serás redirigido a la página de checkout

### **Paso 7: Completar Información de Checkout**

**Información de Envío:**
```
Nombre Completo: Juan Pérez
Dirección: Calle Falsa 123
Ciudad: Madrid
Código Postal: 28001
País: España
Teléfono: +34 600 123 456
```

**Información de Pago:**
```
Número de Tarjeta: 4111111111111111
Fecha de Vencimiento: 12/25
CVV: 123
Nombre en la Tarjeta: Juan Perez
```

### **Paso 8: Confirmar Compra**
1. Revisa el resumen de la orden
2. Haz clic en **"Realizar Pedido"**
3. Verás un mensaje de confirmación
4. El carrito se vaciará automáticamente

---

## 🎮 **PRODUCTOS DISPONIBLES PARA COMPRAR**

| Producto | Precio | Stock | Editorial |
|----------|--------|-------|-----------|
| The Amazing Spider-Man #1 | $29.99 | 100 | Marvel Comics |
| Batman: The Dark Knight Returns #1 | $34.99 | 100 | DC Comics |
| The Walking Dead #1 | $24.99 | 100 | Image Comics |
| Sandman #1 | $27.99 | 100 | DC Comics |
| Wolverine #1 | $25.99 | 100 | Marvel Comics |
| Iron Man #1 | $28.99 | 100 | Marvel Comics |
| Wonder Woman #1 | $31.99 | 100 | DC Comics |
| Spawn #1 | $26.99 | 100 | Image Comics |
| X-Men #1 | $32.99 | 100 | Marvel Comics |
| Hellboy #1 | $29.99 | 100 | Dark Horse Comics |
| Saga #1 | $24.99 | 100 | Image Comics |
| Captain America #1 | $30.99 | 100 | Marvel Comics |
| The Flash #1 | $27.99 | 100 | DC Comics |
| Deadpool #1 | $23.99 | 100 | Marvel Comics |
| Green Lantern #1 | $28.99 | 100 | DC Comics |

---

## 💡 **EJEMPLOS DE COMPRAS SUGERIDAS**

### **🦸‍♂️ Pack Marvel (3 productos - ~$87)**
- The Amazing Spider-Man #1 ($29.99)
- Iron Man #1 ($28.99)
- Wolverine #1 ($25.99)

### **🦇 Pack DC Comics (3 productos - ~$95)**
- Batman: The Dark Knight Returns #1 ($34.99)
- Wonder Woman #1 ($31.99)
- The Flash #1 ($27.99)

### **🧟 Pack Horror/Alternativo (3 productos - ~$82)**
- The Walking Dead #1 ($24.99)
- Spawn #1 ($26.99)
- Hellboy #1 ($29.99)

### **💰 Pack Económico (3 productos - ~$77)**
- Deadpool #1 ($23.99)
- Saga #1 ($24.99)
- The Walking Dead #1 ($24.99)

---

## 🔧 **FUNCIONALIDADES A PROBAR**

### **✅ Carrito:**
- Agregar productos
- Cambiar cantidades
- Eliminar productos
- Ver totales actualizados
- Persistencia (se mantiene al recargar)

### **✅ Checkout:**
- Validación de formularios
- Cálculo de impuestos
- Procesamiento de pago
- Confirmación de orden

### **✅ Validaciones:**
- Stock disponible
- Campos requeridos
- Formato de tarjeta de crédito
- Información de envío completa

---

## 🚨 **NOTAS IMPORTANTES**

### **💳 Sobre los Pagos:**
- **Solo son simulados** - No se procesan pagos reales
- La tarjeta `4111111111111111` es una tarjeta de prueba estándar
- Cualquier CVV de 3 dígitos funcionará
- Cualquier fecha futura funcionará

### **📦 Sobre los Envíos:**
- **Solo son simulados** - No se envían productos reales
- Puedes usar cualquier dirección
- Los datos se almacenan solo para la demostración

### **🛡️ Sobre la Seguridad:**
- Los datos se almacenan localmente en SQLite
- Las contraseñas están encriptadas con bcrypt
- Los tokens JWT expiran automáticamente

---

## 🎯 **URLs IMPORTANTES**

- **🏠 Tienda**: http://localhost:5173/
- **🛒 Carrito**: http://localhost:5173/cart
- **💳 Checkout**: http://localhost:5173/checkout
- **👤 Login**: http://localhost:5173/login
- **📝 Registro**: http://localhost:5173/register
- **🔧 Admin**: http://localhost:5173/admin/login

---

¡Listo! Con estos datos puedes realizar compras de prueba completas y probar todas las funcionalidades de la tienda. 🎉