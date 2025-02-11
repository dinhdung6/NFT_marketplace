import React from 'react'
import Author from './pages/Author'
import Create from './pages/Create'
import Details from './pages/Details'
import Explore from './pages/Explore'
import Home from './pages/Home'

import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/author' element={<Author/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/details' element={<Details/>}/>
        <Route path='/explore' element={<Explore/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App