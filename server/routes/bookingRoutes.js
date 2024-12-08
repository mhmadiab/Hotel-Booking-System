const {Router} = require("express")
const {getBookings, createBooking, updateBooking, deleteBooking, singleBooking} = require("../controllers/bookingsController")
const bookingRouter = Router(); 
const {auth} = require("../middleware/authMiddleware")

bookingRouter.get("/", auth, getBookings)
bookingRouter.get("/:id", auth, singleBooking)
bookingRouter.post("/",   createBooking)
bookingRouter.put("/:id", auth,  updateBooking)
bookingRouter.delete("/:id", auth,  deleteBooking)

module.exports = bookingRouter