import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import Search from './search'
function navbar() {

  return (
    <div className='flex justify-between container m-auto'>
       <Link to='/'> <div className='py-10 px-10' >
            <h1 className='text-5xl text-white font-extrabold'>bo<span className='text-red-700 '>X</span>anime</h1>
        </div> </Link>
        <div className='py-10 px-10'>
         <Search />
        </div>
    </div>
  )
}

export default navbar