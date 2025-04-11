const express = require('express');
const cors = require('cors');
const blogRoutes = require('./routes/blogs');
const connectToMongoDb = require('./connection');

const PORT = 8000
const mongoUrl= "mongodb://127.0.0.1:27017/blogs"

connectToMongoDb(mongoUrl)
.then(()=> console.log("Connected to MongoDB successfully"))
.catch((err)=> console.log("Error connecting to MongoDB : " , err))

const app = express();

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use("/blogs" , blogRoutes)

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))

