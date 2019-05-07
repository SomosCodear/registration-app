import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles';
import {
  Results,
  Root,
  Scanner,
  Start,
} from '../components';

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
      results: this._getResultsScreen.bind(this),
    };

    this._openScanner = this._openScanner.bind(this);
    this._openFinder = this._openFinder.bind(this);
    this._saveData = this._saveData.bind(this);
    this._backToStart = this._backToStart.bind(this);
    this._doSomething = this._doSomething.bind(this);
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
      <Start
        onScanClick={this._openScanner}
        onSearchClick={this._openFinder}
      />
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

  _getResultsScreen() {
    const { data } = this.state;
    return (
      <Results
        data={data}
        onCancel={this._backToStart}
        onAction={this._doSomething}
      />
    );
  }

  _openScanner() {
    this.setState(() => ({ screen: 'scanner' }));
  }

  _openFinder() {
    this.setState(() => ({ screen: 'finder' }));
  }

  _saveData(data) {
    const [name, dni,, type] = data.split('\n');
    this.setState(() => ({
      screen: 'results',
      data: {
        name: {
          label: 'Name',
          value: name,
        },
        dni: {
          label: 'DNI',
          value: dni.split(' ').pop().trim(),
        },
        type: {
          label: 'Type',
          value: type.replace(/^(\w)/, (match, letter) => letter.toUpperCase()),
        },
      },
    }));
  }

  _backToStart() {
    this.setState(() => ({ screen: 'start' }));
  }

  _doSomething() {
    // eslint-disable-next-line
    console.log('Do something!');
  }
}
