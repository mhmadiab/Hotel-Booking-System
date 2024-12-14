import { createAsyncThunk } from "@reduxjs/toolkit";


const createRoom =  createAsyncThunk("createRoom/room", async(roomData, ThunkAPI)=>{
    const {rejectWithValue} = ThunkAPI
    try {
        const response = await fetch("/api/rooms", {
            headers : {
                "Content-Type" : "application/json"
            },
            method : "POST", 
            body : JSON.stringify(roomData)
        })
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

export default createRoom