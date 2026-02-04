const { sequelize } = require('./src/config/database');
const defineAssociations = require('./src/models/associations');
const Product = require('./src/models/Product');
const Category = require('./src/models/Category');

async function checkSchema() {
  try {
    console.log('=== Database Connection ===');
    await sequelize.authenticate();
    console.log('✅ Connection established');

    // Define associations
    defineAssociations();

    console.log('\n=== Products Table Schema ===');
    const productAttributes = Object.keys(Product.rawAttributes);
    console.log('Product attributes:', productAttributes);

    console.log('\n=== Categories Table Schema ===');
    const categoryAttributes = Object.keys(Category.rawAttributes);
    console.log('Category attributes:', categoryAttributes);

    console.log('\n=== Testing Product Query ===');
    const products = await Product.findAll({
      include: [{ model: Category, as: 'Category' }],
      limit: 2
    });
    console.log('Products found:', products.length);
    
    products.forEach(product => {
      console.log(`- ${product.name} (${product.Category?.name})`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sequelize.close();
  }
}

checkSchema();