import React from 'react';
import { CardGroup, Carousel } from 'react-bootstrap';
import CarouselCard from './CarouselCard';

function DetailsRecommended() {
  return (
    <section className="mb-5">
      <h2>Recommended</h2>
      <Carousel>
        <Carousel.Item>
          <CardGroup className="d-flex justify-content-between">
            <CarouselCard index="0" />
            <CarouselCard index="1" />
          </CardGroup>
        </Carousel.Item>
        <Carousel.Item>
          <CardGroup className="d-flex justify-content-between">
            <CarouselCard index="2" />
            <CarouselCard index="3" />
          </CardGroup>
        </Carousel.Item>
        <Carousel.Item>
          <CardGroup className="d-flex justify-content-between">
            <CarouselCard index="4" />
            <CarouselCard index="5" />
          </CardGroup>
        </Carousel.Item>
      </Carousel>
    </section>
  );
}

export default DetailsRecommended;
