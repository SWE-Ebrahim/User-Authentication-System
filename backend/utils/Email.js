// utils/email.js
// Utility function for sending emails using Nodemailer
// Configures email transport settings and sends emails

const nodemailer = require('nodemailer');
const emailConfig = require('../config/Email');

// Async function to send emails
// Takes an options object with email details
const sendEmail = async (options) => {
  // Create a transporter object that defines how to send emails
  // Uses SMTP configuration from emailConfig
  const transporter = nodemailer.createTransport({
    // SMTP server hostname (e.g., smtp.gmail.com)
    host: emailConfig.host,
    
    // SMTP server port (e.g., 587 for TLS, 465 for SSL)
    port: emailConfig.port,
    
    // Authentication credentials for the email account
    auth: {
      // Email account username
      user: emailConfig.auth.user,
      
      // Email account password or app-specific password
      pass: emailConfig.auth.pass
    }
  });

  // Define the email content and recipient information
  const mailOptions = {
    // Sender address with name and email
    from: 'Auth System <no-reply@authsystem.com>',
    
    // Recipient email address from options parameter
    to: options.email,
    
    // Email subject line from options parameter
    subject: options.subject,
    
    // Plain text email body from options parameter
    text: options.message
  };

  // Send the email using the transporter and mail options
  // This returns a promise that resolves when the email is sent
  await transporter.sendMail(mailOptions);
};

// Export the sendEmail function for use in other parts of the application
module.exports = sendEmail;