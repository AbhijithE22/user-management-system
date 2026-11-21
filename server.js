// Environment Variables
import "./config/env.js"
// App
import app from "./app.js";

// Database
import connectDB from "./config/db.js";

// Port
const PORT = process.env.PORT || 3000;

// Start Server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express Server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

// Execute
startServer();