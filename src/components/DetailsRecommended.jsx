import React from 'react';
import { Card } from 'react-bootstrap';

function DetailsRecommended() {
  const index = 0;
  return (
    <section>
      <h2>Recommended</h2>
      <Card data-testid={ `${index}-recomendation-card` }>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>Water</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in to
            additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
      </Card>
    </section>
  );
}

export default DetailsRecommended;
