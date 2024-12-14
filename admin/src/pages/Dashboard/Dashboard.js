import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getBookings } from "../../features/booking/bookingSlice.js"
import BookingList from "../../components/BookingList/BookingList.jsx"

const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    const {bookings} = useSelector((state) => state.booking)

    console.log(bookings)

    useEffect(()=>{
        if(!user){
            navigate("/login")
        }
        dispatch(getBookings())
        
    }, [user, navigate, dispatch])
  return (
    <div>
        <h1 className='heading center'>
            Dashboard
        </h1>

        {bookings.length > 0 ? <BookingList data={bookings} /> : null}
    </div>
  )
}

export default Dashboard