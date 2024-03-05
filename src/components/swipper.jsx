import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './swipper.css'

function SwipperComponent() {
  const [spotlightAnime, setSpotlightAnime] = useState([]);
  const [genres, setgenres] = useState([])

  async function fetchAnime() {
    try {
      const res = await axios.get('https://animedexapi.abhishekshivale45.workers.dev/home/');
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
        translate={"yes"}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper  text-white"
      >
        {spotlightAnime.map(anime => ( 
          <SwiperSlide key={anime.id} className='h-96 w-full mt-2 '>
          <div className="image-wrapper">
          <img src={anime.bannerImage === null ? anime.coverImage.extraLarge : anime.bannerImage} alt="Banner" className='img' />
          <div className="shadow" ></div>
        </div>
        <div className='absolute top-[35%] left-[4%] bg-transparent z-40 h-22 rounded-md w-80'>
          <p className='bg-transparent text-2xl font-bold '>{anime.title.english}</p>
          <p className='inline rounded-md px-1 text-sm border bg-transparent'>HD</p>
          <p className='inline rounded-md px-1 mx-3 text-sm border bg-transparent'>{anime.format}</p>
          <p className='inline rounded-md px-1 text-sm border border-red-700 bg-red-700'>{anime.status}</p>
        </div>
        <Link to={`/anime/anime=${anime.title.english}`}>
          <button className='border border-red-700 rounded-xl font-bold absolute bg-red-700 top-[70%] px-3 py-2 z-30 left-[5%]'>Watch Now</button>
        </Link>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}

export default SwipperComponent;





// 