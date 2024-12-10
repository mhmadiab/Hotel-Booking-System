import { createAsyncThunk } from "@reduxjs/toolkit";

const authReg = createAsyncThunk("authReg/auth", async(userData, ThunkAPI)=>{
    const {rejectWithValue}= ThunkAPI
    try {
        const response = await fetch('/api/users',{
            headers : {
                'Content-Type' : 'application/json',

            },
            method : "POST",
            body : JSON.stringify(userData)
        })

        if(!response.ok){
            const error = await response.json()
            return rejectWithValue(error.message)
        }

        const data = await response.json()
        return data
        
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export default authReg