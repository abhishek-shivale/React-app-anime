import React, { useEffect, useRef, useState } from "react";
import Hls from 'hls.js';

function VideoPlayer(props) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(props.url);
  }, [props.url]);

  const videoRef = useRef(null);


  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
      }
    }
  }, [url]);

  return (
    <>
    <div className="relative hover: ">
      <video ref={videoRef} className="object-cover video aspect-video w-full" controls />
    </div>
    </>
  );
}

export default VideoPlayer;
