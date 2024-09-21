const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use(express.json());

require('dotenv').config();

// test data
const data = [
    {
        content: 'data1'
    },
    {
        content: 'data2'
    },
    {
        content: 'data3'
    },
    {
        content: 'data4'
    },
    {
        content: 'data5'
    },
    {
        content: 'data6'
    },
]

app.get("/", (req,res) =>{
    res.send('Kormik server is initiated')
})

// test-api-for-axios
app.get("/test", (req,res) =>{
    res.send(data)
})

app.listen(port, ()=>{
    console.log(`Kormik server is running on port: ${port}`)
})