const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y3lqi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.listen(port, ()=>{
    console.log(`Kormik server is running on port: ${port}`)
})