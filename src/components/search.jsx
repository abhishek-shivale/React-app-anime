import axios from 'axios';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

function Search() {
  const [input, setInput] = useState('');
  const [animeSearched, setAnimeSearched] = useState([]);
  const inputref = useRef(null);
  const searchref = useRef(null);

  const fetchSearchAnime = useCallback(async () => {
    try {
      const res = await axios(`https://api.abhishekshivale45.workers.dev/search/${input}`);
      setAnimeSearched(res.data.results);
      console.log(res.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [input]);

  useEffect(() => {
    fetchSearchAnime();
  }, [input, fetchSearchAnime]);

  const hide = useCallback(() => {
    searchref.current.style.display = 'none';
  }, []);

  const display = useCallback(() => {
    searchref.current.style.display = 'block';
  }, []);

  function SearchDiv() {
    return (
      <div
        ref={searchref}
        style={{
          maxHeight: animeSearched.length === 0 ? '5vw' : 'auto',
          width: '20vw',
        }}
        className='bg-gray-950 max-w-96 max-h-80 z-10 absolute overflow-scroll hidden'
      >
        {animeSearched.length === 0 ? (
          <p className='bg-transparent text-white'>No results found</p>
        ) : (
          animeSearched.map((anime) => (
            <Link key={anime.id} to={`/anime/anime=${anime.title}`}>
              <div className='flex border border-white p-2 bg-transparent'>
                <div className='h-20 w-20 overflow-hidden bg-transparent'>
                  <img className='w-full h-full object-cover bg-transparent' src={anime.img} alt={anime.title} />
                </div>
                <p className='ml-2 bg-transparent text-red-700'>{anime.title}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    );
  }

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className='relative'>
      <input
        ref={inputref}
        onInput={display}
        onFocus={display}
        onBlur={hide}
        onMouseEnter={display}
        type='text'
        id='input'
        placeholder='Search Anime'
        className='max-w-96 max-h-10'
        onChange={handleInputChange}
        value={input}
      />
      <SearchDiv />
    </div>
  );
}

export default Search;
