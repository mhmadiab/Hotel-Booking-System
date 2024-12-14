import './App.scss'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Header from './components/Header/Header.jsx'

import Home from './Pages/Home/Home'
import Rooms from './Pages/Rooms/Rooms.jsx'
import Room from './Pages/Room/Room.jsx'
import Booking from './Pages/Booking/Booking.jsx'
import Success from './Pages/Success/Success.jsx'

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/all/:id" element={<Room />} />
          <Route path='/bookings/:id' element={<Booking />} />
          <Route path='/success' element={<Success />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App