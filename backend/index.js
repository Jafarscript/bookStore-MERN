import express from "express";
import { PORT, dbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors'



const app = express();

app.use(express.json())


// Middleware for handling CORS POLICY
// Option 1 : Aloow All origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins 


// app.use(
//     cors({
//         origin: 'http://localhost:5050',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

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
