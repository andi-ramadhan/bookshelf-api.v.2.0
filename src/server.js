const express = require('express');
const app = express();
const bookRoutes = require('./route');

// Middleware to parse JSON bodies
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Hello World');
})

app.use('/books', bookRoutes);

const port = 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});
