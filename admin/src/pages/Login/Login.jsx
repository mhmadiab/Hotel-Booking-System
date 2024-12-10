import React, { useState, useEffect } from 'react'
import { authLogin, reset } from '../../features/auth/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isSuccess, isError, message} = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email : "",
    password : ""

  })

  const {email, password} = formData

  useEffect(()=>{
    if(isSuccess){
      navigate('/dashboard')
      dispatch(reset())
    }
  }, [dispatch, user, isSuccess, navigate ])

  const handleChange = (e) =>{
    setFormData((prevData)=>({
      ...prevData,
      [e.target.name] : e.target.value
    }))
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    const dataToSubmit = {
      email, 
      password
    }
    console.log(dataToSubmit)
    dispatch(authLogin(dataToSubmit))
  }

  

  return (
    <div className='container'>
      <h1 className="heading center">
           Login
      </h1>
      <div className="form-wrapper">
        <form action="" onSubmit={handleSubmit}>

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

          <button type='submit'>Login</button>
          {isError && <h1>{message}</h1>}
        </form>
      </div>
    </div>
  )
}

export default Login