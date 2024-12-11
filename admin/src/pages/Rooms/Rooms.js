import React, {useEffect} from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { getRooms, reset } from '../../features/room/roomSlice.js'
import RoomList from '../../components/RoomList/RoomList.jsx'

const Rooms = () => {
  const dispatch = useDispatch()
  const {rooms, isSuccess, isLoading , isError, message} = useSelector((state)=>state.room)
   useEffect(()=>{
      dispatch(getRooms())
   }, [dispatch])

   useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [isSuccess, dispatch]);


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