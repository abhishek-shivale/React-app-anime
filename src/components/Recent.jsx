import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Recent.css'

function Recent() {
    const [recent, setRecent] = useState([])
    const [count, setCount] = useState(1)
    const onclick = () => {
        const x = count + 1
        setCount(x)
        fetchAnime()
    }
    async function fetchAnime() {
        try {
            const res = await axios.get(`https://api.abhishekshivale45.workers.dev/recent/${count}`);
             
            setRecent((pre)=>[...pre, ...res.data.results]);
            console.log(recent);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
    fetchAnime();
    }, []);


  return (
    < >
    <h1 className='text-white text-3xl font-extrabold'>Recent :</h1>

<div id='recent-div' className='text-white flex w-full  flex-wrap'>
    {recent.map((anime) => (
        <Link key={anime.id} to={`/anime/${anime.title}`}>
            <div id='div-anime-recent' className='h-80 w-max'>
                <div className='h-56 w-48 overflow-hidden'>
                    <img src={anime.image} alt={anime.title} className='my-5 h-full w-full object-cover' />
                </div>
                <div className='bg-black h-16 w-48 overflow-hidden'>
                    <p className='text-base title font-extrabold bg-transparent p-3 line-clamp-2'>{anime.title}</p>
                </div>
            </div>
        </Link>
    ))}
</div>

<div className='flex justify-center'>
    <button className='h-12 w-30 my-20 bg-red-700 text-white px-3 py-2' onClick={onclick}>
        Load More
    </button>
</div>
</>
  )
}
export default Recent