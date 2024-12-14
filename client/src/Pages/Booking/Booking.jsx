import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createBooking, reset } from '../../features/booking/bookingSlice'


const Booking = () => {

  const dispatch = useDispatch()  
  const navigate = useNavigate()
  const {id : roomId} = useParams()
  const {isSuccess} = useSelector((state)=> state.booking)


  const [room, setRoom] = useState(null)
  const [formData, setFormData] = useState({
    name : "",
    email : "", 
    checkInDate : "",
    checkOutDate : ""
})

const {name, email, checkInDate, checkOutDate} = formData

useEffect(()=>{
    if(isSuccess){
        navigate("/success")
        dispatch(reset())
    }
}, [isSuccess, dispatch, navigate])

useEffect(()=>{
    const getRoom = async()=>{
        try {
            const response =  await fetch(`/api/rooms/${roomId}`)
            const data =  await response.json()
            return setRoom(data.room)
        } catch (error) {
            console.log(error)
        }
    }
    getRoom()
}, [roomId])

  
  const handleChange = (e)=>{
       setFormData((prevData)=>({
            ...prevData,
            [e.target.name] : e.target.value
       }))
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    const dataToSubmit = {
        roomId,
        name,
        email,
        checkInDate,
        checkOutDate
    }

    dispatch(createBooking(dataToSubmit))
  }

  return (
    <div>
        <h1 className="heading center">
            Booking
        </h1>
        <div className="form-wrapper">
             <form action="" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input type="text"
                           name='name'
                           value={name}
                           placeholder='enter full name'
                           onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email"
                           name='email'
                           value={email}
                           placeholder='example@gmail.com'
                           onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="checkInDate">Check In</label>
                    <input type="date"
                           name='checkInDate'
                           value={checkInDate}
                           onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="checkOutDate">Check Out</label>
                    <input type="date"
                           name='checkOutDate'
                           value={checkOutDate}
                           onChange={handleChange} />
                </div>

                <button type='submit'>Book</button>



             </form>
        </div>
    </div>
  )
}

export default Booking