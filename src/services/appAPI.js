import { inject } from 'react-injext';
import APIClient from 'wootils/shared/apiClient';
import AppConfiguration from './appConfiguration';

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

  _fetch(url, options = {}) {
    return this._fetchClient(url, options);
  }
}

export { AppAPI };
