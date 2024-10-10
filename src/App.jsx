import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "../src/pages/Home"
import Docters from './pages/Docters'
import Login from './pages/Login'
import About from './pages/About'
import Contects from './pages/Contects'
import MyProfile from './pages/MyProfile'
import MyApoimment from './pages/MyApoimment'
import Apoimment from './pages/Apoimment'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]' >
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Docters />} />
        <Route path='/doctors/:speciality' element={<Docters />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contect' element={<Contects />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-apoimment' element={<MyApoimment />} />
        <Route path='/apoimment/:docId' element={<Apoimment />} />
      </Routes>
    </div>
  )
}

export default App
