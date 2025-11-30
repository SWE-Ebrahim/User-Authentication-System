// server.js
// Application entry point
// Loads environment variables, connects to database, and starts the server

const dotenv = require('dotenv');
const connectDB = require('./config/Database');

// Load environment variables from .env file
// This makes configuration values available throughout the application
dotenv.config({ path: './.env' });

// Handle uncaught exceptions (synchronous errors)
// Catches errors that are not handled anywhere in the application
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  // Exit the process with failure code
  process.exit(1);
});

// Connect to database before starting server
connectDB().then(() => {
  console.log('Database connected successfully');
  
  // Import the Express app after database connection is established
  const app = require('./app');

  // Get port from environment variables or use default port 5000
  const port = process.env.PORT || 5000;
  
  // Start the server and listen on specified port
  const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });

  // Handle unhandled promise rejections (async errors)
  // Catches async errors that are not properly handled
  process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err.name, err.message);
    // Close server and exit process
    server.close(() => {
      process.exit(1);
    });
  });
}).catch(error => {
  // Handle database connection errors
  console.error('Failed to connect to the database:', error);
});