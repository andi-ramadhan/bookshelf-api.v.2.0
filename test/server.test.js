const request = require('supertest');
const server = require('../src/server');
const { describe, it, expect, afterAll } = require('@jest/globals');

afterAll(() => {
  server.close();
});

describe('Authentication Tests', () => {
  it('should sign up a new user', async () => {
    const response = await request(server)
    .post('/auth/signup')
    .send({
      username: 'usertest',
      password: 'passwordtest'
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('User created successfully');
  });

  it('should log in an existing user', async () => {
    const response = await request(server)
    .post('/auth/login')
    .send({
      username: 'usertest',
      password: 'passwordtest'
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not log in a user with invalid credentials', async () => {
    const response = await request(server)
    .post('/auth/login')
    .send({
      username: 'usertest',
      password: 'alsfkaskfljas'
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid username or password');
  });

  it('should log out a user', async () => {
    const loginResponse = await request(server)
    .post('/auth/login')
    .send({
      username: 'usertest',
      password: 'passwordtest'
    });

    const token = loginResponse.body.token;

    const response = await request(server)
    .post('/auth/logout')
    .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('User logged out successfully');
  });
});