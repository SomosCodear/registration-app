import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from './containers';

const config = process.env.CONFIG;

// eslint-disable-next-line
console.log('Config', config);

ReactDOM.render(
  <AppContainer />,
  document.getElementById('app'),
);
