import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import todo from './api/todos.js';
import auth from './api/auth.js';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(fileUpload({}));
app.use(express.json());
app.use(cors());
app.use(express.static('static'));
app.use('/', todo);
app.use('/', auth);

const PORT = process.env.PORT || 5000;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@todos.qnwfggc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    )
    .then(() => {
        console.log('Connected to MongoDB!');
        app.listen(PORT, () => {
            console.log('Server running...');
        });
    });
