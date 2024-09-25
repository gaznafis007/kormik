const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();
const data  = require('./data/categories.json')

// middleware
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use(express.json());

require('dotenv').config();



app.get("/", (req,res) =>{
    res.send('Kormik server is initiated')
})

// test-api-for-axios




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
    // MongoDB collections
    const categoriesCollection = client.db('kormikDB').collection('categories');
    const userCollection = client.db('kormikDB').collection('users');

    // api-s
    app.get("/categories", async(req,res) =>{
        const query = {}
        const options = {
            projection: {category: 1}
        }
        const result = await categoriesCollection.find(query, options).toArray()
        res.send(result)
    })
    app.get("/subCategories/:subCategories", async(req,res) =>{
      const category = req.params.subCategories
      console.log(category)
      let query = { category : category};
      const options = {
        projection: { subCategories: 1}
      }
      const result = await categoriesCollection.findOne(query, options);
      res.send(result)

    })
    app.post("/users", async(req,res) =>{
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    })
    app.get("/users", async(req,res) =>{
      let query = {};
      const result = await userCollection.find(query).toArray();
      res.send(result)
    })
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, ()=>{
    console.log(`Kormik server is running on port: ${port}`)
})