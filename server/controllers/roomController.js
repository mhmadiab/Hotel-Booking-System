const {Room} = require("../models/index")


const getRooms = async(req, res, next)=>{
  try {
    const rooms = await Room.find()
    if(!rooms){
        res.status(404)
        throw new Error("No rooms found")
    }
    res.status(200).json(rooms)
    
  } catch (error) {
    next(error)
  }
}

const createRoom = async(req, res, next)=>{
    try {

        const room = await Room.create(req.body)
        if(!room){
            res.status(400)
            throw new Error("room not created")
        }
        const rooms = await Room.find()
        return res.status(201).json({message: "room created", rooms})
    } catch (error) {
        next(error)
    }
}

const singleRoom = async(req, res, next)=>{
    try {
        const room = await Room.findById(req.params.id)
        if(!room){
            res.status(400)
            throw new Error("room not found")
        }
        return res.status(200).json({message: "room found", room})
    } catch (error) {
        next(error)
    }
}

const UpdateRoom = async (req, res, next) => {
    try {
        const room = await Room.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        if (!room) {
            res.status(404)
            throw new Error("room not found")
        }
        res.status(200).json({ message: "Room updated", room });

    } catch (error) {
        next(error);
    }
};

const deleteRoom = async(req, res, next)=>{
    try {
        const room = await Room.findByIdAndDelete(req.params.id)
        if(!room){
            res.status(404)
            throw new Error("room not found")
        }
        return res.status(200).json({message : "room successfully deleted", room})
    } catch (error) {
        next(error)
    }
}

module.exports = {getRooms, createRoom, singleRoom, UpdateRoom, deleteRoom}