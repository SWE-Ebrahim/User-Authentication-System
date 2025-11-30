// config/Database.js
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    // Establish connection to MongoDB using DATABASE environment variable
    const conn = await mongoose.connect(process.env.DATABASE, {
      // Options for better connection handling can be added here
      // Example options:
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    });

    // Log successful connection with host information
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Return connection object for further use if needed
    return conn;
  } catch (error) {
    // Log error message with proper formatting
    console.error(`Error: ${error.message}`);
    
    // Exit process with failure code
    process.exit(1);
  }
};

// Export the connectDB function for use in other modules
module.exports = connectDB;