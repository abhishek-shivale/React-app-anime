import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./animeInfo.css";
import VideoPlayer from "../components/videoplayer";

function Watchanime() {
  const navigate = useNavigate();
  const [epArry, setepArry] = useState([]);
  const [streamUrl, setStreamUrl] = useState("");
  const { animeid, episodes } = useParams();
  const decodedAnimeId = decodeURIComponent(animeid);
  const decodedEpisodeId = decodeURIComponent(episodes);
  const id = decodedAnimeId.replace("animeid=", "");
  const [cleanAnimeId, setcleanAnimeId] = useState(id);
  const cleanEpisodeId = decodedEpisodeId.replace("episodes=", "");

  function ButtonCompo(props) {
    const text = props.bt;
    const arry = text[0];
    return (
      <>
        <Link
          onClick={() =>
            (window.location.href = `/watch/animeid=${props.link}/episodes=${arry}`)
          }>
          <div className="flex">
            <button className="text-white h-10 w-14 border">{arry}</button>
          </div>
        </Link>
      </>
    );
  }

  const handleDubButtonClick = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("animeid", `${cleanAnimeId}-dub`);
    searchParams.set("episodes", cleanEpisodeId);
    const searchString = searchParams.toString();
    const modifiedSearchString = searchString.replace("&", "/");
    window.location.href = `/watch/${modifiedSearchString}`;
  };

  useEffect(() => {
    async function fetchAnimeData() {
      try {
        const episodeResponse = await axios.get(
          `https://animedexapi.abhishekshivale45.workers.dev/episode/${cleanAnimeId}-episode-${cleanEpisodeId}`
        );
        const animeResponse = await axios.get(
          `https://animedexapi.abhishekshivale45.workers.dev/anime/${cleanAnimeId}`
        );
        const epdata = episodeResponse.data.results.stream.sources[0].file;
        setStreamUrl(epdata);
        let len = animeResponse.data.results.episodes;
        console.log(animeResponse.data.results);
        console.log(len);
        setepArry(len);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    fetchAnimeData();
  }, [cleanAnimeId, cleanEpisodeId]);

  return (
    <div className="container m-auto sm:flex max-w-[1300px]">
      <div className="w-full bg-none">
        <VideoPlayer url={streamUrl} />
      </div>
      <div className="bg-black sm:basis-4/12 overflow-scroll aspect-video scrollbar-hidden ">
        <div className="flex flex-wrap bg-black mx-2 my-3">
          {epArry.map((pop) => (
            <ButtonCompo bt={pop} link={cleanAnimeId} />
          ))}
        </div>
        {cleanAnimeId.includes("dub") ? (
          <></>
        ) : (
          <>
            <div
              className="px-24 bg-red-600 text-center text-white"
              onClick={handleDubButtonClick}>
              Watch In dub
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Watchanime;
