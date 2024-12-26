# Bookshelf API v.2 - Book Management API

A simple self project that focused on Backend Side to manage books with user authentication and authorization using Express.js, Sequelize, and JWT.

## Description

This project allows users to manage their books by providing functionalities such as adding, updating, deleting, and retrieving books. It also includes user authentication and authorization using JWT.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/express-js-projects.git
    cd express-js-projects

2. Install dependencies:
    ```sh
    npm install

3. Set up environtment variables:
  - Create a .env file in the root directory and add the following variables:
    ```sh
    DATABASE_URL=your_database_url 
    PORT=5000
    JWT_SECRET=your_jwt_secret


- I used PostgreSQL for the database so the .env could be looks similar like this:
    ```sh
    POSTGRES_HOST=localhost
    POSTGRES_DB=your_database_name
    POSTGRES_USER=your_database_user
    POSTGRES_PASSWORD=your_database_password
    POSTGRES_PORT=5432 
    PORT=5000
    JWT_SECRET=your_jwt_secret

4. Run migrations and seeders:
    ```sh
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all

## Usage
 
1. Start the server:
    ```sh
    npm start

2. The server will be running at http://localhost:5000.

## API Documentation

## Authentication

- Sign Up
  - POST /auth/signup
  - Request Body: 
    ```json
    { 
      "username": "string",
      "password": "string"
    }

  - Response: 
    ```json
    { 
      "message": "User created successfully"
    }

- Login
  - POST /auth/login
  - Request Body: 
    ```json
    {
      "username": "string",
      "password": "string"
    }

  - Response: 
    ```json
    {
      "token": "string"
    }

- Logout
  - POST /auth/logout
  - Headers: Authorization: Bearer <token>
  - Response: 
    ```json
    {
      "message": "User logged out successfully"
    }

## Books Management

- Get All Books
  - GET /books
  - Headers: Authorization: Bearer <token>
  - Response: Array of books
    
- Get Book by ID
  - GET /books/:id
  - Headers: Authorization: Bearer <token>
  - Response: Book object
    
- Add Book
  - POST /books
  - Headers: Authorization: Bearer <token>
  - Request Body: 
      ```json
      {
        "title": "string",
        "year": "number",
        "author": "string",
        "summary": "string",
        "publisher": "string",
        "pageCount": "number",
        "readPage": "number",
        "reading": "boolean"
      }

  - Response: 
      ```json
      {
        "message": "Book added successfully",
        "data": {
          "BookId": "string",
          "UserId": "string",
          "Title": "string",
          "DateAdded": "string"
        }
      }
    
- Update Book
  - PUT /books/:id
  - Headers: Authorization: Bearer <token>
  - Request Body: 
    ```json
    {
      "title": "string",
      "year": "number",
      "author": "string",
      "summary": "string",
      "publisher": "string",
      "pageCount": "number",
      "readPage": "number",
      "reading": "boolean"
    }

  - Response: 
    ```json
    {
      "message": "Book updated successfully",
      "book": "Book object"
    }

- Delete Book
  - DELETE /books/:id
  - Headers: Authorization: Bearer <token>
  - Response: 
    ```json
    {
      "message": "Book deleted successfully"
    }

## Testing

1. Run tests:
    ```sh
    npx jest

## License

This project is licensed under the `[MIT License](LICENSE)`.