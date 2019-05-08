import { inject } from 'react-injext';
import { AppAPI } from './appAPI';
import { Customers } from './customers';
import { Tickets } from './tickets';

@inject(AppAPI, Customers, Tickets)
class Purchases {
  constructor(appAPI, customers, tickets) {
    this._appAPI = appAPI;
    this._customers = customers;
    this._tickets = tickets;
  }

  searchPurchaseByIdentificationNumbe(identificationNumber) {
    let customer;
    return this._customers.searchCustomerByIdentificationNumber(identificationNumber)
    .then((response) => {
      let nextStep;
      if (response) {
        customer = response;
        nextStep = this._tickets.searchTicketByCustomerId(customer.id);
      }

      return nextStep;
    })
    .then((response) => (response && {
      customer,
      ticket: response,
    }));
  }
}

export { Purchases };
