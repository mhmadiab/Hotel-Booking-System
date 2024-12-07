const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name:{ 
        type:String,
        required: true,
    },
    price:{
        type:Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    roomNumbers:{
        type: [{
            number: Number,
            unavailableDates: [Date]
        }],
    }

})

const roomModel = mongoose.model("Room", roomSchema);

module.exports = roomModel