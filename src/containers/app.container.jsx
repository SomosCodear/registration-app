import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import inject from 'react-injext';
import { compose } from 'recompose';
import { boundMethod } from 'autobind-decorator';
import { theme } from '../styles';
import {
  Finder,
  Results,
  Root,
  Scanner,
  Start,
} from '../components';
import { Purchases, Tickets, AppCamera } from '../services';

class _AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searching: false,
      searchError: '',
      doingCheckIn: false,
      checkInError: '',
      checkInSuccess: false,
      data: null,
      screen: 'start',
    };

    this._screens = {
      start: this._getStartScreen,
      scanner: this._getScannerScreen,
      results: this._getResultsScreen,
      finder: this._getFinderScreen,
    };
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

  @boundMethod
  _getStartScreen() {
    return (
      <Start
        onScanClick={this._openScanner}
        onSearchClick={this._openFinder}
      />
    );
  }

  @boundMethod
  _getScannerScreen() {
    const { dependencies: [,, appCamera] } = this.props;
    return (
      <Scanner
        camera={appCamera}
        onData={this._saveData}
        onCancel={this._backToStart}
      />
    );
  }

  @boundMethod
  _getResultsScreen() {
    const {
      data,
      doingCheckIn,
      checkInError,
      checkInSuccess,
    } = this.state;
    return (
      <Results
        doingCheckIn={doingCheckIn}
        error={checkInError}
        success={checkInSuccess}
        data={data}
        onCancel={this._backToStart}
        onAction={this._requestCheckIn}
      />
    );
  }

  @boundMethod
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

  @boundMethod
  _openScanner() {
    this.setState(() => ({ screen: 'scanner' }));
  }

  @boundMethod
  _openFinder() {
    this.setState(() => ({ screen: 'finder' }));
  }

  @boundMethod
  _backToStart() {
    this.setState(() => ({
      searching: false,
      searchError: '',
      doingCheckIn: false,
      checkInError: '',
      checkInSuccess: false,
      screen: 'start',
    }));
  }

  @boundMethod
  _searchDNI(dni) {
    this.setState(
      () => ({
        searching: true,
        searchError: '',
      }),
      () => this._loadPurchaseByDNI(dni),
    );
  }

  _loadPurchaseByDNI(dni) {
    const { dependencies: [purchases] } = this.props;
    purchases.searchPurchaseByIdentificationNumber(dni)
    .then((result) => {
      const updates = {
        searching: false,
      };
      if (result) {
        const summary = purchases.extractSummary(result);
        updates.data = this._createData(
          summary.name,
          summary.identificationNumber,
          summary.ticketType,
          summary.ticketId,
        );
        updates.screen = 'results';
      } else {
        updates.searchError = 'No information was found';
      }

      this.setState(() => updates);
    })
    .catch((error) => {
      // This is on purpose, no time for a proper error handling... suck it.
      // eslint-disable-next-line no-console
      console.error(error);
      return this.setState(() => ({
        seaching: false,
        error: error.message || error.toString(),
      }));
    });
  }

  @boundMethod
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

  @boundMethod
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

  @boundMethod
  _requestCheckIn() {
    this.setState(
      () => ({
        doingCheckIn: true,
        checkInError: '',
        checkInSuccess: false,
      }),
      () => this._checkIn(),
    );
  }

  @boundMethod
  _checkIn() {
    const { dependencies: [, tickets] } = this.props;
    const { data: { ticketId } } = this.state;
    tickets.checkInTicketById(ticketId.value)
    .then(() => {
      this.setState(() => ({
        doingCheckIn: false,
        checkInError: '',
        checkInSuccess: true,
      }));
    })
    .catch((error) => this.setState(() => ({
      doingCheckIn: false,
      checkInError: error.message || error.toString(),
    })));
  }
}

_AppContainer.propTypes = {
  dependencies: PropTypes.array.isRequired,
};

export const AppContainer = compose(
  inject([Purchases, Tickets, AppCamera]),
)(_AppContainer);
