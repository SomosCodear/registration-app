import { createGlobalStyle } from 'styled-components';
import bahnschrift from '../assets/fonts/bahnschrift.ttf';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Bahnschrift';
    src: url('${bahnschrift}') format('truetype');
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
