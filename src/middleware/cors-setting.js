// Just use this if need customize the CORS setting such as allow only specific origin, method, etc.

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = corsOptions;