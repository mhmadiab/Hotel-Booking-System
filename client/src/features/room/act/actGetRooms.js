import { createAsyncThunk } from "@reduxjs/toolkit";


const getRooms =  createAsyncThunk("getRooms/room", async(_, ThunkAPI)=>{
    const {rejectWithValue} = ThunkAPI
    try {
        const response = await fetch("/api/rooms")
        if(!response.ok){
            const error = await response.json()
            return rejectWithValue(error)
        }
        const data = await response.json()
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export default getRooms