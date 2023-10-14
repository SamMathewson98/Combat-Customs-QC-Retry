const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Keep this secret

// Create a JWT on user login
const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

// Verify a JWT
const decodedToken = jwt.verify(token, secretKey);
