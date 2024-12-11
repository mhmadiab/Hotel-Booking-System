import './header.styles.scss'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { authLogout, reset } from '../../features/auth/authSlice'

const Header = () => {
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  
  const handleLogout = async()=>{
     dispatch(authLogout())
     dispatch(reset())
  }

  return (
      <header className='main-header'>
        <div className="container">
          <Link>
            <h1 className="logo">Lavita Hotel</h1>
          </Link>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/rooms">Rooms</Link>
            {user ? <>
              
              <Link to="/rooms/create">Create</Link>
              <button onClick={handleLogout}>Logout</button>
            </> : 
            <>
              
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>}
          </nav>
        </div>
      </header>
  )
}

export default Header