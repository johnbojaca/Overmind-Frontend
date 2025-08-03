import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




import {Navbar} from './components/Navbar'
import {Insurances} from './components/Insurances'
import {Shopcar} from './components/Shopcar'
import {Purchase} from './components/Purchase'
import {About} from './components/About'


function App() {
  return (
    <Router>
      <div id="capture-area">
        <Navbar/>
        <div className='container p-5'>
          <Routes>
            <Route path="/" element={<Insurances/>}/>
            <Route path="/shopcar" element={<Shopcar/>}/>
            <Route path="/purchase" element={<Purchase/>}/>
            <Route path="/about" element={<About/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}


export default App;
