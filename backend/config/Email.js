// config/Email.js
module.exports = {
  // SMTP server hostname from environment variables
  host: process.env.EMAIL_HOST,
  
  // SMTP server port from environment variables
  port: process.env.EMAIL_PORT,
  
  // Authentication credentials
  auth: {
    // Email account username from environment variables
    user: process.env.EMAIL_USERNAME,
    
    // Email account password from environment variables
    pass: process.env.EMAIL_PASSWORD
  }
};