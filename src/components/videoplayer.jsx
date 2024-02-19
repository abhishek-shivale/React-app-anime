import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import Plyr from "plyr";
import "plyr-react/plyr.css";
import "./videoplayer.css";
function VideoPlayer(props) {
  const [url, setUrl] = useState(props.url);
  const videoRef = useRef(null);
  let player = null;

  useEffect(() => {
    setUrl(props.url);
  }, [props.url]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !url) return;

    // Initialize HLS.js if supported
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);

      // Listen for manifest parsed event to get available qualities
      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        const availableQualities = hls.levels.map((l) => l.height);

        // Construct Plyr quality options
        const qualityOptions = {
          quality: {
            default: availableQualities[0],
            options: availableQualities,
            forced: true,
            onChange: (quality) => handleQualityChange(quality),
          },
        };

        // Initialize Plyr with quality options
        player = new Plyr(video, { ...qualityOptions });
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      player = new Plyr(video);
    }

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [url]);

  const handleQualityChange = (quality) => {
    console.log("Selected quality:", quality);
  };

  return <video ref={videoRef} className="plyr video" />;
}

export default VideoPlayer;
