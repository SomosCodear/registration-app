import ObjectUtils from 'wootils/shared/objectUtils';

export class AppConfiguration {
  _configuration = {};

  setConfig(newConfiguration) {
    this._configuration = newConfiguration;
  }

  get(path) {
    return ObjectUtils.get(this._configuration, path);
  }
}
