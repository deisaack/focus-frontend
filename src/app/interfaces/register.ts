export class GetUser {
  constructor (
    public email: string,
    public image: string,
    public username: string,
  ) {}
}

export class Register {
  constructor (
    public username: string,
    public password: string,
    public email?: string,
    public first_name?: string,
    public last_name?: string,
    public confirm_password?: string,
    public token?: string,
  ) {}
}

export class Login {
  constructor (
    public username: string,
    public password: string,
  ) {}
}

export class RegisterErrors {
  constructor (
    public id?: number,
    public email?: any,
    public username?: any,
    public password?: any,
    public first_name?: any,
    public last_name?: any,
    public confirm_password?: any,
    public token?: string,
  ) {}
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
