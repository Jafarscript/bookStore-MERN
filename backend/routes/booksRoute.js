 import express from 'express';
 import { Book } from '../models/bookModel.js';

 const router = express.Router();


 // Route to get all books

router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})

        return res.status(201).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        return res.status(505).send({message : error.message})
    }
})

// get book by id

router.get('/:id', async (req, res) => {
    try {

        const { id } = req.params
        const book = await Book.findById(id)

        return res.status(201).json({book})
    } catch (error) {
        console.log(error.message)
        return res.status(505).send({message : error.message})
    }
})


// Save new book Route
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishedYear
        ){
            return res.status(404).send({
                message: "Send all the require: title, author, publishedYear"
            });
        }

        const newBook = {
            title : req.body.title,
            author: req.body.author,
            publishedYear: req.body.publishedYear
        }

    const book = await Book.create(newBook)
    return res.status(201).send(book)
    } catch (error) {
        console.log(error.message)
        res.status(505).send({message: error.message})
    }
})

// Update a book Route

router.put('/:id', async(req, res) => {
    try {

        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishedYear
        ){
            return res.status(404).send({
                message: "Send all the require: title, author, publishedYear"
            });
        }

        const { id } = req.params
        const result = await Book.findByIdAndUpdate(id, req.body)

        if(!result){
            return res.status(404).send('Book not found')
        }

        return res.status(200).send({message: 'Book update successfully'})


        
    } catch (error) {
        console.log(error.message)
        return res.status(505).send({message : error.message})
    }
})

// Delete a book route    
router.delete('/:id', async(req, res) => {
    try {
        const {id} = req.params

        const result = await Book.findByIdAndDelete(id)

        if(!result){
            return res.status(404).json({message: "Book not Found"})
        }

        return res.status(200).send({message: "Book deleted successfully"})
        
    } catch (error) {
        console.log(error.message)
        return res.status(505).send({message: error.message})
    }
})

export default router;