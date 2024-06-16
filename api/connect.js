// Importing the 'mysql' module for interacting with MySQL databases
import mysql from "mysql";
import mongoose from "mongoose";



// Creating a MySQL database connection using the 'createConnection' method
// and assigning it to the constant 'db'
export const db = mysql.createConnection({
    // Specifies the host where the MySQL server is running
    host: "localhost",
    // Specifies the username used to authenticate against the MySQL server
    user: "root",
    // Specifies the password used to authenticate against the MySQL server
    password: "2711999@vV",
    // Specifies the default database to use when performing queries
    database: "system"
});



export const connectToMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://ennalvin:5Xb94w7LrUZweP3i@cluster59.zzrmlfx.mongodb.net/Chat-app?retryWrites=true&w=majority&appName=Cluster59");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
};


