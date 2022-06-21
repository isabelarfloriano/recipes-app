import React from 'react';

function DetailsVideo() {
  return (
    <section>
      <h2>Video</h2>
      <iframe
        src="https://www.youtube.com/watch?v=Ds1Jb8H5Sg8"
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
