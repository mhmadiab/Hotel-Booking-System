const mongoose = require("mongoose")

const bookingsSchema = new mongoose.Schema({
    roomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Room"
    },
    name:{
        type:String,
        required: true
    },
    email:{
        type : String,
        required : true
    },
    checkInDate:{
        type : Date,
        required : true
    },
    checkOutDate:{
        type : Date,
        required : true
    },
    confirmed:{
        type:Boolean,
        default : false
    }
}, {
    timestamps : true
})

const BookingModal = mongoose.model("booking", bookingsSchema )

module.exports = BookingModal