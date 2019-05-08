import { inject } from 'react-injext';
import { AppAPI } from './appAPI';
import { Customers } from './customers';
import { Tickets } from './tickets';

@inject(AppAPI, Customers, Tickets)
class Purchases {
  constructor(appAPI, customers, tickets) {
    this._name = 'purchases';
    this._appAPI = appAPI;
    this._customers = customers;
    this._tickets = tickets;
  }

  searchPurchaseByIdentificationNumber(identificationNumber) {
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

  extractSummary(purchase) {
    const {
      customer: {
        attributes: {
          fullName: name,
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
    } = purchase;

    return {
      name,
      identificationNumber,
      ticketId,
      ticketType,
    };
  }
}

export { Purchases };
