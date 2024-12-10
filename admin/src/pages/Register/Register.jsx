import React, { useState, useEffect } from 'react'
import { authReg, reset } from '../../features/auth/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user, isSuccess, message, isError, isLoading} = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    name : "",
    email : "",
    password : ""

  })
  const {name, email, password} = formData

  useEffect(()=>{
    if(isSuccess){
      navigate("/login")
      dispatch(reset())
    }
  },[dispatch, isSuccess, user, navigate])

  const handleChange = (e) =>{
    setFormData((prevData)=>({
      ...prevData,
      [e.target.name] : e.target.value
    }))
  }
  const handleSubmit = (e)=>{
      e.preventDefault()
      const dataToSubmit = {
        name,
        email,
        password
      }
      dispatch(authReg(dataToSubmit))
  }
  return (
    <div className='container'>
      <h1 className="heading center">
           Register
      </h1>
      <div className="form-wrapper">
        <form action="" onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input type="text" 
                   placeholder='enter your name'
                   name='name' 
                   value={formData.name} 
                   onChange={handleChange} />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" 
                   placeholder='example@gamil.com' 
                   name='email'
                   value={formData.email} 
                   onChange={handleChange} />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" 
                   placeholder='enter your password' 
                   name='password'
                   value={formData.password} 
                   onChange={handleChange} />
          </div>

          <button type='submit'>Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register