import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { NotFound } from './pages/NotFound'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/:acc_no' element={<Home />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<Signup isDarkMode='false' />} />
          <Route path='*' element={<NotFound /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
