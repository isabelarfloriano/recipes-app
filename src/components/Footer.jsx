import React from 'react';

function Footer() {
  return (
    <footer data-testid="footer">
      <button type="button" data-testid="drinks-bottom-btn">
        drinks
      </button>
      <button type="button" data-testid="explore-bottom-btn">
        explore
      </button>
      <button type="button" data-testid="food-bottom-btn">
        food
      </button>
    </footer>
  );
}

export default Footer;
