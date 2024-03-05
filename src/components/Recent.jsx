import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
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
            const res = await axios.get(`https://animedexapi.abhishekshivale45.workers.dev/recent/${count}`);
             
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
{console.log(recent)}
<div id='recent-div' className='text-white grid gap-5 mt-8 grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))]'>
    {recent.map((anime) => (
        <Link key={anime.id} to={`/anime/${anime.title}`}>
            <div id='div-anime-recent' className='w-full '>
                <div className='h-56 overflow-hidden'>
                <p className='inline release-year-div relative top-8 left-36 rounded-md px-2 py-2 text-sm border border-red-700 bg-red-700'>{anime.episode}</p>
                    <img src={anime.image} alt={anime.title} className='h-full w-full rounded-t-md object-cover' />
                </div>
                <div className='bg-black h-16 overflow-hidden rounded-b-md shadow-sm shadow-white '>
                    <p className='text-base title font-extrabold bg-transparent p-3 line-clamp-2'>{anime.title}</p>
                </div>
            </div>
        </Link>
    ))}
</div>

{window.addEventListener("scroll", () => {
    if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight
    ) {

        TIMEOUT_ID = setTimeout(()=>{
            onclick()
          },3000)
          return ()=>clearTimeout(TIMEOUT_ID)
       
    }
})}
</>
  )
}
export default Recent