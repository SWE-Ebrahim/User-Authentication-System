// app.js
// Main Express application file
// Sets up middleware, routes, and error handling for the application

const express = require('express');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./controllers/ErrorController');

// Import security middleware functions
// These help protect the application from common web vulnerabilities
const {
  setSecurityHeaders,    // Sets secure HTTP headers
  rateLimiter,           // Limits requests to prevent abuse
  mongoSanitize,         // Sanitizes data to prevent NoSQL injection
  xssClean,              // Cleans data to prevent XSS attacks
  preventParamPollution, // Prevents parameter pollution attacks
  enableCors             // Enables Cross-Origin Resource Sharing
} = require('./middlewares/Security');

// Import route definitions
const routes = require('./routes/Index');

// Create Express application instance
const app = express();

// Body parsing middleware
// Parses incoming JSON and URL-encoded data in request bodies
app.use(express.json({ limit: '10kb' })); // Limit JSON payload size to 10kb
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // Parse URL-encoded data
app.use(cookieParser()); // Parse cookies from incoming requests

// Apply security middleware
// These are applied in a specific order for maximum effectiveness
app.use(setSecurityHeaders);     // Set HTTP security headers first
app.use(enableCors);             // Enable CORS for frontend communication
app.use(rateLimiter);            // Apply rate limiting to all requests
app.use(mongoSanitize);          // Sanitize data against NoSQL injection
app.use(xssClean);               // Clean data against XSS attacks
app.use(preventParamPollution);  // Prevent parameter pollution

// Mount all API routes
// All routes will be prefixed with /api/v1
app.use('/api/v1', routes);

// Global error handling middleware
// Catches any unhandled errors and sends appropriate responses
app.use(globalErrorHandler);

// Export the configured Express app for use in server.js
module.exports = app;