const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MongoDB schema for Posts
const postSchema = new mongoose.Schema({
  userId: String,
  content: String,
  imageUrl: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: [{ userId: String, comment: String, createdAt: Date }]
});

const Post = mongoose.model('Post', postSchema);

// API endpoint to create a new post
app.post('/api/posts', async (req, res) => {
  const { userId, content, imageUrl, tags } = req.body;
  const newPost = new Post({ userId, content, imageUrl, tags });
  await newPost.save();
  res.status(201).send(newPost);
});

// API endpoint to get posts (with pagination)
app.get('/api/posts', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.status(200).send(posts);
});

// API endpoint to like a post
app.put('/api/posts/:postId/like', async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  post.likes += 1;
  await post.save();
  res.status(200).send(post);
});

// API endpoint to add a comment to a post
app.post('/api/posts/:postId/comments', async (req, res) => {
  const { postId } = req.params;
  const { userId, comment } = req.body;
  const post = await Post.findById(postId);
  post.comments.push({ userId, comment, createdAt: new Date() });
  await post.save();
  res.status(201).send(post);
});

// Connect to MongoDB and start the server
mongoose.connect('mongodb://localhost/alumni', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3000, () => console.log('Server running on port 3000')))
  .catch(err => console.error('Could not connect to MongoDB...', err));
