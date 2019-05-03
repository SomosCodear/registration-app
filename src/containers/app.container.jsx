/* eslint-disable */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles';
import { Root, Start } from '../components';

export class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      screen: 'start',
    };

    this._screens = {
      start: this._getStartScreen.bind(this),
    };

    this._openScanner = this._openScanner.bind(this);
  }

  render() {
    const { screen } = this.state;
    const screenFn = this._screens[screen];
    return (
      <ThemeProvider theme={theme}>
        <Root>
          {screenFn()}
        </Root>
      </ThemeProvider>
    );
  }

  _getStartScreen() {
    return (
      <Start onClick={this._openScanner} />
    );
  }

  _openScanner() {
    console.log('OPEN SCANNER');
  }
}
