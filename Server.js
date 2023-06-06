const express = require('express');
const dotEnv = require('dotenv').config();
const app = express();


const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server started on ${PORT}...`);
});