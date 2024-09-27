import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Configuration variables for the database
const dbName = process.env.DB_NAME || "";
const dbPassword = process.env.DB_PASSWORD || "";
const dbUsr = process.env.DB_USERNAME || "";
const dbCluster = process.env.DB_CLUSTER || "";

// Creating the cloud MongoDB connection URL
const cloudUrl = `mongodb+srv://${dbUsr}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

// Connecting to the database asynchronously
const connectViaMongoose = async () => {
  try {
    await mongoose.connect(cloudUrl);
    console.log("Mongoose Connected Successfully");
  } catch (e) {
    console.error("Error connecting to database", e);
    process.exit(1);
  }
};

// Export the connection function using ES Module syntax
export default connectViaMongoose;
