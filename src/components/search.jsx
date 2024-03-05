import axios from 'axios';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

function Search() {
  const [input, setInput] = useState('');
  const [animeSearched, setAnimeSearched] = useState([]);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const inputRef = useRef(null);

  let TIMEOUT_ID ;
   const fetchSearchAnime = async ()=>{
      try {
        const res = await axios(`https://animedexapi.abhishekshivale45.workers.dev/search/${input}`);
        setAnimeSearched(res.data.results);
        console.log(res.data.results);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);
    setSearchVisible(!!inputValue); 
  };
  useEffect(()=>{
    if(!input) return
    TIMEOUT_ID = setTimeout(()=>{
      fetchSearchAnime() 
    },1000)
    return ()=>clearTimeout(TIMEOUT_ID)
  },[input])

  const handleInputBlur = () => {
    setTimeout(() => {
      setSearchVisible(false);
    }, 200);
  };

  function SearchDiv() {
    return (
      <div
        style={{
          maxHeight: animeSearched.length === 0 ? '5vw' : 'auto',
          width: '20vw',
          display: isSearchVisible ? 'block' : 'none',
        }}
        className='bg-black max-w-96 max-h-80 mr-10 min-h-32 min-w-48 z-10 absolute sm:-right-8 -right-16 overflow-scroll'
      >
        {animeSearched.length === 0 ? (
          <p className='bg-transparent text-white'>No results found</p>
        ) : (
          animeSearched.map((anime) => (
            <Link key={anime.id} to={`/anime/anime=${anime.title}`}>
              <div className='flex p-2 bg-gray-950'>
                <div className='h-16 w-14 overflow-hidden bg-transparent'>
                  <img className='w-full h-full object-cover bg-transparent' src={anime.img} alt={anime.title} />
                </div>
                <p className='ml-2 bg-transparent text-white'>{anime.title}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    );
  }

  return (
    <div className='relative'>
      <input
        ref={inputRef}
        onInput={handleInputChange}
        onBlur={handleInputBlur}
        type='text'
        id='input'
        placeholder='Search Anime'
        className='max-w-96 min-w-16 max-h-10'
        value={input}
      />
      <SearchDiv />
    </div>
  );
}

export default Search;
