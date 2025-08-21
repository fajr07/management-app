import './App.css'
import Header from './Header';
import Home from './Home';
import React, { useState } from 'react'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
   <>
   <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
   <Home sidebarOpen={sidebarOpen}/>

   </>
  )
}

export default App
