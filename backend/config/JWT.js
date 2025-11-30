// config/JWT.js
module.exports = {
  // Secret key for signing access tokens
  secret: process.env.JWT_SECRET,
  
  // Secret key for signing refresh tokens (should be different from access token secret)
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  
  // Access token expiration time (e.g., '15m', '1h', '1d')
  expiresIn: process.env.JWT_EXPIRES_IN,
  
  // Refresh token expiration time (typically longer than access token, e.g., '7d', '30d')
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  
  // Cookie expiration time in milliseconds (for httpOnly cookie storage)
  cookieExpiresIn: process.env.JWT_COOKIE_EXPIRES_IN
};