import React, { useContext } from 'react';
import Context from '../context/Context';

function DetailsVideo() {
  const { recipeDetails } = useContext(Context);

  const { strYoutube } = recipeDetails;

  return (
    <section>
      <h2>Video</h2>
      <iframe
        src={ `https://www.youtube.com/embed/${strYoutube && strYoutube.split('=')[1]}` }
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        data-testid="video"
      />
    </section>
  );
}

export default DetailsVideo;
