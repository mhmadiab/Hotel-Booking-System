import { createAsyncThunk } from "@reduxjs/toolkit";


const deleteRoom =  createAsyncThunk("deleteRoom/room", async(roomId, ThunkAPI)=>{
    const {rejectedWithValue} = ThunkAPI

    try {

        const response = await fetch(`/api/rooms/${roomId}`, {
            method : "DELETE"
        })

        if(!response.ok){
            const error = await response.json()
            return rejectedWithValue(error)
        }

        const data = await response.json()
        return data
        
    } catch (error) {
        return rejectedWithValue(error.message)
    }
})

export default deleteRoom