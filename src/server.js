require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/routes');
const sequelize = require('./config/database');
const { checkBlacklistedToken } = require('./middleware/auth');


// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Authentication routes
app.use('/auth' ,authRoutes);

// Protected routes
app.use('/', checkBlacklistedToken, bookRoutes);

const port = process.env.PORT;

const server = app.listen(port, async () => {
  console.log(`Server listening on http://localhost:${port}`)
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

if (require.main === module) {
  // To run server directly
  server;
} else {
  // To export for testing
  module.exports = server;
}