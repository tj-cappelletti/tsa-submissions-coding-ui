export interface Authentication {
    password: string;
    userName: string;
}

export interface LoginResponse {
  expiration: string;
  token: string;
}
