import React, { useEffect, useRef, useState } from "react";
import Hls from 'hls.js';
import './VideoPlayer.css';

function VideoPlayer(props) {
  const [isPlaying, setisPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [playback, setPlayBack] = useState(1);
  const [isFullscreen, setisFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(props.url);
  }, [props.url]);

  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadData = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadeddata', handleLoadData);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadeddata', handleLoadData);
    };
  }, []);

  const formatTime = (time) => {
    let seconds = Math.floor(time % 60);
    let minutes = Math.floor((time / 60));
    let hours = Math.floor(time / 3600);

    const formattedSecond = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;

    if (hours === 0) {
      return `${formattedMinutes}:${formattedSecond}`;
    }
    return `${formattedHours}:${formattedMinutes}:${formattedSecond}`;
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    setisPlaying(!isPlaying);

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const handleSpeedChange = (newSpeed) => {
    const video = videoRef.current;
    setPlayBack(newSpeed);
    video.playbackRate = newSpeed;
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;

    if (document.fullscreenElement) {
      setisFullscreen(false);
      document.exitFullscreen();
    } else {
      setisFullscreen(true);
      video.requestFullscreen();
    }
  };

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
    <div className={`container ${isFullscreen ? 'fullscreen' : ''}`}>
      <video ref={videoRef} className="object-cover aspect-video w-full" />
      <div className="controls">
        <button onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="any"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
        <div className="time-display">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        <button onClick={() => handleSpeedChange(1)}>Normal</button>
        <button onClick={() => handleSpeedChange(1.5)}>1.5x</button>
        <button onClick={() => handleSpeedChange(2)}>2x</button>
        <button onClick={toggleFullscreen}>
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
      </div>
    </div>
  );
}

export default VideoPlayer;
