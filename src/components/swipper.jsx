import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import './swipper.css'

function SwipperComponent() {
  const [spotlightAnime, setSpotlightAnime] = useState([]);

  async function fetchAnime() {
    try {
      const res = await axios.get('https://api.abhishekshivale45.workers.dev/home/');
      setSpotlightAnime(res.data.results.anilistTrending);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchAnime();
  }, []);

  return (
    <div>
      <Swiper
        pagination={{ type: 'fraction' }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper bg-slate-50  text-white"
      >
        {spotlightAnime.map(anime => (
          <SwiperSlide key={anime.id} className='h-96 w-full '>
            <Link to={`/anime/anime=${anime.title.english}`}>

            <div className='flex items-center'><h1>{anime.title.english}</h1></div>

            <img src={(anime.bannerImage == null ) ? anime.coverImage.extraLarge : anime.bannerImage} alt={anime.title} className=' object-cover h-full w-full'/>
            
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwipperComponent;
