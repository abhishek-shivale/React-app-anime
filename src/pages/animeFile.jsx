import React from 'react';
import { useParams } from 'react-router-dom';

const animeFile = () => {
  const { anime: animeName } = useParams();

  const decodedAnimeName = decodeURIComponent(animeName);

  console.log(decodedAnimeName);

  return (
    <div>
      <h2>Anime Details</h2>
      <p>Anime Name: {decodedAnimeName}</p>
    </div>
  );
};

export default animeFile;
