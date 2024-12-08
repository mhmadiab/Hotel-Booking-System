const express = require("express")

const roomRouter = require("./roomRoutes")
const bookingRouter = require("./bookingRoutes")
const userRouter = require("./userRoutes")

const mainRouter = express.Router()

mainRouter.use("/rooms", roomRouter)
mainRouter.use("/bookings", bookingRouter)
mainRouter.use("/users", userRouter)



module.exports = mainRouter