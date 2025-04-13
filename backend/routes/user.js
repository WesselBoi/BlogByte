const express = require('express');
const {handleUserSignUp , handleUserLogin , fetchProfile}= require("../controllers/user")

const router = express.Router();

router.post("/" ,handleUserSignUp)
router.post("/login" ,handleUserLogin)
router.get("/profile" , fetchProfile)

module.exports = router