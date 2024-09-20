const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

require('dotenv').config();

app.get("/", (req,res) =>{
    res.send('Kormik server is initiated')
})

app.listen(port, ()=>{
    console.log(`Kormik server is running on port: ${port}`)
})