import ComicBook from "../models/comicBook.model.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { AppError } from "../utils/appError.js";

// Create a Comic Book
const createComicBook = asyncHandler( async (req, res, next) => {
    const { bookName, bookAuthor, yearOfPublication, price, numberOfPages, condition} = req.body;

    // Check if any of the required fields are missing
    if(!bookName || !bookAuthor || !yearOfPublication || !price || !numberOfPages || !condition){

        // If fields are missing, create and pass an AppError to the next middleware
        return next(new AppError('Please fill in all fields', 400));

    }

    const bookExists = await ComicBook.findOne({bookName});

    if(bookExists){
        return next(new AppError('Comic Book already exists', 400));
    }

    // Create a new instance of the ComicBook model using the request body
    const newComicBook = new ComicBook(req.body);

    if(!newComicBook){
        return next(new AppError('Failed to create comic book', 500));
    }

    // Save the new comic book instance to the database
    await newComicBook.save();

    res.status(201).json({
        success: true,
        message: "Book data stored successfully",
        data: newComicBook
    });
});

// Edit a Comic Book 
const updateComicBook = asyncHandler( async (req, res, next) => {
    // Extract the ID from the route parameters
    const { id } = req.params;

    if(!id){
        return next(new AppError('Please provide a valid id', 400));
    }

    // Use findByIdAndUpdate to update the comic book with the provided ID
    const comicBook = await ComicBook.findByIdAndUpdate(
        id,
        req.body,
        {new: true}
    );

    if(!comicBook){
        return next(new AppError('Failed to update comic book', 500));
    }

    res.status(200).json({
        success: true,
        message: "Book data updated successfully",
        data: comicBook
    });
});

// Delete a Comic Book
const deleteComicBook = asyncHandler( async (req, res, next) => {
    // Extract the ID from the route parameters
    const { id } = req.params;

    if(!id){
        return next(new AppError('Please provide a valid id', 400));
    }

    // Attempt to delete the comic book with the specified ID
    const deletedComicBook = await ComicBook.findByIdAndDelete(id);

    if(!deleteComicBook){
        return next(new AppError('Failed to delete comic book', 500));
    }

    res.status(200).json({
        success: true,
        message: "Book data deleted successfully",
        data: {}
    });
});

// Fetch Inventory List with Pagination, Filtering, and Sorting
const getAllComicBooks = asyncHandler( async (req, res, next) => {
    // Extract pagination, filtering, and sorting parameters from the request query
    const { bookAuthor, yearOfPublication, price, condition, page=1, limit=10, sortBy='bookName', order = 'asc' } = req.query;

    // Build a filter object dynamically based on the available query parameters
    const filter = {
        ...(bookAuthor && { bookAuthor }),
        ...(yearOfPublication && { yearOfPublication }),
        ...(price && { price: { $lte: price } }),
        ...(condition && { condition })
    };

    const sortOrder = order === 'desc' ? -1 : 1;
    const sortOptions = { [sortBy]: sortOrder };
    
    // Perform the database query using the filter, sorting, pagination logic
    const comicBooks = await ComicBook.find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .sort(sortOptions);

    const totalComicBooks = await ComicBook.countDocuments(filter);
    
    // If no comic books are found
    if (!comicBooks || comicBooks.length === 0) {
        return next(new AppError('No comic books found matching the criteria', 404));
    }

    res.status(200).json({
        success: true,
        message: "Comic book data fetched successfully",
        total: totalComicBooks,
        limit: Number(limit),
        data: comicBooks
    });

});

// Get Comic Book Details by ID
const getComicBookById = asyncHandler( async (req, res, next) => {
    const id = req.params.id;

    if(!id){
        return next(new AppError('Please provide a valid comic book ID', 400));
    }

    // Try to find the comic book by its ID in the database
    const comicBook = await ComicBook.findById(id);

    if(!comicBook){
        return next(new AppError('No comic book found with the given ID', 404));
    }

    res.status(200).json({
        success: true,
        message: "Comic book data fetched successfully",
        data: comicBook
    })
});

// Exporting all comic book related functions together
export {
    createComicBook,
    updateComicBook,
    deleteComicBook,
    getAllComicBooks,
    getComicBookById
};
