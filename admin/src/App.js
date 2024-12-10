import './App.scss'


import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import Header from './components/Header/Header.jsx'
import Dashboard from './pages/Dashboard/Dashboard.js'


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
        </Routes>
      </Router>
    </div>
  )
}

export default App
