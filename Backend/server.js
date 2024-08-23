require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.DB_URL).then(() => console.log("Server connected to DB..."));

app.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      
      if (!user) return res.status(401).send('User Not Found');
  
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      
      if (!validPassword) return res.status(400).send("Incorrect Password");
  
      const token = jwt.sign({ _id: user._id }, process.env.SECRETKEY);
      res.header('Authorization', token).send(token);
    } catch (err) {
      console.log(err); // log the error for debugging
      return res.status(500).send("An unexpected error occurred"); 
    }
  })

  app.get("/profile", verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.user);
      
      if (!user) return res.status(404).send("User not found");
      const _userAdress = user
      res.sendStatus(200);
    } catch (err) {
      console.log(err); // log the error for debugging
      return res.send("Not Found")
    }
  })
  .post("/register", async(req, res) => {
    try {
      const existing_user = await User.findOne({ email: req.body.email });
      if(existing_user) {
        return res.sendStatus(400);
      }
      const salt = await bcrypt.genSalt(process.env.saltRounds);
      const hash = await bcrypt.hash(req.body.password, salt);

      const user = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
      }

      await User.create(user);
      res.sendStatus(200);
    } catch (err) {
      console.log("Error: " + err);
      res.sendStatus(500);
    }
  });

  async function verifyToken(req, res, next) {
    const token = req.header('Authorization').split('=')[1];
    if (!token || token == 'Bearer null') return res.status(200).send("Access denied");
    try{
      const decodedPayload = jwt.verify(token, process.env.SECRETKEY);
      req.user = decodedPayload._id;
      next(); 
    } catch (err) {
       console.log(err); // log the error for debugging
       return res.status(401).send("Invalid token"); 
     }
  }
  
  app.listen(3000, () => console.log("Server Started..."));