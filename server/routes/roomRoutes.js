const {Router} = require("express")
const {getRooms, createRoom, singleRoom, UpdateRoom, deleteRoom} = require("../controllers/roomController")

const {auth} = require("../middleware/authMiddleware")

const roomRouter = Router()

roomRouter.get("/", getRooms)

roomRouter.get("/:id", singleRoom)

roomRouter.post("/", auth ,createRoom)

roomRouter.put("/:id" , auth ,UpdateRoom)

roomRouter.delete("/:id", auth ,deleteRoom)

module.exports = roomRouter