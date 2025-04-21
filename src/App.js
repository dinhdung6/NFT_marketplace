import React from 'react'
import Author from './pages/Author'
import Create from './pages/Create'
import Details from './pages/Details'
import Explore from './pages/Explore'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Test from './pages/Test'
import TestForm  from './pages/Testform'

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
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/test' element={<Test />} />
        <Route path='/testform' element={<TestForm />} />
        
        
      </Routes>
    </BrowserRouter>
  )
}

export default App