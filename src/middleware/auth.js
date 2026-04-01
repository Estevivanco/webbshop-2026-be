import { verifyAccessToken } from '../utils/tokens.js';

export const authenticateToken = (req, res, next) => {
  try {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        message: 'Access token required' 
      });
    }

    const verifiedUser = verifyAccessToken(token);
    
    if (!verifiedUser || !verifiedUser.userId) {
      return res.status(403).json({ 
        message: 'Invalid token payload' 
      });
    }

    req.userId = verifiedUser.userId;
    req.user = verifiedUser;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Token has expired' 
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ 
        message: 'Invalid token' 
      });
    }
    return res.status(500).json({ 
      message: 'Authentication error',
      error: error.message 
    });
  }
};