const express = require("express");
const app = express();
const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017")
.then(()=>console.log("MongoDb Connected"))
.catch(err=>console.log("MongoDb not connected "))

app.listen(3000, () => {
    console.log("Server Start");
});