import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import './App.css'
import Navbar  from './components/navbar'
import Footer from './components/footer.jsx'
import Home  from './pages/home'
const AnimeInfo = lazy(()=>(import ('./pages/AnimeInfo.jsx')))  
const Watchanime = lazy(()=>( import ('./pages/Watchanime.jsx')))
function App() {

  return (
    <>
     <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<Home/> }/>
        <Route path='/anime/:animeid' element={<AnimeInfo /> }/>
        <Route path='/watch/:animeid/:episodes' element={<Watchanime/>}></Route>
      </Routes>
      </Suspense>
      <Footer />
     </Router>
    </>
  )
}

export default App
