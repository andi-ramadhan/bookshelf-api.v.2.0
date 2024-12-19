/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Decoded token:', req.user);
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Access Denied: Insufficient Permissions' });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRole
};