const { sequelize } = require('../src/config/database');
const Product = require('../src/models/Product');
const Category = require('../src/models/Category');
const Tag = require('../src/models/Tag');
const ProductTag = require('../src/models/ProductTag');

// Products data
const productsData = [
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
  },
  {
    name: 'Iron Man #1',
    description: 'El primer cómic de Iron Man, donde Tony Stark se convierte en el Hombre de Hierro. El nacimiento de un icono.',
    price: 28.99,
    stock: 100,
    publisher: 'Marvel Comics',
    sku: 'MAR-003',
    series: 'Iron Man',
    issue_number: '1',
    publication_date: '1963-03-01',
    categoryId: 1,
    tags: [1, 3],
    image: '/pngtree-colorful-superhero-backgrounds-with-cartoon-comic-book-halftone-zoom-image_13900437.png'
  },
  {
    name: 'Wonder Woman #1',
    description: 'El primer cómic de Wonder Woman, la princesa amazona. Un símbolo de fuerza y justicia.',
    price: 31.99,
    stock: 100,
    publisher: 'DC Comics',
    sku: 'DC-003',
    series: 'Wonder Woman',
    issue_number: '1',
    publication_date: '1942-06-01',
    categoryId: 1,
    tags: [1, 4],
    image: '/pngtree-colorful-superhero-backgrounds-with-cartoon-comic-book-halftone-zoom-image_13900437.png'
  },
  {
    name: 'Spawn #1',
    description: 'El primer cómic de Spawn, el anti-héroe al que le dieron una segunda oportunidad. Una historia oscura y visceral.',
    price: 26.99,
    stock: 100,
    publisher: 'Image Comics',
    sku: 'IMG-002',
    series: 'Spawn',
    issue_number: '1',
    publication_date: '1992-05-01',
    categoryId: 2,
    tags: [2, 3],
    image: '/pngtree-colorful-superhero-backgrounds-with-cartoon-comic-book-halftone-zoom-image_13900437.png'
  },
  {
    name: 'X-Men #1',
    description: 'El primer cómic de los X-Men, los mutantes que luchan por la aceptación. El inicio de una saga legendaria.',
    price: 32.99,
    stock: 100,
    publisher: 'Marvel Comics',
    sku: 'MAR-004',
    series: 'X-Men',
    issue_number: '1',
    publication_date: '1963-09-01',
    categoryId: 1,
    tags: [1, 4],
    image: '/pngtree-colorful-superhero-backgrounds-with-cartoon-comic-book-halftone-zoom-image_13900437.png'
  },
  {
    name: 'Hellboy #1',
    description: 'El primer cómic de Hellboy, el demonio que lucha contra el mal. Una mezcla única de horror y aventura.',
    price: 29.99,
    stock: 100,
    publisher: 'Dark Horse Comics',
    sku: 'DHC-001',
    series: 'Hellboy',
    issue_number: '1',
    publication_date: '1994-03-01',
    categoryId: 2,
    tags: [2, 3],
    image: '/pngtree-colorful-superhero-backgrounds-with-cartoon-comic-book-halftone-zoom-image_13900437.png'
  },
  {
    name: 'Saga #1',
    description: 'El primer cómic de Saga, una epopeya de ciencia ficción y fantasía. Una historia de amor en tiempos de guerra.',
    price: 24.99,
    stock: 100,
    publisher: 'Image Comics',
    sku: 'IMG-003',
    series: 'Saga',
    issue_number: '1',
    publication_date: '2012-03-01',
    categoryId: 3,
    tags: [2, 4],
    image: '/pngtree-colorful-superhero-backgrounds-with-cartoon-comic-book-halftone-zoom-image_13900437.png'
  },
  {
    name: 'Captain America #1',
    description: 'El primer cómic del Capitán América. El soldado perfecto lucha por la libertad y la justicia.',
    price: 30.99,
    stock: 100,
    publisher: 'Marvel Comics',
    sku: 'MAR-005',
    series: 'Captain America',
    issue_number: '1',
    publication_date: '1941-03-01',
    categoryId: 1,
    tags: [1, 2],
    image: '/pngtree-colorful-superhero-backgrounds-with-cartoon-comic-book-halftone-zoom-image_13900437.png'
  },
  {
    name: 'The Flash #1',
    description: 'El primer cómic de The Flash. El hombre más rápido del mundo comienza su carrera heroica.',
    price: 27.99,
    stock: 100,
    publisher: 'DC Comics',
    sku: 'DC-004',
    series: 'The Flash',
    issue_number: '1',
    publication_date: '1940-01-01',
    categoryId: 1,
    tags: [1, 3],
    image: '/pngtree-colorful-superhero-backgrounds-with-cartoon-comic-book-halftone-zoom-image_13900437.png'
  },
  {
    name: 'Deadpool #1',
    description: 'El primer cómic en solitario de Deadpool. El mercenario bocazas que rompe la cuarta pared.',
    price: 23.99,
    stock: 100,
    publisher: 'Marvel Comics',
    sku: 'MAR-006',
    series: 'Deadpool',
    issue_number: '1',
    publication_date: '1997-01-01',
    categoryId: 1,
    tags: [2, 3],
    image: '/pngtree-colorful-superhero-backgrounds-with-cartoon-comic-book-halftone-zoom-image_13900437.png'
  },
  {
    name: 'Green Lantern #1',
    description: 'El primer cómic de Green Lantern. El poder de la voluntad se manifiesta en un anillo cósmico.',
    price: 28.99,
    stock: 100,
    publisher: 'DC Comics',
    sku: 'DC-005',
    series: 'Green Lantern',
    issue_number: '1',
    publication_date: '1940-07-01',
    categoryId: 1,
    tags: [1, 4],
    image: '/pngtree-colorful-superhero-backgrounds-with-cartoon-comic-book-halftone-zoom-image_13900437.png'
  }
];

// Categories data
const categoriesData = [
  {
    name: 'Superhéroes',
    description: 'Cómics de superhéroes de Marvel, DC y más.'
  },
  {
    name: 'Horror',
    description: 'Cómics de terror y suspenso.'
  },
  {
    name: 'Fantasía',
    description: 'Cómics de magia y aventuras fantásticas.'
  }
];

// Tags data
const tagsData = [
  {
    name: 'Vintage'
  },
  {
    name: 'Clásico'
  },
  {
    name: 'Acción'
  },
  {
    name: 'Fantasía'
  }
];

const seedDatabase = async () => {
  try {
    console.log('Syncing database...');
    await sequelize.sync({ force: true });

    console.log('Creating categories...');
    const categories = await Category.bulkCreate(categoriesData);

    console.log('Creating tags...');
    const tags = await Tag.bulkCreate(tagsData);

    console.log('Creating products...');
    const products = await Promise.all(
      productsData.map(async (productData) => {
        const product = await Product.create(productData);
        
        // Add tags to product
        const productTags = productData.tags.map(tagId => ({
          productId: product.id,
          tagId: tagId
        }));
        await ProductTag.bulkCreate(productTags);

        return product;
      })
    );

    console.log('Seed completed successfully!');
    console.log(`Created ${categories.length} categories`);
    console.log(`Created ${tags.length} tags`);
    console.log(`Created ${products.length} products`);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();