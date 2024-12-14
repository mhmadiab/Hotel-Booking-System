import { createSlice } from "@reduxjs/toolkit";
import createRoom from "./act/actCreateRoom.js";
import getRooms from "./act/actGetRooms.js";
import editRoom from "./act/actEditRoom.js";
import deleteRoom from "./act/actDeleteRoom.js";

const initialState = {
    rooms : [],
    isSuccess : false,
    isError : false,
    isLoading : false,
    message : ""
}

const roomSlice = createSlice(({
    name : "room", 
    initialState,
    reducers : {
        reset : (state)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
        }
    },
    extraReducers : (builder)=>{
       builder.addCase(createRoom.pending, (state)=>{
           state.isLoading = true
       })
       builder.addCase(createRoom.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.rooms = action.payload
       })
       builder.addCase(createRoom.rejected, (state, action)=>{
              state.isSuccess = false
              state.isError = false
              state.message = action.payload
       })

        builder.addCase(getRooms.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(getRooms.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.rooms = action.payload
        })
        builder.addCase(getRooms.rejected, (state, action)=>{
            state.isSuccess = false
            state.isError = false
            state.message = action.payload
        })

        builder.addCase(editRoom.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(editRoom.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.rooms = action.payload
        })
        builder.addCase(editRoom.rejected, (state, action)=>{
            state.isSuccess = false
            state.isError = false
            state.message = action.payload
        })

        builder.addCase(deleteRoom.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(deleteRoom.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.rooms = state.rooms.filter((room) => room._id === action.payload.id)
        })
        builder.addCase(deleteRoom.rejected, (state, action)=>{
            state.isSuccess = false
            state.isError = false
            state.message = action.payload
        })
    }
}))


export const {reset } = roomSlice.actions
export {createRoom, getRooms, editRoom, deleteRoom}
export default roomSlice.reducer