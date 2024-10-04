const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const jobCollection = client.db('kormikDB').collection('jobs')
    const bidCollection = client.db('kormikDB').collection('bids')

    // api-s

    // category api
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
      // test purpose
      // console.log(category)
      let query = { category : category};
      const options = {
        projection: { subCategories: 1}
      }
      const result = await categoriesCollection.findOne(query, options);
      res.send(result)

    })

    // user api
    app.post("/users", async(req,res) =>{
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    })
    // app.get("/users", async(req,res) =>{
    //   let query = {};
    //   const result = await userCollection.find(query).toArray();
    //   res.send(result)
    // })
    app.get("/users", async(req,res) =>{
      let query = {};
      if(req.query.email){
        query = {email: req.query.email}
      };
      const result = await userCollection.findOne(query);
      // test purpose
      // console.log(req.query.email)
      // console.log(result)
      res.send(result)
    })
    // job api
    app.post("/jobs", async(req,res) =>{
      const job = req.body;
      const result = await jobCollection.insertOne(job);
      res.send(result)
    })
    app.get("/jobs", async(req, res) =>{
      let query = {};
      let jobPosterMail = req.query.jobPosterMail
      if(req.query){
        if(req.query.title){
          query = {title: { $regex: req.query.title, $options: 'i' }}
        }
        if(req.query.category){
          query = {category: req.query.category}
        }
        if(req.query.subCategory){
          query = {subCategory: req.query.subCategory}
        }
        if(req.query.jobType){
          query = {jobType: req.query.jobType}
        }
        if(req.query.jobPosterMail){
          query= {jobPosterMail}
        }
      }
      // console.log(query)
      const result = await jobCollection.find(query).toArray();
      res.send(result)
    })
    app.get("/jobs/:id", async(req,res) =>{
      const id = new ObjectId(req.params.id);
      const query = {_id: id};
      const result = await jobCollection.findOne(query);
      res.send(result)
    })
    // bids api
    app.post("/bids", async(req, res) =>{
      const bid = req.body;
      const result = await bidCollection.insertOne(bid);
      res.send(result)
    })
    app.get("/bids", async(req, res) =>{
      let query = {};
      let bidderEmail = req.query.bidderEmail
      if(req.query.jobId){
        const jobId = req.query.jobId
        query = {jobId: jobId}
      }
      if(req.query.bidderEmail){
        query = {bidderEmail}
      }
      console.log(query)
      const result = await bidCollection.find(query).toArray();
      res.send(result)
    })
    app.delete("/bids/:id", async(req,res) =>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await bidCollection.deleteOne(query);
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