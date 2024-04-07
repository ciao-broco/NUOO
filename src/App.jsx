import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home'
import Create from './Components/Create.jsx'
import Read from './Components/Read.jsx'
import Edit from './Components/Edit.jsx'

function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create' element={<Create />} />
      <Route path='/read/:id' element={<Read />} />
      <Route path='/edit/:id' element={<Edit />} />
      {/* <Route path='/delete/:id' element={<Delete />} /> */}
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
