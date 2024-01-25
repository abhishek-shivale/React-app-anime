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

<div id='recent-div' className='text-white grid gap-5 mt- grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))]'>
    {recent.map((anime) => (
        <Link key={anime.id} to={`/anime/${anime.title}`}>
            <div id='div-anime-recent' className='w-full '>
                <div className='h-56 overflow-hidden'>
                    <img src={anime.image} alt={anime.title} className='h-full w-full rounded-t-md object-cover' />
                </div>
                <div className='bg-black h-16 overflow-hidden rounded-b-md shadow-sm shadow-white '>
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