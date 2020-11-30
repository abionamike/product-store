/* eslint-disable import/no-extraneous-dependencies */
const supertest = require('supertest');
const app = require('../server.ts');

const request = supertest(app);

describe('GET /api/products', () => {
  test('It responds with an array of products', async () => {
    const response = await request.get('/api/products');
    expect(response.statusCode).toBe(200);
    expect(response.data[0]).toHaveProperty('_id');
    expect(response.data[0]).toHaveProperty('name');
    expect(response.data[0]).toHaveProperty('price');
    expect(response.data[0]).toHaveProperty('image');
    expect(response.data[0]).toHaveProperty('category');
    expect(response.data[0]).toHaveProperty('rating');
  });
});

describe('POST /api/products', () => {
  test('It responds with the newly created student', async () => {
    const response = await request
      .post('/api/products')
      .send({
        rating: 6.5,
        name: 'Infinix Hot 10 Brand New',
        price: 50,
        image: 'uploads/image_1606421009377.jpg',
        category: 'books',
        description: 'just books',
      });

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('price');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('category');
    expect(response.body).toHaveProperty('desciption');
    expect(response.body).toHaveProperty('image');
    expect(newStudent.body.name).toBe('Infinix Hot 10 Brand New');
  });
});
