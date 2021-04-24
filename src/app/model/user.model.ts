export class User{

  private _isAuthenticated:boolean;
  private _userName = "Matteo";

constructor(public email:string, public idUser:number, private _token:string, private _tokenExpirationDate:Date){
}

get isAuthenticated():boolean{
  return this._isAuthenticated;
}

set isAuthenticated(value:boolean){
  this._isAuthenticated = value;
}

public get userName():string{
  return this._userName;
}

public set userName(value:string){
  this._userName = value;
}

get token(){
   if(!this._tokenExpirationDate || new Date().getTime() > this._tokenExpirationDate.getTime()){
    return null;
  }
  return this._token;
}

get tokenExpirationDate(){
  return this._tokenExpirationDate;
}

}
