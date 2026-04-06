import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
  static type: string;

  constructor(message?: any) {
    super();
    this.name = "CustomAuthError";
    this.type = message;
  }
}

export class InvalidEmailPasswordError extends AuthError {
  static type = "Invalid email or password";

  constructor() {
    super();
    this.name = "InvalidEmailPasswordError";
  }
}

export class AccountNotActived extends AuthError {
  static type = "Account not activated";

  constructor() {
    super();
    this.name = "AccountNotActived";
  }
}
