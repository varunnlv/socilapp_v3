// const storage = multer.memoryStorage(); // Store file in memory
// const upload = multer({ storage: storage });

// app.post('/api/upload', upload.single('file'), (req, res) => {
//     // Access the file data in req.file.buffer
//     // Save the file data to SQL or perform other operations
//     // For simplicity, let's assume you have a function saveFileToSQL
//     // that saves the file to SQL. Adjust it based on your SQL setup.

//     const fileName = req.file.originalname; // You can use any unique identifier
//     const fileData = req.file.buffer;

//     // Example: Save the file to SQL
//     saveFileToSQL(fileName, fileData);

//     res.status(200).send('File uploaded successfully');
// });



// Importing the Express module to create an Express application
import express from "express";
// const app = express();

// Importing route modules for different endpoints
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import relationshipRoutes from "./routes/relationships.js";
import messagingRoutes from "./routes/messaging.js";

// Importing middleware for enabling CORS (Cross-Origin Resource Sharing)
import cors from "cors";

// Importing middleware for handling multipart/form-data, such as file uploads
import multer from "multer";

// Importing middleware for parsing cookies
import cookieParser from "cookie-parser";
import { connectToMongoDB } from "./connect.js";

import { app, server } from "./socket/socket.js";

// Setting up middleware to allow Access-Control-Allow-Credentials
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

// Setting up middleware to parse incoming request bodies as JSON
app.use(express.json());

// Setting up CORS middleware to allow requests from specific origins
app.use(
    cors({
        origin: "https://socialapp-v.netlify.app",
    })
);

// Setting up middleware to parse cookies from incoming requests
app.use(cookieParser());

// Configuring storage settings for multer to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../public"); // Specifies the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname); // Generates a unique filename for the uploaded file
    },
});

// Creating an instance of multer with the configured storage settings
const upload = multer({ storage: storage });

// Handling POST requests to "/api/upload" for file uploads
app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file; // Accessing the uploaded file object
    res.status(200).json(file.filename); // Sending a response with the filename of the uploaded file
});

// Setting up routes for various API endpoints
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api/messaging", messagingRoutes);


// Starting the Express server to listen on port 8800
server.listen(8800, () => {
    connectToMongoDB();
    console.log("API working!");
});
