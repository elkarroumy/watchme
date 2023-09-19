export class User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class SignIn {
  email: string;
  password: string;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
}