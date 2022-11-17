import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Bahnschrift';
    src: url('/assets/fonts/bahnschrift.ttf') format('truetype');
    font-weight: 1 999;
    font-display: swap;
  }
  body {
    margin: 0;
    padding: 0;
    font-size: 16px;
  }
  body, button, input {
    font-family: 'Bahnschrift', sans-serif;
  }
`;
