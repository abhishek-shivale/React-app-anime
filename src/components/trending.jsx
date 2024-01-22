import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import axios from 'axios';
import './trending.css'
import { Link } from 'react-router-dom';



function trending() {

  const [spotlightAnime, setSpotlightAnime] = useState([]);

  async function fetchAnime() {
    try {
      const res = await axios.get('https://api.abhishekshivale45.workers.dev/gogoPopular/');
      setSpotlightAnime(res.data.results);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchAnime();
  }, []);

  return (
    
    <div className='text-white text-3xl font-bold py-5'>
        <h1>Trending :</h1>
        <Swiper
        slidesPerView={5}
        spaceBetween={1}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        
       
       {spotlightAnime.map(anime => (
       <SwiperSlide key={anime.id} className='h-[390px] w-full '>
           <Link to={`/anime/anime=${anime.title}`} > <div className='h-72 w-56 overflow-hidden ' > 
            <img src={ anime.image} alt={anime.title} className='my-10 h-full w-full object-cover '/>
            </div>
            <div className='bg-black h-16 w-56  overflow-hidden'>
            <p className='text-base title font-extrabold bg-transparent p-3 line-clamp-2'>{anime.title}</p>
            </div> </Link> 
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default trending
//useParams - Hook