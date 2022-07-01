import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Context from '../context/Context';

function DetailsVideo() {
  const { recipeDetails } = useContext(Context);

  const { strYoutube } = recipeDetails;

  return (
    <Container className="mt-2">
      <h2 className="name-title">Video</h2>
      <iframe
        src={ `https://www.youtube.com/embed/${strYoutube && strYoutube.split('=')[1]}` }
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        data-testid="video"
      />
    </Container>
  );
}

export default DetailsVideo;
