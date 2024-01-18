import express from "express";
import { PORT, dbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors'



const app = express();

app.use(
    cors({
        origin: 'http://localhost:5050',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)
app.use(express.json())

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send("Welcome to My first Book Store")
})

app.use('/books', booksRoute)




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
