import { useParams } from 'react-router-dom';

const AnimeInfo = () => {
  const { animeid } = useParams();
  const decodedAnimeId = decodeURIComponent(animeid);

  // Remove "anime=" from the beginning of the string
  const cleanedAnimeId = decodedAnimeId.replace('anime=', '');

  return (
    <div>
      {/* Your AnimeInfo component content */}
      <h2>Anime ID: {cleanedAnimeId}</h2>
    </div>
  );
};

export default AnimeInfo;
