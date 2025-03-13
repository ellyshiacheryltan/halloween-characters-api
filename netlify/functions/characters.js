const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const serverless = require("serverless-http");
const cors = require('cors');

const app = express();
const router = express.Router();

// Middleware for JSON parsing
app.use(express.json());
app.use(cors());

require("dotenv").config();
const uri = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB:"));

// MongoDB schema for each character
const characterSchema = new mongoose.Schema({
  name: String,
  type: String,
  age: Number,
});

const Character = mongoose.model("Character", characterSchema);

app.use(express.static(path.join(__dirname, "public")));

// Get all characters in the collection
router.get("/characters", async (req, res) => {
  try {
    const characters = await Character.find();
    res.status(200).send(characters);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.use('/.netlify/functions/', router); 
module.exports.handler = serverless(app);