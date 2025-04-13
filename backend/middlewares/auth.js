const {getUser} = require("../service/auth")

async function restrictToLoggedinUserOnly (req,res,next) {
    const userUid = req.cookies?.uid

    if(!userUid) return res.status(401).json({ msg: "Unauthorized: Login required" });

    const user = getUser(userUid)


    if(!user) return res.status(401).json({ msg: "Unauthorized: Invalid session" });

    req.user = user


    next()
}

module.exports = {
    restrictToLoggedinUserOnly
}