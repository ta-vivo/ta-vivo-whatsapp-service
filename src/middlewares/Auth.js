import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['authorization'];

  if (!token) {
    return res.status(403).json({
      message: 'No token provided.',
    });
  }
  try {
    jwt.verify(token.replace('Bearer ', ''), process.env.JWT_KEY);
  } catch (err) {
    return res.status(401)
      .json({
        message: 'Failed to authenticate token.',
      });
  }
  return next();
};

export { verifyToken };