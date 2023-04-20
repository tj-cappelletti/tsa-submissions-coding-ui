export class AppConfig {
  //TODO: Move to API configuration
  static _apiRoot = 'https://api.tsa.local:44300/api/';
  static _clientId = 'tsa.submissions.coding.web';
  static _clientRoot = 'http://localhost:4200/';
  static _stsAuthority = 'https://identity.tsa.local:44301/';

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
