import express from 'express';
const app = express();
import chalk from 'chalk';
import 'dotenv/config';
import dotenv from 'dotenv';
import connect from './utlis/db.js';
import userRoute from './routes/user.js';
import booksRoute from './routes/book.js';
import favouriteRoute from './routes/favourite.js';

dotenv.config()

connect();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", userRoute);
app.use("/api/v1", booksRoute);
app.use("/api/v1", favouriteRoute);

app.get("/", function(req, res) {
    res.send("Welcome to BookBuddy");
})

app.listen(PORT, function(error) {
    console.log(chalk.blue(`🚀 Server Running on URL http://localhost:${PORT}`));
})
