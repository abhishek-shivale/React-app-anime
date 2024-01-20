import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar'
import Home from './pages/home'
import AnimeInfo from './pages/AnimeInfo'
import Watchanime from './pages/Watchanime'
function App() {

  return (
    <>
     <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/> }/>
        <Route path='/anime/:animeid' element={<AnimeInfo /> }/>
        <Route path='/watch/:animeid/:episodes' element={<Watchanime/>}></Route>
      </Routes>
     </Router>
    </>
  )
}

export default App
