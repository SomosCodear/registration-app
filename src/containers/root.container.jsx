import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles';
import { Root } from '../components';
import { AppContainer } from './app.container';

export const RootContainer = () => (
  <ThemeProvider theme={theme}>
    <Root>
      <AppContainer />
    </Root>
  </ThemeProvider>
);
