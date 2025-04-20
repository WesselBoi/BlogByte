const express = require('express');
const cors = require('cors');
const blogRoutes = require('./routes/blogs');
const userRoutes = require('./routes/user')
const {restrictToLoggedinUserOnly} = require("./middlewares/auth")
const connectToMongoDb = require('./connection');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT
require('dotenv').config();
const mongoUrl = process.env.MONGO_URL;

connectToMongoDb(mongoUrl)
.then(()=> console.log("Connected to MongoDB successfully"))
.catch((err)=> console.log("Error connecting to MongoDB : " , err))

const app = express();

app.use(cors({
    origin: [
        'http://localhost:5173', 
        'https://blog-byte-u3g4.vercel.app'
      ],
    credentials: true 
}))

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());

app.use("/blogs" , restrictToLoggedinUserOnly , blogRoutes)
app.use("/user" , userRoutes)
app.get("/" , (req,res) =>{
    return res.end('backend is running')
})

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))

