import { createAsyncThunk } from "@reduxjs/toolkit";

const authLogin = createAsyncThunk("authLogin/auth", async(userData, ThunkAPI)=>{
    const {rejectWithValue}= ThunkAPI
    try {
        const response = await fetch("/api/users/login",{
            headers : {
                'content-type' : 'application/json'
            },
            method : "POST", 
            body : JSON.stringify(userData)
        })

        if(!response.ok){
            const error = await response.json()
            return rejectWithValue(error.message)
        }

        const data = await response.json()
        localStorage.setItem("user", JSON.stringify(data))
        return data
        
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export default authLogin