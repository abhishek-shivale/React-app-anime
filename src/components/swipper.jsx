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
      console.log(spotlightAnime);
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
          <div className="image-wrapper">
          <img src={anime.bannerImage} alt="Banner" className='img' />
          <div className="shadow" ></div>
        </div>
        <div className='absolute top-[35%] left-[3%] bg-transparent z-40 h-22 rounded-md w-80'>
          <p className='bg-transparent text-2xl '>{anime.title.english}</p>
          <p className='h-5 w-8 rounded-md px-1 text-sm border bg-transparent'>HD</p>
        </div>
        <Link to={`/anime/anime=${anime.title.english}`}>
          <button className='border border-red-700 absolute bg-red-700 top-[70%] px-3 py-2 z-30 left-[5%]'>Watch Now</button>
        </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwipperComponent;
{/* <img src={(anime.bannerImage == null ) ? anime.coverImage.extraLarge : anime.bannerImage} alt={anime.title}  className=' object-cover h-full w-full from-slate-300	'/> */}
{/* <div className='absolute top-[40%] h-48 w-80 opacity-100  text-center text-white font-bold left-20 bg-transparent  items-center'>
            <h1 className='bg-slate-900  text-3xl'>{anime.title.english}</h1> */}