require ('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/routes');
const sequelize = require('./config/database');
const { checkBlacklistedToken } = require('./middleware/auth');


// Middleware to parse JSON bodies
app.use(express.json());

// Authentication routes
app.use('/auth' ,authRoutes);

// Protected routes
app.use('/', checkBlacklistedToken, bookRoutes);

const port = process.env.PORT;

app.listen(port, async () => {
  console.log(`Server listening on http://localhost:${port}`)
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
