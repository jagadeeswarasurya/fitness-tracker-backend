const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const dbUrl = "localhost:27017"; // Local MongoDB URL
const dbName = process.env.DB_NAME || "fitness_tracker"; // Database name

// Cloud DB credentials
const dbPassword = process.env.DB_PASSWORD || "";
const dbUsr = process.env.DB_USERNAME || "";
const dbCluster = process.env.DB_CLUSTER || "";

// Local MongoDB connection string
const localUrl = `mongodb://${dbUrl}/${dbName}`; 

// Cloud MongoDB connection string (e.g., MongoDB Atlas)
const cloudUrl = `mongodb+srv://${dbUsr}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

// Mongoose connection function
const connectViaMongoose = async () => {
  try {
    const url = dbUsr && dbPassword && dbCluster ? cloudUrl : localUrl; 
    await mongoose.connect(url); 
    console.log("Mongoose Connected Successfully to", url);
  } catch (e) {
    console.error("Error connecting to database", e);
    process.exit(1); // Exit on connection failure
  }
};

module.exports = connectViaMongoose;
