import { createAsyncThunk } from "@reduxjs/toolkit";

const getBookings = createAsyncThunk("getBookings/booking" , async(_, ThunkAPI)=>{
    const {rejectedWithValue} = ThunkAPI;
    try {
        const response = await fetch('/api/bookings');
        const data =  await response.json();
        if(!response.ok){
            return rejectedWithValue(data);
        }

        return data 
        
    } catch (error) {
        return rejectedWithValue(error)
    }
})

export default getBookings