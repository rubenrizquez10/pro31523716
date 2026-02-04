const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/config/database');
const User = require('../src/models/User');

  describe('Categories API', () => {
    it('should allow public access to categories', async () => {
      const res = await request(app).get('/categories');
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');
    });

    it('should create a new category with valid token', async () => {
      const res = await request(app)
        .post('/categories')
        .set('Authorization', `Bearer ${global.__TEST_TOKEN__}`)
        .send({
          name: 'New Category',
          description: 'A test category',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.status).toEqual('success');
      expect(res.body.data.category.name).toEqual('New Category');
    });
  });

  describe('Tags API', () => {
    it('should allow public access to tags', async () => {
      const res = await request(app).get('/tags');
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');
    });

    it('should create a new tag with valid token', async () => {
      const res = await request(app)
        .post('/tags')
        .set('Authorization', `Bearer ${global.__TEST_TOKEN__}`)
        .send({
          name: 'New Tag',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.status).toEqual('success');
      expect(res.body.data.tag.name).toEqual('New Tag');
    });
  });
