export class AppConfig {
  //TODO: Move to API configuration
  static _apiRoot = 'http://api.tsa.local/api/';
  static _clientId = 'tsa.submissions.coding.web';
  static _clientRoot = 'http://localhost:4200/';
  static _stsAuthority = 'http://localhost:5001/';

  static apiRoot():string {
    return this._apiRoot;
  }

  static clientId():string {
    return this._clientId;
  }

  static clientRoot():string {
    return this._clientRoot;
  }

  static stsAuthority():string {
    return this._stsAuthority;
  }
}
