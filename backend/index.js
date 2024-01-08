import express from "express";
import { PORT, dbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";



const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send("Welcome to My first Book Store")
})

// Route to get all books

app.get('/books', async (req, res) => {
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

// Save new book Route
app.post('/books', async (req, res) => {
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



mongoose
.connect(dbURL)
.then(() => {
    console.log('Applicated connected to DB')
    app.listen(PORT, () => {
        console.log(`Application running on port: ${PORT}`)
    })
})
.catch((error) => {
    console.log(error)
})
