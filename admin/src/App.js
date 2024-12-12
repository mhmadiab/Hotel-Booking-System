import './App.scss'


import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import Header from './components/Header/Header.jsx'
import Dashboard from './pages/Dashboard/Dashboard.js'
import CreateRoom from './pages/CreateRoom.js'
import Rooms from './pages/Rooms/Rooms.js'
import Room from './pages/Room/Room.jsx'
import RoomEdit from './pages/RoomEdit/RoomEdit.jsx'


const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/rooms/create' element={<CreateRoom />} />
          <Route path='/rooms' element={<Rooms />} />
          <Route path='/rooms/all/:id' element={<Room />} />
          <Route path='/rooms/edit/:id' element={<RoomEdit />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
