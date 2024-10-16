import express from "express";

import { 
    createComicBook,
    updateComicBook,
    deleteComicBook,
    getAllComicBooks,
    getComicBookById
} from "../controllers/comicBook.controller.js";

const router = express.Router();

router.post('/comics',createComicBook); // Creating Comic Book
router.put('/comics/:id',updateComicBook); //Update Comic Book data
router.delete('/comics/:id',deleteComicBook); // Deleting Data

//Comic Book List API
router.get('/comics',getAllComicBooks);

// Comic Books Details API 
router.get('/comics/:id',getComicBookById);

export default router;