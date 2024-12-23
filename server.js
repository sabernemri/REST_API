const express = require('express');
const mongoose= require("mongoose"); 
require("dotenv").config(); 
const userRouter=require("./models/user")
const app = express();
const port = 7000;
app.use(express.json());
mongoose.connect("mongodb+srv://sabernemri:saber12345@cluster0.6cnqr.mongodb.net/")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB:', err));

app.use("/user",userRouter)

















app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});