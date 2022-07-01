import React from 'react';
import { CardGroup, Carousel, Container } from 'react-bootstrap';
import CarouselCard from './CarouselCard';

function DetailsRecommended() {
  return (
    <Container className="mb-5 mt-3">
      <h2 className="name-title">Recommended</h2>
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
    </Container>
  );
}

export default DetailsRecommended;
