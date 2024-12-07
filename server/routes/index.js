const express = require("express")

const roomRouter = require("./roomRoutes")
const bookingRouter = require("./bookingRoutes")

const mainRouter = express.Router()

mainRouter.use("/rooms", roomRouter)
mainRouter.use("/bookings", bookingRouter)



module.exports = mainRouter