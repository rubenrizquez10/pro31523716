const { sequelize } = require('../src/config/database');
const Product = require('../src/models/Product');
const Category = require('../src/models/Category');
const Tag = require('../src/models/Tag');
const ProductTag = require('../src/models/ProductTag');
const User = require('../src/models/User');
const bcrypt = require('bcryptjs');

// Productos predeterminados que siempre deben existir
const defaultProducts = [
  {
    name: 'The Amazing Spider-Man #1',
    description: 'El primer cómic de Spider-Man, publicado en 1963. Una obra maestra que cambió el mundo de los superhéroes.',
    price: 29.99,
    stock: 100,
    publisher: 'Marvel Comics',
    sku: 'MAR-001',
    series: 'The Amazing Spider-Man',
    issue_number: '1',
    publication_date: '1963-03-01',
    categoryId: 1,
    tags: [1, 2],
    image: '/pngtree-colorful-superhero-backgrounds-with-cartoon-comic-book-halftone-zoom-image_13900437.png'
  },
  {
    name: 'Batman: The Dark Knight Returns #1',
    description: 'El clásico de Frank Miller sobre el regreso de Batman. Una historia oscura y madura que redefinió al personaje.',
    price: 34.99,
    stock: 100,
    publisher: 'DC Comics',
    sku: 'DC-001',
    series: 'Batman: The Dark Knight Returns',
    issue_number: '1',
    publication_date: '1986-02-01',
    categoryId: 1,
    tags: [1, 3],
    image: '/pngtree-colorful-superhero-backgrounds-with-cartoon-comic-book-halftone-zoom-image_13900437.png'
  },
  {
    name: 'The Walking Dead #1',
    description: 'El primer issue de la serie de zombies de Robert Kirkman. El inicio de una saga épica de supervivencia.',
    price: 24.99,
    stock: 100,
    publisher: 'Image Comics',
    sku: 'IMG-001',
    series: 'The Walking Dead',
    issue_number: '1',
    publication_date: '2003-10-01',
    categoryId: 2,
    tags: [2, 3],
    image: '/pngtree-colorful-superhero-backgrounds-with-cartoon-comic-book-halftone-zoom-image_13900437.png'
  },
  {
    name: 'Sandman #1',
    description: 'El inicio de la icónica serie de Neil Gaiman. Una obra maestra de la narrativa gráfica.',
    price: 27.99,
    stock: 100,
    publisher: 'DC Comics',
    sku: 'DC-002',
    series: 'Sandman',
    issue_number: '1',
    publication_date: '1989-01-01',
    categoryId: 3,
    tags: [2, 4],
    image: '/pngtree-colorful-superhero-backgrounds-with-cartoon-comic-book-halftone-zoom-image_13900437.png'
  },
  {
    name: 'Wolverine #1',
    description: 'El primer cómic en solitario de Wolverine. La historia del mutante más feroz de Marvel.',
    price: 25.99,
    stock: 100,
    publisher: 'Marvel Comics',
    sku: 'MAR-002',
    series: 'Wolverine',
    issue_number: '1',
    publication_date: '1982-09-01',
    categoryId: 1,
    tags: [1, 3],
    image: '/pngtree-colorful-superhero-backgrounds-with-cartoon-comic-book-halftone-zoom-image_13900437.png'
  }
];

const defaultCategories = [
  { name: 'Superhéroes', description: 'Cómics de superhéroes de Marvel, DC y más.' },
  { name: 'Horror', description: 'Cómics de terror y suspenso.' },
  { name: 'Fantasía', description: 'Cómics de magia y aventuras fantásticas.' }
];

const defaultTags = [
  { name: 'Vintage' },
  { name: 'Clásico' },
  { name: 'Acción' },
  { name: 'Fantasía' }
];

async function ensureDefaultData() {
  try {
    console.log('🔍 Verificando datos predeterminados...');

    // Asegurar categorías
    for (const categoryData of defaultCategories) {
      const [category] = await Category.findOrCreate({
        where: { name: categoryData.name },
        defaults: categoryData
      });
    }

    // Asegurar tags
    for (const tagData of defaultTags) {
      const [tag] = await Tag.findOrCreate({
        where: { name: tagData.name },
        defaults: tagData
      });
    }

    // Asegurar productos predeterminados
    let createdCount = 0;
    let updatedCount = 0;

    for (const productData of defaultProducts) {
      const existingProduct = await Product.findOne({
        where: { sku: productData.sku }
      });

      if (existingProduct) {
        // Actualizar producto existente manteniendo el stock si es mayor
        const newStock = Math.max(existingProduct.stock, productData.stock);
        await existingProduct.update({
          ...productData,
          stock: newStock
        });
        updatedCount++;
      } else {
        // Crear nuevo producto
        const product = await Product.create(productData);
        
        // Agregar tags
        if (productData.tags) {
          const productTags = productData.tags.map(tagId => ({
            productId: product.id,
            tagId: tagId
          }));
          await ProductTag.bulkCreate(productTags);
        }
        createdCount++;
      }
    }

    // Crear usuario de prueba
    console.log('👤 Verificando usuario de prueba...');
    const testUserEmail = 'usuario@ejemplo.com';
    const existingUser = await User.findOne({ where: { email: testUserEmail } });
    
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await User.create({
        fullName: 'Juan Pérez',
        email: testUserEmail,
        password: hashedPassword
      });
      console.log('✅ Usuario de prueba creado');
    } else {
      // Verificar que la contraseña sea correcta
      const passwordValid = await bcrypt.compare('password123', existingUser.password);
      if (!passwordValid) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        await existingUser.update({ password: hashedPassword });
        console.log('✅ Contraseña de usuario de prueba actualizada');
      } else {
        console.log('✅ Usuario de prueba verificado');
      }
    }

    console.log(`✅ Datos predeterminados verificados:`);
    console.log(`   - ${createdCount} productos creados`);
    console.log(`   - ${updatedCount} productos actualizados`);
    console.log(`   - ${defaultCategories.length} categorías aseguradas`);
    console.log(`   - ${defaultTags.length} tags asegurados`);
    console.log(`   - Usuario de prueba verificado`);

  } catch (error) {
    console.error('❌ Error asegurando datos predeterminados:', error);
  }
}

module.exports = { ensureDefaultData };

// Si se ejecuta directamente
if (require.main === module) {
  ensureDefaultData().finally(() => {
    sequelize.close();
  });
}