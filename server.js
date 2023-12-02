const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

// Loading the environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB connection URI)
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1); // Exiting with a non-zero code to indicate an error
  }
};

connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());
// Routes
const designersRouter = require("./routes/design");
app.use("/", designersRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
