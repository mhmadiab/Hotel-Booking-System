import { createSlice } from "@reduxjs/toolkit";
import createRoom from "./act/actCreateRoom.js";
import getRooms from "./act/actGetRooms.js";

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
    }
}))


export const {reset } = roomSlice.actions
export {createRoom, getRooms}
export default roomSlice.reducer