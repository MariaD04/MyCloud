import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import LogIn from './pages/Authorization/LogIn'
import SignUp from './pages/Authorization/SignUp'
import Disk from './pages/Disk/Disk'
import Error from './pages/Error/Error'
import Users from './pages/Users/Users'
import User from './pages/User/User'
import Header from './components/Header/Header'

function App() {

  return (
    <div className='app-container'>
      <Header />
      <div className='pages'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/user' element={<User />} />
          <Route path='/users' element={<Users />} />
          <Route path='/disk' element={<Disk />} />
          <Route path='/*' element={<Error />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
