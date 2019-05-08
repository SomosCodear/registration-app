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
}

export { Tickets };
