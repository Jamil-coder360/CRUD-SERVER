const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
const uri = process.env.MONGODB_URI;

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

    const db = client.db("crud")
     const productCollection = db.collection("product");

     app.post("/product", async(req,res)=>{
        const product = req.body ;
        const result = await productCollection.insertOne(product);
        res.json(result);
     })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req,res)=>{
    res.send("server is running")
})

app.listen(PORT,()=>{
    console.log(`this app is runnig on port ${PORT}`);
})