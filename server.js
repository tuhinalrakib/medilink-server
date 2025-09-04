const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000
dotenv.config()

// routes
const authRoutes = require("./routes/authRoutes")
// const jwtRoutes = require("./routes/jwtRoutes")

const app = express()
app.use(cookieParser())

// global middlewares
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true, // if you're sending cookies/auth headers
}));

app.use(express.json());

// base route
app.get('/', async (req, res) => {
    res.send('Real Estate Platform API is running 🚀');
});

const uri = `${process.env.MONGO_URI}`;

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
        // await client.connect();
        db = client.db("medilink");
        app.locals.db = db;

        
        // app.use("/jwt", jwtRoutes)
        app.use("/auth", authRoutes)

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



// start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});