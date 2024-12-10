import {createSlice} from '@reduxjs/toolkit'
import authLogin from './act/actAuthLogin.js'
import authReg from './act/actAuthReg.js'
import authLogout from './act/actAuthLogout.js'

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user : user ? user : null,
    isLoading: false,
    isSuccess: false,
    isError : false,
    message : ""
}
const authSlice =  createSlice({
    name: 'auth',
    initialState,
    reducers : {
        reset : (state)=>{
            state.isLoading = false 
            state.isSuccess = false
            state.isError = false
            state.message = ""
        }
    },
    extraReducers : (builder)=>{

        //Register:
        builder.addCase(authReg.pending, (state)=>{
               state.isSuccess = false
               state.isLoading = true
               state.isError = false
               state.message = "pending"
        })
        builder.addCase(authReg.fulfilled, (state, action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            state.message = "user created"
        })
        builder.addCase(authReg.rejected, (state, action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })

        //Login
        builder.addCase(authLogin.pending, (state)=>{
            state.isSuccess = false
            state.isLoading = true
            state.isError = false
            state.message = "pending"
        })

        builder.addCase(authLogin.fulfilled, (state, action)=>{
         state.isError = false
         state.isLoading = false
         state.isSuccess = true
         state.user = action.payload
         state.message = "logged in"
        })
        builder.addCase(authLogin.rejected, (state, action)=>{
         state.isLoading = false
         state.isSuccess = false
         state.isError = true
         state.message = action.payload
        })

        //logout
        builder.addCase(authLogout.pending, (state)=>{
            state.isSuccess = false
            state.isLoading = true
            state.isError = false
            state.message = "pending"
        })

        builder.addCase(authLogout.fulfilled, (state, action)=>{
         state.isError = false
         state.isLoading = false
         state.isSuccess = true
         state.user = null
         state.message = action.payload
        })
        builder.addCase(authLogout.rejected, (state, action)=>{
         state.isLoading = false
         state.isSuccess = false
         state.isError = true
         state.message = action.payload
        })


    }

})

export const {reset} = authSlice.actions
export {authLogin, authReg, authLogout}
export default authSlice.reducer