import mongoose from "mongoose";

// Define the schema for comic book documents in the MongoDB database
const comicBookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    bookAuthor: {
        type: String,
        required: true
    },
    yearOfPublication: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    numberOfPages: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        enum: ['new', 'used'],
        required: true
    },
    description: {
        type: String
    }
},{
    // Automatically add `createdAt` and `updatedAt` timestamps to each document
    timestamps: true
});

// Create a model for the comic book schema, representing the 'ComicBook' collection in the database
const ComicBook = mongoose.model('ComicBook',comicBookSchema);

export default ComicBook;