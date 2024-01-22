import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './animeInfo.css'
import VideoPlayer from '../components/videoplayer';

function Watchanime() {
    const [epNo, setEpNo] = useState(1);
    const [epArry, setepArry] = useState([])
    const [streamUrl, setStreamUrl] = useState('');
    const { animeid, episodes } = useParams();
    const decodedAnimeId = decodeURIComponent(animeid);
    const decodedEpisodeId = decodeURIComponent(episodes);
    const cleanAnimeId = decodedAnimeId.replace('animeid=', '');
    const cleanEpisodeId = decodedEpisodeId.replace('episodes=', '');

    function ButtonCompo(props){
        const text = props.bt
        const arry = text[0]
        return (
            <>
            <Link to={`/watch/animeid=${props.link}/episodes=${arry}`}>
            <div className='flex'>
            <button className='text-white h-10 w-14 border'>{arry}</button>
            </div>
            </Link>
            </>
        )
    }

    useEffect(() => {
        async function fetchAnimeData() {
            try {
                const episodeResponse = await axios.get(`https://api.abhishekshivale45.workers.dev/episode/${cleanAnimeId}-episode-${cleanEpisodeId}`);
                const animeResponse = await axios.get(`https://api.abhishekshivale45.workers.dev/anime/${cleanAnimeId}`);
                const epdata = episodeResponse.data.results.stream.sources[0].file;
                setStreamUrl(epdata);
                let len = animeResponse.data.results.episodes
                // const arr = len.split(' ')
                setepArry(len)
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        }

        fetchAnimeData();
    }, [cleanAnimeId, cleanEpisodeId], ButtonCompo);
    return (
  <div className='container m-auto flex  mb-10'>
    <div className='basis-4/12 aspect-video'></div>
    <div className='w-full' >
     <VideoPlayer url={streamUrl} />
     </div>
     <div className='bg-black basis-4/12 overflow-scroll  aspect-video scrollbar-hidden '>
        <div className='flex flex-wrap bg-black mx-2'>
        {epArry.map((pop)=>(
            <ButtonCompo  bt={pop} link={cleanAnimeId} />
           
        ))}
        </div>
     </div>
     
  </div>
    );
}

export default Watchanime;
