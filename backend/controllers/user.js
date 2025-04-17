const {v4 : uuidv4} = require('uuid')
const USER = require("../models/user")
const {setUser , getUser} = require("../service/auth")

async function handleUserSignUp(req, res) {
    try {
      const { name, email, password } = req.body;
      
      if (!name || !email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
      }
      
      // Check if user already exists
      const existingUser = await USER.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ msg: "User with this email already exists" });
      }
      
      // Create new user with hashed password
      await USER.create({
        name,
        email,
        password, 
      });
      
      return res.status(201).json({ msg: "User created successfully" });
    } catch (error) {
      console.error('Signup error:', error);
      return res.status(500).json({ msg: "Server error" });
    }
  }

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;
        
        // Find user by email only (not by password)
        const user = await USER.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        
        
        const isPasswordValid = (user.password === password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const token = setUser(user)
        res.cookie("uid" , token)

        return res.status(200).json({ 
            msg: "Logged in successfully",
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ msg: "Server error" });
    }
}



function fetchProfile(req,res){
    const sessionId = req.cookies?.uid
    const user = getUser(sessionId)

    if (!user) {
        return res.status(401).json({ msg: "Unauthorized. Please log in." });
    }

    try {
        return res.status(200).json({
            msg: "User profile fetched successfully",
            profile: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (err) {
        console.error("Error fetching profile:", err);
        return res.status(500).json({ msg: "Internal server error" });
    }

}


function handleUserLogout(req,res) {
    try {
        // Clear the JWT cookie
        res.clearCookie('uid');
        return res.status(200).json({ message: 'Logged out successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
}


module.exports={
    handleUserSignUp,
    handleUserLogin,
    fetchProfile,
    handleUserLogout
}