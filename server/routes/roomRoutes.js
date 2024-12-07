const {Router} = require("express")
const {getRooms, createRoom, singleRoom, UpdateRoom, deleteRoom} = require("../controllers/roomController")

const roomRouter = Router()

roomRouter.get("/", getRooms)

roomRouter.get("/:id", singleRoom)

roomRouter.post("/", createRoom)

roomRouter.put("/:id" , UpdateRoom)

roomRouter.delete("/:id", deleteRoom)

module.exports = roomRouter