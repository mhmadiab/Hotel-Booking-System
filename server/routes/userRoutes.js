const {Router} = require("express")
const {getUsers, createUser, logginUser, logoutUser} = require("../controllers/userController")
const {auth} = require("../middleware/authMiddleware")
const userRouter = Router()

userRouter.get("/", auth,  getUsers )
userRouter.post("/", createUser )
userRouter.post("/login", logginUser )
userRouter.get("/logout", logoutUser )


module.exports = userRouter