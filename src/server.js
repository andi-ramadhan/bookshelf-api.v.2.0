const express = require('express');
const app = express();
const bookRoutes = require('./routes/route');

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/books', bookRoutes);

const port = 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});
