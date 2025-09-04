const express = require("express")
const router = express.Router()

router.use((req, res, next) => {
  req.userCollection = req.app.locals.db.collection("doctors")
  next()
})

router.post("/", async (req, res) => {
  const newUser = req.body
  const result = await req.userCollection.insertOne(newUser)
  res.send(result)
})

router.get("/",async(req,res)=>{
    try {
    const email = req.query.email;

    if (email) {
      const query = { email: email };
      const result = await req.userCollection.findOne(query);
      return res.send(result);
    }

    const users = await req.userCollection.find().toArray();
    res.send(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
})

module.exports = router 
