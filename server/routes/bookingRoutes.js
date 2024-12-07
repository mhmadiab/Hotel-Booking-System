const {Router} = require("express")
const {getBookings, createBooking, updateBooking, deleteBooking, singleBooking} = require("../controllers/bookingsController")
const bookingRouter = Router(); 

bookingRouter.get("/", getBookings)
bookingRouter.get("/:id", singleBooking)
bookingRouter.post("/", createBooking)
bookingRouter.put("/:id", updateBooking)
bookingRouter.delete("/:id", deleteBooking)

module.exports = bookingRouter