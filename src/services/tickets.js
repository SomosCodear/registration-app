import { inject } from 'react-injext';
import { AppAPI } from './appAPI';

@inject(AppAPI)
class Tickets {
  constructor(appAPI) {
    this._appAPI = appAPI;
  }

  searchTicketByCustomerId(customerId) {
    return this._appAPI.filterTickets({ customerId }, true);
  }

  checkInTicketById(ticketId) {
    return new Promise((resolve) => {
      // eslint-disable-next-line
      console.log('CHECK IN', ticketId);
      setTimeout(() => {
        resolve(ticketId);
      }, 1000);
    });
  }
}

export { Tickets };
