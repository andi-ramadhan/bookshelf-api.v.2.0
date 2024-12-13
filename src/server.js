const express = require('express');
const app = express();
const bookRoutes = require('./routes/routes');
const sequelize = require('./config/database');
require ('dotenv').config();

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/books', bookRoutes);

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`Server listening on http://localhost:${port}`)
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
