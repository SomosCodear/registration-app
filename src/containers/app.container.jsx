import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import inject from 'react-injext';
import { compose } from 'recompose';
import { theme } from '../styles';
import {
  Finder,
  Results,
  Root,
  Scanner,
  Start,
} from '../components';
import { Purchases } from '../services';

class _AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searching: false,
      searchError: false,
      data: null,
      screen: 'start',
    };

    this._screens = {
      start: this._getStartScreen.bind(this),
      scanner: this._getScannerScreen.bind(this),
      results: this._getResultsScreen.bind(this),
      finder: this._getFinderScreen.bind(this),
    };

    this._openScanner = this._openScanner.bind(this);
    this._openFinder = this._openFinder.bind(this);
    this._saveData = this._saveData.bind(this);
    this._backToStart = this._backToStart.bind(this);
    this._searchDNI = this._searchDNI.bind(this);
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

  _getFinderScreen() {
    const { searching, searchError } = this.state;
    return (
      <Finder
        searching={searching}
        error={searchError}
        onSearch={this._searchDNI}
        onCancel={this._backToStart}
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
    const [name, dni, ticketId, type] = data.split('\n');
    this.setState(() => ({
      screen: 'results',
      data: this._createData(
        name,
        dni.split(' ').pop().trim(),
        type.replace(/^(\w)/, (match, letter) => letter.toUpperCase()),
        ticketId.trim(),
      ),
    }));
  }

  _createData(name, dni, type, ticketId) {
    return {
      name: {
        label: 'Name',
        value: name,
      },
      dni: {
        label: 'DNI',
        value: dni,
      },
      type: {
        label: 'Type',
        value: type,
      },
      ticketId: {
        value: ticketId,
      },
    };
  }

  _backToStart() {
    this.setState(() => ({
      searching: false,
      searchError: false,
      screen: 'start',
    }));
  }

  _searchDNI(dni) {
    this.setState(
      () => ({
        searching: true,
        searchError: false,
      }),
      () => {
        const { dependencies: [purchases] } = this.props;
        purchases.searchPurchaseByIdentificationNumbe(dni)
        .then((result) => {
          const updates = {
            searching: false,
          };
          if (result) {
            const {
              customer: {
                attributes: {
                  fullName,
                  identificationNumber,
                },
              },
              ticket: {
                id: ticketId,
                relationships: {
                  ticketType: {
                    data: {
                      id: ticketType,
                    },
                  },
                },
              },
            } = result;
            updates.data = this._createData(
              fullName,
              identificationNumber,
              ticketType,
              ticketId,
            );
            updates.screen = 'results';
          } else {
            updates.searchError = true;
          }

          this.setState(() => updates);
        });
      },
    );
  }

  _doSomething() {
    // eslint-disable-next-line
    console.log('Do something!');
  }
}

_AppContainer.propTypes = {
  dependencies: PropTypes.array.isRequired,
};

export const AppContainer = compose(inject([Purchases]))(_AppContainer);
