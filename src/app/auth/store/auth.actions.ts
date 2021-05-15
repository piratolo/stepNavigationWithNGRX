import { Action } from '@ngrx/store';

/* export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT"; */
export const LOGIN = "[authentication] login";
export const LOGOUT = "[authentication] logout";
export const LOGIN_START = "[authentication] login start";
export const LOGIN_FAIL = "[authentication] login fail";
export const AUTO_LOGIN = "[authentication] auto login";


export class Login implements Action{
  readonly type:string = LOGIN;
  constructor(public payload:{
    email:string,
    idUser:number,
    token:string,
    tokenExpirationDate:Date
  }){}
}

export class Logout implements Action{
  type:string = LOGOUT;
  payload:any;
}

export class LoginStart implements Action{
  type:string = LOGIN_START;
  constructor(public payload:{email:string, password:string}){}
}

export class LoginFail implements Action{
  type: string = LOGIN_FAIL;
  constructor(public payload:string){}
}

export class AutoLogin implements Action{
  type: string = AUTO_LOGIN;
  payload:any;
}

export type AuthAction = Login | Logout | LoginStart | LoginFail | AutoLogin;
