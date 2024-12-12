import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { editRoom, reset } from "../../features/room/roomSlice"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const RoomEdit = () => {

  const {id} = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isSuccess} = useSelector(state => state.room)

  const [formData, setFormData] = useState({
    name : "",
    price: "", 
    description : "", 
    roomNumbers : ""
  })    

  const {name, price, description, roomNumbers} = formData

  useEffect(()=>{
    const getRoom = async()=>{
        try {
            const response =  await fetch(`/api/rooms/${id}`)
            const data = await response.json()
           
            const {roomNumbers, ...rest} = data.room
            const roomMap = roomNumbers.map((roomNumber)=> roomNumber.number)
            const roomString =  roomMap.join(",")
            
            setFormData({
                ...rest,
                roomNumbers : roomString
            })
            
        } catch (error) {
            console.log(error)
        }

    }
    getRoom()
  },[])

  useEffect(()=>{
    if(isSuccess){
        dispatch(reset())
        navigate("/rooms")
    }
  }, [isSuccess, dispatch, navigate])

  const handleChange = (e)=>{
      setFormData(prevData =>({
        ...prevData,
        [e.target.name] : e.target.value

      }))
  }

  const handleSubmit = (e)=>{
    e.preventDefault()

    if (!name || !price || !roomNumbers) {
        return;
    }

    const roomArray = roomNumbers.split(",").map((item) => {
        return {
          number: parseInt(item),
          unavailableDates: [],
        };
    });

    const dataToSubmit = {
        name,
        price,
        description,
        roomNumbers: roomArray,
        roomId : id
      };

    dispatch(editRoom(dataToSubmit))
  }

  return (
    <div>
        <h1 className="heading center">
            Edit Room
        </h1>

        <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter room name"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              value={price}
              placeholder="Enter room name"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={description}
            ></textarea>
          </div>

          <div className="input-group">
            <label htmlFor="desc">Room Numbers</label>
            <textarea
              name="roomNumbers"
              onChange={handleChange}
              value={roomNumbers}
              placeholder="enter room numbers seperated by commas eg: 202, 203, 204, 400"
            ></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>

    </div>
  )
}

export default RoomEdit