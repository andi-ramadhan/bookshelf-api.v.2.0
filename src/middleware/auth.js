const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/blacklisted_tokens');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    
    req.user = user;
    next();
  });
};

// const authorizeRole = (role) => {
//   return (req, res, next) => {
//     if (req.user.role !== role) {
//       return res.status(403).json({ message: 'Access Denied: Insufficient Permissions' });
//     }
//     next();
//   };
// };

const checkBlacklistedToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const blacklistedToken = await BlacklistedToken.findOne({ where: { token } });

  if (blacklistedToken) {
    return res.status(403).json({ message: 'Token is blacklisted' });
  }

  next();
};

module.exports = {
  authenticateToken,
  checkBlacklistedToken
};