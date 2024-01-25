import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import Search from './search'
function navbar() {

  return (
    <div className='flex justify-between bg-gray-950'>
       <Link to='/'> 
       <div className='py-10 px-10 bg-gray-950 ' >
            <h1 className='text-5xl bg-transparent text-white font-extrabold'>bo<span className='text-red-700 bg-transparent '>X</span>anime</h1>
        </div> </Link>
        <div className='py-10 bg-transparent px-10 hidden sm:block'>
         <Search />
        </div>
    </div>
  )
}

export default navbar