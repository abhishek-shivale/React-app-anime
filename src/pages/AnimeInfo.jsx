import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './animeInfo.css'


const AnimeInfo = () => {
  const [animes,setanimes] = useState([])
  const [ep,setEp] = useState(0)
  const [genre,setgenre] = useState([])
  const { animeid } = useParams();
  const decodedAnimeId = decodeURIComponent(animeid);
  const cleanedAnimeId = decodedAnimeId.replace('anime=', '');
  function Genracomponent (props){
    return (
      <div className='bg-transparent max-h-16 overflow-scroll scrollbar-hidden  my-1'>
      <div className=' bg-transparent flex whitespace-nowrap font-extrabold'>{props.title}
      <div className='bg-transparent font-light px-3 whitespace-normal py-1 text-sm'>{props.info}
      </div>
      </div>
      </div>
    )
  }
  function Divcomponent (props){
    return (
      <>
      <div className='mb-3 bg-transparent rounded w-8 pb-1 pl-1 border h-6'>{props.title}</div>
      </>
    )
  }
  function Genrecomponent (props){
    return(
      <div className='my-4 flex bg-transparent w-auto px-2 pt-1 rounded text-sm border h-8'>{props.title}</div>
    )
  }
  const fetchAnime = async ()=>{
    const res = await axios(`https://api.abhishekshivale45.workers.dev/anime/${cleanedAnimeId}`)
    const animeData = res.data.results;
    setanimes(animeData);
    if (animeData.genre) {
      const genarry = animeData.genre.split(', ');
      setgenre(genarry);
    }
   setEp(animeData.episodes.length); 
  }
  useEffect(()=>{
    fetchAnime()
  },[])
  return (
    <>
  <div className='flex rounded-2xl border text-white h-[450px] top-[0%] min-w-screen relative container overflow-hidden m-auto'>
    <div className='absolute top-0 right-0 bottom-0 left-0' style={{backgroundImage: `url(${animes.image})`,
       backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1, pointerEvents: 'none', }}>
       </div>
    <img className='h-96 w-72 mx-5 my-5 rounded-lg' src={animes.image} alt="" />
      <div className='flex flex-col justify-between p-5 bg-transparent'>
        <div className=' bg-transparent w-[600px]'>
          <p className='text-3xl my-5 font-extrabold bg-transparent '>{animes.name}</p>
          <Divcomponent title='HD'/>
          <Link to={`/watch/animeid=${animes.id}/episodes=${1}`}><button className='border rounded-xl border-red-600 bg-red-700 px-3 bg-red mb-4 py-2'>Watch-Now</button></Link>
      <div className='bg-transparent text-sm h-56 text-clip overflow-hidden'>
          <p className='text-gray-200 leading-7 bg-transparent overflow-auto max-h-full scrollbar-hidden'>
            {animes.plot_summary}
          </p>
      </div>

          </div>

          </div>
          <div className='text-xl py-10 px-5 bg-gray-900 w-80'>
          <Genracomponent title='Names :' info={animes.other_name === '' ? animes.name : animes.other_name}/>
          <Genracomponent  title='Episodes :' info={ep}/>
          <Genracomponent  title='Release Year :' info={animes.released}/>
          <Genracomponent  title='Type :' info={animes.type}/>
          <Genracomponent  title='Status :' info={animes.status}/>
          <div className='overflow-scroll max-h-48 mb-5 bg-gray-900 scrollbar-hidden'>
          {genre && genre.map((ani) => (
            <div key={ani}  className='bg-gray-900'>
            <Genrecomponent  title={ani} />
            </div>
          ))}
          </div>
          </div>
          
      </div>

    </>
  )

  }
export default AnimeInfo;

