export namespace IAuth {
  export interface IUser {
    responsibleMarkets: any[];
    _id: string;
    name: string;
    email: string;
    role: string;
    __v: number;
    passwordChangedAt: number;
  }

  export interface IData {
    user: IUser;
  }

  export interface IAuthResponse {
    status: string;
    token: string;
    data: IData;
  }

  export interface ILogin {
    email: string;
    password: string;
  }

  export interface ISignUp {
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
  }
  export interface IUpdateMyPassword {
    passwordCurrent: string;
    password: string;
    passwordConfirm: string;
  }
}
