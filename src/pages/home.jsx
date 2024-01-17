import React from 'react'
import Swipper from '../components/swipper'
import Trending from '../components/trending'
import Recent from '../components/Recent'
function home() {
  return (
    <div className='container m-auto'>
        <Swipper />
        <Trending />
        <Recent />
    </div>
  )
}

export default home