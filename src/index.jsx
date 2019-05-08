import React from 'react';
import ReactDOM from 'react-dom';
import { container } from 'react-injext';
import { AppContainer } from './containers';
import { AppConfiguration } from './services';

const [appConfiguration] = container.get(AppConfiguration);
appConfiguration.setConfig(process.env.CONFIG);

ReactDOM.render(
  <AppContainer />,
  document.getElementById('app'),
);
