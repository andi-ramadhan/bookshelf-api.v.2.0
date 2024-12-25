const request = require('supertest');
const server = require('../src/server');
const { describe, it, expect, afterAll, beforeAll } = require('@jest/globals');

afterAll(() => {
  server.close();
});

let token;
let userId;
let bookId;

// describe('Authentication Tests', () => {
//   describe('User Sign Up', () => {
//     it('should sign up a new user successfully', async () => {
//       const response = await request(server)
//         .post('/auth/signup')
//         .send({
//           username: 'usertest',
//           password: 'passwordtest'
//         });

//       expect(response.statusCode).toBe(201);
//       expect(response.body.message).toBe('User created successfully');
//     });

//     it('should not sign up a user with an existing username', async () => {
//       const response = await request(server)
//         .post('/auth/signup')
//         .send({
//           username: 'usertest',
//           password: 'passwordtest'
//         });

//       expect(response.statusCode).toBe(400);
//       expect(response.body.message).toBe('Username already exists');
//     });

//     it('should not sign up a user with a password less than 8 characters', async () => {
//       const response = await request(server)
//         .post('/auth/signup')
//         .send({
//           username: 'usertest2',
//           password: 'pass'
//         });

//       expect(response.statusCode).toBe(400);
//       expect(response.body.message).toBe('Password must be at least 8 characters long');
//     });
//   });

//   describe('User Login', () => {
//     it('should log in an existing user', async () => {
//       const response = await request(server)
//         .post('/auth/login')
//         .send({
//           username: 'usertest',
//           password: 'passwordtest'
//         });

//       expect(response.statusCode).toBe(200);
//       expect(response.body).toHaveProperty('token');
//       token = response.body.token;
//       console.log('Generated Token:', token); // Debug statement
//     });

//     it('should not log in a user with invalid credentials', async () => {
//       const response = await request(server)
//         .post('/auth/login')
//         .send({
//           username: 'usertest',
//           password: 'wrongpassword'
//         });

//       expect(response.statusCode).toBe(401);
//       expect(response.body.message).toBe('Invalid username or password');
//     });

//     it('should not log in a user with missing fields', async () => {
//       const response = await request(server)
//         .post('/auth/login')
//         .send({
//           username: 'usertest',
//           password: ''
//         });

//       expect(response.statusCode).toBe(401);
//       expect(response.body.message).toBe('Invalid username or password');
//     });
//   });

//   describe('Token Validation', () => {
//     it('should access protected routes with a valid token', async () => {
//       const loginResponse = await request(server)
//         .post('/auth/login')
//         .send({
//           username: 'usertest',
//           password: 'passwordtest'
//         });

//       token = loginResponse.body.token;
//       console.log('Token for Validation:', token); // Debug statement

//       const response = await request(server)
//         .get('/books')
//         .set('Authorization', `Bearer ${token}`);

//       console.log('Response Status:', response.statusCode); // Debug statement
//       console.log('Response Body:', response.body); // Debug statement

//       expect(response.statusCode).toBe(200);
//     });

//     it('should not access protected routes with an invalid token', async () => {
//       const response = await request(server)
//         .get('/books')
//         .set('Authorization', `Bearer invalidtoken`);

//       expect(response.statusCode).toBe(403);
//       expect(response.body.message).toBe('Invalid token');
//     });

//     it('should not access protected routes with no token', async () => {
//       const response = await request(server)
//         .get('/books');

//       expect(response.statusCode).toBe(401);
//       expect(response.body.message).toBe('No token provided');
//     });
//   });
// });

describe('Book Management Tests', () => {
  beforeAll(async () => {
    const response = await request(server)
      .post('/auth/login')
      .send({
        username: 'usertest',
        password: 'passwordtest'
      });

    token = response.body.token;
  });

  describe('Add Book', () => {
    it('should adding a book with all required fields', async () => {
      const response = await request(server)
      .post('/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Book Test 1',
        year: 2020,
        author: 'Test User',
        summary: 'Book summary',
        publisher: 'Test Publisher',
        pageCount: 200,
        readPage: 100,
        reading: true
      });
  
      expect(response.statusCode).toBe(201);
      expect(response.body.data).toHaveProperty('BookId');
      expect(response.body.data).toHaveProperty('Title', 'Book Test 1');

      // Assign the bookId to a variable for use in other tests
      bookId = response.body.data.BookId;
    });

    it('should not add a book with missing and invalid fields', async () => {
      const response = await request(server)
      .post('/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: '',
        year: 'Two thousand and twenty',
        author: 'Test User',
        summary: 'Book summary',
        publisher: 'Test Publisher',
        pageCount: 50,
        readPage: 100,
        readding: true
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toBeInstanceOf(Array);
      expect(response.body.errors).toContainEqual(expect.objectContaining({ msg: 'Title is required' }));
      expect(response.body.errors).toContainEqual(expect.objectContaining({ msg: 'Year must be a non-negative number' }));
      expect(response.body.errors).toContainEqual(expect.objectContaining({ msg: 'Read page cannot be greater than page count' }));
    });

    it('should not add a book with an invalid token', async () => {
      const response = await request(server)
      .post('/books')
      .set('Authorization', `Bearer invalidtoken`)
      .send({
        title: 'Book Test 1',
        year: 2020,
        author: 'Test User',
        summary: 'Book summary',
        publisher: 'Test Publisher',
        pageCount: 200,
        readPage: 100,
        readding: true
      });

      expect(response.statusCode).toBe(403);
      expect(response.body.message).toBe('Invalid token');
    });    
  });
});
