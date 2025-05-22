export interface Authentication {
    password: string;
    userName: string;
}

export interface JwtPayload {
  exp: number;
  iat: number;
  role: string;
  unique_name: string;
}

export interface LoginResponse {
  expiration: string;
  token: string;
}
