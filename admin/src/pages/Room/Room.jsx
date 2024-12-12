import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './room.styles.scss'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Carousel from '../../components/Carousel/Carousel'
import { deleteRoom, reset } from '../../features/room/roomSlice'

const Room = () => {

    const {id} = useParams()
    const [room , setRoom] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isSuccess} = useSelector((state)=> state.room)
    const {user} = useSelector((state)=> state.auth)

    useEffect(()=>{
       if(isSuccess){
        dispatch(reset()) 
        navigate("/rooms")
                
       }
    },[isSuccess, dispatch, navigate])

    useEffect(()=>{
       const getRoom =  async()=>{
          try {
             const res = await fetch(`/api/rooms/${id}`)
             if(res.ok){
                const data = await res.json()
                setRoom(data.room)
             }
          } catch (error) {
            console.log(error)
          }
       }
       getRoom()
    }, [])

    const handleDelete = (id)=>{
      dispatch(deleteRoom(id))
    }

    // console.log(room)
  return (
    <div id="room">
    <div className="container">
      {room ? (
        <div>
          <div className="img-wrapper">
            <Carousel data={room.img} />

            {/* <img src={room.img[0]} alt="" /> */}
          </div>
          <div className="text-wrapper">
            <h1 className="heading center"> {room.name} </h1>
            <p> {room.description} </p>
            <h2> ${room.price.toFixed(2)} </h2>
          </div>

          {user && !user.isAdmin ? (
            <div className="cta-wrapper">
              <Link to={`/rooms/edit/${room._id}`}>Edit Room</Link>
              <button onClick={()=>handleDelete(id)}>Delete Room</button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  </div>
  )
}

export default Room