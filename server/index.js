import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import Router from './routes/route.js';

dotenv.config();

const app = express();

app.use('/', Router);

const PORT = 8000;


app.listen(PORT, ()=>{
    console.log(`server started successfully on PORT ${PORT}`)
});

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);