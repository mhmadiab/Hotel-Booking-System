const Booking = require("../models/bookingsModal")


const getBookings = async(req, res, next) => {
    try {
        const bookings = await Booking.find()
        if(!bookings){
            res.status(404).json({message : "no bookings yet"})
        }
        return res.status(200).json(bookings)
        
    } catch (error) {
        next(error)
    }
}

const createBooking = async(req, res , next)=>{
    try {
        const booking = await Booking.create(req.body)
        if(!booking){
            res.status(400)
            throw new Error("booking not created")
        }
        return res.status(201).json({message : "new booking successfully placed", booking})
        
    } catch (error) {
        next(error)
    }
}

const updateBooking = async(req, res, next)=>{
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, {$set : req.body}, {new : true})
        if(!booking){
            res.status(404)
            throw new Error("booking not found")
        }
        return res.status(200).json({message : "booking updated successfully", booking})
        
    } catch (error) {
        next(error)
    }
}

const deleteBooking = async(req, res, next)=>{
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id)
        if(!booking){
            res.status(404)
            throw new Error("booking not found")
        }
        return res.status(200).json({message : "booking deleted successfully", booking})
    } catch (error) {
        next(error)
    }
}

const singleBooking = async(req, res, next)=>{
    try {
        const booking = await Booking.findById(req.params.id)
        if(!booking){
            res.status(404)
            throw new Error("booking not found")
        }
        return res.status(200).json({message : "booking found successfully", booking})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    singleBooking
}