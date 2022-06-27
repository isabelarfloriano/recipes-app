import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreButton from '../components/ExploreButton';

const Explore = () => (
  <div>
    <Header />

    <ExploreButton testId="foods" route="/explore/foods">
      Explore Foods
    </ExploreButton>
    <ExploreButton testId="drinks" route="/explore/drinks">
      Explore Drinks
    </ExploreButton>

    <Footer />
  </div>
);
export default Explore;
