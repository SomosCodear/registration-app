import { inject } from 'react-injext';
import APIClient from 'wootils/shared/apiClient';
import { AppConfiguration } from './appConfiguration';

@inject(AppConfiguration)
class AppAPI extends APIClient {
  constructor(appConfiguration) {
    const api = appConfiguration.get('api');
    super(
      api.url,
      api.endpoints,
      (url, options) => this._fetch(url, options),
    );

    this._fetchClient = global.fetch.bind(global);
  }

  filterCustomers(filters, takeOne = false) {
    const query = this._createFilters(filters);
    let result = this.get(this.endpoint('customers.filter', query));
    if (takeOne) {
      result = result.then((response) => this._takeOneItem(response));
    }

    return result;
  }

  filterTickets(filters, takeOne = false) {
    const query = this._createFilters(filters);
    let result = this.get(this.endpoint('tickets.filter', query));
    if (takeOne) {
      result = result.then((response) => this._takeOneItem(response));
    }

    return result;
  }

  checkInTicketById(ticketId) {
    return this.patch(
      this.endpoint('tickets.checkIn', { ticketId }),
      {
        data: {
          type: 'ticket',
          attributes: {
            status: 'validated',
          },
          relationships: {},
        },
      },
    );
  }

  fetch(options) {
    return super.fetch(options)
    .then((response) => response.data || response);
  }

  _createFilters(properties) {
    return Object.keys(properties).reduce(
      (acc, key) => Object.assign(acc, {
        [`filter[${key}]`]: properties[key],
      }),
      {},
    );
  }

  _takeOneItem(response = []) {
    let result;
    if (response.length) {
      [result] = response;
    }

    return result;
  }

  _fetch(url, options = {}) {
    return this._fetchClient(url, options);
  }
}

export { AppAPI };
