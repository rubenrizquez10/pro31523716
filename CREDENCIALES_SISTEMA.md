# 🔐 **CREDENCIALES DEL SISTEMA - COMIC STORE**

## 👤 **USUARIO REGULAR (PARA COMPRAS)**

```
📧 Email: usuario@ejemplo.com
🔐 Contraseña: password123
👤 Nombre: Juan Pérez
🎯 Propósito: Realizar compras, ver historial, gestionar perfil
```

**Acceso:**
- URL: http://localhost:5173/login
- Funciones: Comprar productos, ver carrito, checkout, historial

---

## 🛡️ **ADMINISTRADOR (PARA GESTIÓN)**

```
📧 Email: admin@comicstore.com
🔐 Contraseña: admin123
👤 Rol: Administrador del sistema
🎯 Propósito: Gestionar productos, categorías, etiquetas
```

**Acceso:**
- URL: http://localhost:5173/admin/login
- Funciones: 
  - ✅ Crear, editar y eliminar productos
  - ✅ Gestionar categorías
  - ✅ Gestionar etiquetas
  - ✅ Ver panel de administración completo

---

## 🎯 **CÓMO USAR CADA CUENTA**

### **👤 Como Usuario Regular:**
1. Ve a: http://localhost:5173/login
2. Ingresa: `usuario@ejemplo.com` / `password123`
3. Explora productos y realiza compras
4. Usa los datos de pago de prueba:
   - Tarjeta: `4111111111111111`
   - Vencimiento: `12/25`
   - CVV: `123`

### **🛡️ Como Administrador:**
1. Ve a: http://localhost:5173/admin/login
2. Ingresa: `admin@comicstore.com` / `admin123`
3. Gestiona el catálogo de productos
4. Agrega nuevos productos con la imagen predeterminada
5. Edita o elimina productos existentes

---

## 🔒 **SEGURIDAD Y NOTAS**

### **Autenticación:**
- **Usuario Regular**: JWT con expiración de 24 horas
- **Administrador**: Token simple almacenado en localStorage

### **Datos Predeterminados:**
- **15 productos** con stock de 100 cada uno
- **3 categorías**: Superhéroes, Horror, Fantasía
- **4 etiquetas**: Vintage, Clásico, Acción, Fantasía
- **Usuario de prueba** creado automáticamente

### **Persistencia:**
- Los datos se mantienen en SQLite (`database.sqlite`)
- Los productos predeterminados se recrean automáticamente al iniciar
- El usuario de prueba se verifica/crea en cada inicio

---

## 🧪 **PRUEBAS RÁPIDAS**

### **Probar Usuario Regular:**
```bash
# Ejecutar script de prueba de compra
node scripts/testPurchase.js
```

### **Probar Administrador:**
1. Ir a http://localhost:5173/admin/login
2. Login con `admin@comicstore.com` / `admin123`
3. Crear un producto de prueba
4. Verificar que aparece en la tienda

---

## 📋 **RESUMEN RÁPIDO**

| Tipo | Email | Contraseña | URL |
|------|-------|------------|-----|
| **Usuario** | `usuario@ejemplo.com` | `password123` | `/login` |
| **Admin** | `admin@comicstore.com` | `admin123` | `/admin/login` |

---

## 🎯 **PARA DEMOSTRACIÓN**

**Flujo Completo de Demostración:**

1. **👤 Como Usuario**: Comprar productos
   - Login → Explorar → Agregar al carrito → Checkout

2. **🛡️ Como Admin**: Gestionar catálogo  
   - Login admin → Agregar producto → Editar → Ver en tienda

3. **🔄 Verificar**: El producto agregado por admin aparece para usuarios

¡Listo para demostrar todas las funcionalidades! 🎉