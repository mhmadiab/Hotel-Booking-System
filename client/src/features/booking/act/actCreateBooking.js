import { createAsyncThunk } from "@reduxjs/toolkit";

const createBooking = createAsyncThunk("createBooking/booking", async(bookingData, ThunkAPI)=>{
    const {rejectedWithValue} = ThunkAPI
    try {
        const response =  await fetch("/api/bookings", {
            headers : {
                "Content-Type" : "application/json"
            },
            method : "POST",
            body : JSON.stringify(bookingData)
        })
        if(!response.ok){
            const error =  await response.json()
            return rejectedWithValue(error)
        }
        const data = await response.json()
        return data 
        
    } catch (error) {
        return rejectedWithValue(error)
    }
})

export default createBooking