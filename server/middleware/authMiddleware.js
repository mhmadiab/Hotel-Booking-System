const jwt = require("jsonwebtoken")
const User = require("../models/userModal")


const auth = async(req, res, next)=>{
    try {
        const token =  req.cookies.jwt
        if(!token){
            return res.status(401).json({error: "not authorized" })
        }
        //verify token by decoding:
        const data = jwt.verify(token, process.env.JWT_SECRET)
        const authUser =  await User.findById(data.id)
        if(!authUser){
            res.status(400).json({message : "invalid user"})
        }
        req.user = authUser
        next()
    } catch (error) {
        // console.log(error)
        return res.status(400).json({message : "no token"})
    }
}



module.exports = {
    auth
}