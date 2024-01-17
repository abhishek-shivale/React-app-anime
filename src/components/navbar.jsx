import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
function navbar() {
  const [input, setInput] = useState('')
  return (
    <div className='flex justify-between container m-auto'>
       <Link to='/'> <div className='py-10 px-10' >
            <h1 className='text-5xl text-white font-extrabold'>bo<span className='text-red-700 '>X</span>anime</h1>
        </div> </Link>
        <div className='py-10 px-10'>
          <input type="text" id='input' placeholder='Search Anime' className='max-w-96 max-h-8' onChange={(e)=>{setInput(e.target.value)}} value={input}/>
        </div>
    </div>
  )
}

export default navbar