import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Transfer from './Transfer'
import BankLandingPage from './landing'

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path= "/" element={<Home/>}/>
        <Route path="/read/:id" element={<Transfer/>}/>

      </Routes>
     
     </BrowserRouter>


  )
}

export default App