import express from "express";

import { config } from "dotenv";
config();

const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Import routes for managing comic books
import comicBookRoutes from "./routes/comicBook.routes.js";

// Use the comic book routes
app.use('/api/v1',comicBookRoutes);

// Catch-all route for any undefined routes
app.use('*',(req,res) => {
    res.status(404).send("OPPS!! 404 page not found")
});

export {app}