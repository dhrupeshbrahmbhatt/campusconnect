require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); 
const ObjectId = require('mongodb').ObjectId; // for Auth purpose
const cors = require('cors');
const User = require('./model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Server connected to DB..."))
  .catch(err => console.log("Error in MongoDB connection: " + err));

app.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      
      if (!user) return res.status(401).send('User Not Found');
  
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      
      if (!validPassword) return res.status(400).send("Incorrect Password");
  
      const token = jwt.sign({ _id: user._id }, process.env.SECRETKEY);
      console.log("User is authenticateed..")
      res.header('Authorization', `Bearer ${token}`).send(token);
    } catch (err) {
      console.log(err); // log the error for debugging
      return res.status(500).send("An unexpected error occurred"); 
    }
  });

app.get("/profile", verifyToken, async (req, res) => {
    if (req.user) {
      console.log(req.user)
      try {
        const user = await User.findById(req.user._id);
        console.log(user);
        if (!user) return res.status(404).send("User not found");
        res.send({ user: user });
      } catch(err) {
        console.log(err);
        return res.sendStatus(400);
      }
    }
});

app.post("/signup", async(req, res) => {
    try {
      console.log(req.body); // Use req.body to log POST data
      const existing_user = await User.findOne({ email: req.body.email });
      if (existing_user) {
        return res.status(400).send("User already exists");
      }
      
      const saltRounds = process.env.saltRounds ? Number(process.env.saltRounds) : 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(req.body.password, salt);

      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        name: req.body.name,
        email: req.body.email,
        password: hash,
      };
      
      await User.create(user);
      res.sendStatus(200);
    } catch (err) {
      console.log("Error: " + err);
      res.sendStatus(500);
    }
});
app.get("/chats", verifyToken, (req, res) => {
  let response = [
    {
      "id": "1",
      "name": "GC1",
      "lastMessage": "Hey there",
      "lastMessageTime": "2023-10-01T12:34:56Z",
      "participants": [
        { "id": "user1", "name": "Alice" },
        { "id": "user2", "name": "Bob" }
      ],
      "unreadCount": 2
    },
    {
      "id": "2",
      "name": "GC2",
      "lastMessage": "What's up",
      "lastMessageTime": "2023-10-01T11:20:30Z",
      "participants": [
        { "id": "user3", "name": "Charlie" },
        { "id": "user4", "name": "Dana" }
      ],
      "unreadCount": 0
    }
  ]
  res.send(response);
})

app.get("/$chatId/message", verifyToken, (req, res) => {
  let response = [
    {
      "id": "msg1",
      "chatId": "1",
      "sender": {
        "id": "user1",
        "name": "Alice"
      },
      "content": "Hey there!",
      "timestamp": "2023-10-01T12:35:00Z",
      "isRead": true
    },
    {
      "id": "msg2",
      "chatId": "1",
      "sender": {
        "id": "user2",
        "name": "Bob"
      },
      "content": "Hi Alice, how are you?",
      "timestamp": "2023-10-01T12:36:00Z",
      "isRead": false
    }
  ];
  res.send(response);
})

async function verifyToken(req, res, next) {
    const token = req.header('Authorization') && req.header('Authorization').split('=')[1];
    console.log(token);
    if (!token) return res.status(401).send("Access denied");
    
    try {
      const decodedPayload = jwt.verify(token, process.env.SECRETKEY);
      console.log(decodedPayload);
      req.user = decodedPayload;
      next(); 
    } catch (err) {
      console.log(err); // log the error for debugging
      return res.status(401).send("Invalid token"); 
    }
}
  
app.listen(3000, () => console.log("Server Started..."));
