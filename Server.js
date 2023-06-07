const express = require('express');
const dotEnv = require('dotenv').config();
const app = express();
const errorHanlder = require('./middleware/errorHanlder');
const connectDb = require('./config/dbConnection');

const PORT = process.env.PORT;

connectDb();

app.use(express.json());
app.use('/api/contacts',require('./routes/contactRoutes'));
app.use(errorHanlder);

app.listen(PORT,()=>{
    console.log(`server started on ${PORT}...`);
});