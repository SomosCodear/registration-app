import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles';
import { Root, Scanner, Start } from '../components';

export class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      screen: 'start',
    };

    this._screens = {
      start: this._getStartScreen.bind(this),
      scanner: this._getScannerScreen.bind(this),
    };

    this._openScanner = this._openScanner.bind(this);
    this._saveData = this._saveData.bind(this);
    this._backToStart = this._backToStart.bind(this);
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

  _getScannerScreen() {
    return (
      <Scanner
        onData={this._saveData}
        onCancel={this._backToStart}
      />
    );
  }

  _openScanner() {
    this.setState(() => ({ screen: 'scanner' }));
  }

  _saveData(data) {
    // eslint-disable-next-line
    console.log(data);
    this._backToStart();
  }

  _backToStart() {
    this.setState(() => ({ screen: 'start' }));
  }
}
