import { render } from '@testing-library/react';
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

// Utilizei como base o arquivo renderWithRouter.js da revisão 14.5

function renderWithRouter(component) {
  const customHistory = createMemoryHistory();

  const returnFromRender = render(
    <Router history={ customHistory }>
      {component}
    </Router>,
  );

  return { history: customHistory, ...returnFromRender };
}

export default renderWithRouter;
