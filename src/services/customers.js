import { inject } from 'react-injext';
import { AppAPI } from './appAPI';

@inject(AppAPI)
class Customers {
  constructor(appAPI) {
    this._name = 'customers';
    this._appAPI = appAPI;
  }

  searchCustomerByIdentificationNumber(identificationNumber) {
    return this._appAPI.filterCustomers({ identificationNumber }, true);
  }
}

export { Customers };
