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
      const res = await axios.get('https://api.abhishekshivale45.workers.dev/gogoPopular/');
      setSpotlightAnime(res.data.results);
    } catch (err) {
      console.error('Error fetching anime:', err);
    }
  }

  useEffect(() => {
    fetchAnime();
  }, []);

 

  return (
    <div className='text-white text-3xl font-bold py-5'>
      <h1>Trending :</h1>
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
          // 1000:{
          //   slidesPerView: 4,
          // },
          1000:{
            slidesPerView: 4
          },
          1240:{
            slidesPerView: 6,
          }
        }
      }
        slidesPerView={7}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {spotlightAnime.map(anime => (
          <SwiperSlide key={anime.id} className='h-[340px] w-full Swipper-div '>
            <div>
            <Link to={`/anime/anime=${anime.title}`}>
              <div className='h-56 w-48 overflow-hidden img-div'>
                <img src={anime.image} alt={anime.title} className='my-10 h-full w-full object-cover' />
              </div>
              <p className='inline release-year-div absolute top-12 left-[9rem] rounded-md px-1 text-sm border border-red-700 bg-red-700'>{anime.releaseDate}</p>
              <div className='bg-black h-16 w-48 title-div overflow-hidden'>
                <p className='text-base title font-extrabold bg-transparent p-3 line-clamp-2'>{anime.title}</p>
              </div>
            </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Trending;
