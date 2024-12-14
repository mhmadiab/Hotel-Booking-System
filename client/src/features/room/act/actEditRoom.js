import { createAsyncThunk } from "@reduxjs/toolkit";


const editRoom = createAsyncThunk("editRoom/room", async(roomData, ThunkAPI)=>{
    const {rejectedWithValue}= ThunkAPI
    const {roomId, ...rest} = roomData 
    try {
        const response = await fetch(`/api/rooms/${roomId}`, {
            headers : {
                "Content-Type" : "application/json"
            },

            method : "PUT",
            body : JSON.stringify(rest)
        })
        if(!response.ok){
            const error = await response.json()
            return rejectedWithValue(error)
        }
        const data = await response.json()
        return data
    } catch (error) {
        return rejectedWithValue
    }
})

export default editRoom