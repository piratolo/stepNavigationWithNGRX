
export enum ErrorState{
  COMMON
}

export class ErrorHandler{

  constructor(private error:Error, private errorLocation, private errorState:ErrorState){
    switch(errorState){
      case ErrorState.COMMON:
        alert("COMMON");
        break;
    }
  }

}
