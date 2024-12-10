import { createAsyncThunk } from "@reduxjs/toolkit";

const authLogout = createAsyncThunk("authLogout/auth", async(_,ThunkAPI)=>{
    const {rejectWithValue} = ThunkAPI
    try {
        const response  = await fetch("/api/users/logout",{
            headers : {
                'content-type' : 'application/json'
            },
            method : "GET"
        })

        if(!response.ok){
            const error = await response.json()
            return rejectWithValue(error.message)      
        }

        const data = await response.json()
        localStorage.removeItem("user")
        return data 
        
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export default authLogout