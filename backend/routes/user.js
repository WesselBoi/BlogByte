const express = require('express');
const {handleUserSignUp , handleUserLogin , fetchProfile , handleUserLogout}= require("../controllers/user")

const router = express.Router();

router.post("/" ,handleUserSignUp)
router.post("/login" ,handleUserLogin)
router.get("/profile" , fetchProfile)
router.post("/logout" , handleUserLogout)

// Route to check if user is still logged in based on cookie
router.get('/check', (req, res) => {
    if (req.session && req.session.userId) {
      res.json({ loggedIn: true });
    } else {
      res.json({ loggedIn: false });
    }
  });
  

module.exports = router