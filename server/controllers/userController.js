const {User} = require("../models/index")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        if(!users){
            res.status(404)
            throw new Error("cannot find users")
        }
        return res.status(200).json(users)
        
    } catch (error) {
        next(error)
    }
}

const createUser = async(req, res, next)=>{
    try {
        const {password, ...rest} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            ...rest, 
            password : hashPassword
        })
        if(!user){
            res.status(400)
            throw new Error("user not created")
        }

        //not sending password in response
        const {password : userPassword,  ...restdData} = user._doc
        return res.status(201).json({message : "user created successfully ",restdData})
        
    } catch (error) {
        next(error)
    }
}

const logginUser = async(req, res, next)=>{
     try {
        const { email , password } = req.body
        const user = await User.findOne({email})
        if(!user){
            res.status(404)
            throw new Error("user not found")
        }
        
        const isCorrect =  await bcrypt.compare(password , user.password)
        if(!isCorrect){
            res.status(400)
            throw new Error("incorrect password")
        }
        //generate token:
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET)
        res.cookie("jwt", token)
        const {password : userPassword,  ...restdData} = user._doc
        return res.status(200).json({
            ...restdData,
        })
        
     } catch (error) {
        next(error)
     }

}

const logoutUser = async(req, res, next)=>{
    res.cookie("jwt", " ", {expiresIn : "-1"})
    return res.json({message : "you have been logged out"})
}

module.exports = {
    getUsers, 
    createUser,
    logginUser,
    logoutUser
}