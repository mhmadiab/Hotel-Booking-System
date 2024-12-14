import { createSlice } from "@reduxjs/toolkit";
import createBooking from "./act/actCreateBooking";

const initialState = {
    booking : null,
    isSuccess : false,
    isLoading : false,
    isError : false,
    message : ""
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        reset : (state)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ""
        }
    },
    extraReducers : (builder)=>{
       builder.addCase(createBooking.pending , (state)=>{
        state.isLoading = true
       })
       builder.addCase(createBooking.fulfilled , (state, action)=>{
          state.isSuccess = true
          state.booking = action.payload
       })
       builder.addCase(createBooking.rejected , (state, action)=>{
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
       })
    }
})


export const {reset}  =  bookingSlice.actions
export {createBooking}
export default bookingSlice.reducer