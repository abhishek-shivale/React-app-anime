import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import axios from 'axios';
import './trending.css'
import { Link } from 'react-router-dom';
function Trending() {
  const [spotlightAnime, setSpotlightAnime] = useState([]);
  async function fetchAnime() {
    try {
      const res = await axios.get('https://animedexapi.abhishekshivale45.workers.dev/gogoPopular/');
      setSpotlightAnime(res.data.results);
    } catch (err) {
      console.error('Error fetching anime:', err);
    }
  }
useEffect(() => {
fetchAnime();
}, []);
return (
<div className='text-white text-3xl font-bold py-5 '>
  <h1>Trending :</h1>
  <div className='mt-8'>
  <Swiper
  breakpoints={
    {
      0:{
        slidesPerView:1,
      },
      400:{
        slidesPerView: 2,
      },
      606:{
        slidesPerView: 3,
      },
      1000:{
        slidesPerView: 4
      },
      1150:{
        slidesPerView: 5,
      },
      1240:{
        slidesPerView: 6,
      }
    }
  }
    slidesPerView={6}
    spaceBetween={0}
    pagination={{
      clickable: true,
    }}
    
    className="mySwiper trading-swipper py-4 " 
  >
    
    {spotlightAnime.map(anime => (
      <SwiperSlide key={anime.id} className='w-full Swipper-div '>
        <div className='relative'>
        <Link to={`/anime/anime=${anime.title}`}>
          <div className='h-64 overflow-hidden cursor-[url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/9632/heart.png"),_auto] rounded-t-md  img-div'>
            <img src={anime.image} alt={anime.title} className=' h-full rounded-t-md  w-full object-cover' />
          </div>
          <p className='inline release-year-div absolute top-2 right-2 rounded-md px-1 text-sm border border-red-700 bg-red-700'>{anime.releaseDate}</p>
          <div className='bg-black h-16 title-div overflow-hidden rounded-b-md shadow-sm	shadow-white'>
            <p className='text-base title font-extrabold bg-transparent p-3 line-clamp-2'>{anime.title}</p>
          </div>
        </Link>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
  </div>
</div>
  );
}

export default Trending;
