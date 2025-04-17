const express = require('express');
const {handleUserSignUp , handleUserLogin , fetchProfile , handleUserLogout}= require("../controllers/user")

const router = express.Router();

router.post("/" ,handleUserSignUp)
router.post("/login" ,handleUserLogin)
router.get("/profile" , fetchProfile)
router.post("/logout" , handleUserLogout)

module.exports = router