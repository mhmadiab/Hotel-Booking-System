import React, { useEffect } from 'react'
import RoomList from '../../components/RoomList/RoomList.jsx'
import { getRooms, reset } from '../../features/room/roomSlice'
import {useDispatch , useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Rooms = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate() 
  const {rooms, isSuccess, isLoading} = useSelector((state)=> state.room  ) 

  useEffect(()=>{
      dispatch(getRooms())
      dispatch(reset())
  }, [dispatch])
  
  if(isLoading){
    return (
        <h1 className='heading center'>Loading...</h1>
    )
  }
  return (
    <div className='container'>
        <h1 className='heading center'>
            Rooms
        </h1>

       {rooms.length > 0 ? <RoomList data={rooms} /> : <h1>No Rooms</h1>}
        
    </div>
  )
}

export default Rooms