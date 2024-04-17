import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Transfer from './Transfer'
import BankLandingPage from './landing'

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path= "/users" element={<Home/>}/>
        <Route path="/read/:id" element={<Transfer/>}/>
        <Route path="/" element={<BankLandingPage/>}/>

      </Routes>
     
     </BrowserRouter>


  )
}

export default App