import { createSlice } from "@reduxjs/toolkit";
import createBooking from "./act/actCreateBooking.js";
import  getBookings  from "./act/actGetBookings.js";
import deleteBooking from "./act/actDeleteBooking.js";
import confirmBooking from "./act/actConfirmBooking.js";

const initialState = {
    bookings : [],
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

       builder.addCase(getBookings.pending , (state)=>{
        state.isLoading = true
       })
       builder.addCase(getBookings.fulfilled , (state, action)=>{
          state.isSuccess = true
          state.isLoading = false
          state.bookings = action.payload
       })
       builder.addCase(getBookings.rejected , (state, action)=>{
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
       })

       .addCase(deleteBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = state.bookings.filter(
          (booking) => booking._id.toString() !== action.payload.id
        );
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(confirmBooking.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(confirmBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload;
      })
      .addCase(confirmBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    }
})


export const {reset}  =  bookingSlice.actions
export {createBooking, getBookings, deleteBooking, confirmBooking}
export default bookingSlice.reducer