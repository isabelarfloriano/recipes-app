import React from 'react';
import TypeAnimation from 'react-type-animation';
import { Container } from 'react-bootstrap';
import notFound from '../images/notFound.png';
import Footer from '../components/Footer';

const TYPE_TIME = 2000;

const NotFound = () => (
  <section className="backgroud-notFound min-vh-100">
    <Container className="mb-5">
      <img style={ { width: '80vw' } } src={ notFound } alt="notfound icon" />
      <section>
        <TypeAnimation
          cursor={ false }
          sequence={ ['Ops! This Page is Melted in the Sun', TYPE_TIME, '', TYPE_TIME] }
          wrapper="h2"
          className="text-danger text-monospace"
          repeat={ Infinity }
        />
        <p className="text-monospace">
          People questioned your desire to get strawberry. “That’s the worst flavor,”
          they said. But you are strong and independent so you got it anyway. And
          honestly, it wasn’t great. Luckily, two licks in a bike whizzed past you and
          knocked the cone out of your hand. “Oh no!” you yelled as the creamy pink
          became a mess in the dirt. But really you were happy.
        </p>
      </section>
    </Container>
    <Footer />
  </section>
);

export default NotFound;
