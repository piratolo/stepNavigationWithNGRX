import { User } from "src/app/model/user.model";
import * as AuthActions from "./../../auth/store/auth.actions";



const initialState: State = {
  user: null,
  authError: null

}

export interface State{
  user: User;
  /** definiamo un campo per gestire il messaggio di errore in caso
   * di autenticazione fallita */
  authError:string;
}


export function authReducer(state:State = initialState, action: AuthActions.AuthAction){
 switch(action.type){
  case AuthActions.LOGIN:
    action.payload
    const user = new User(action.payload.email, action.payload.idUser, action.payload.token, new Date(action.payload.tokenExpirationDate));
    user.isAuthenticated = true;
    return {
      ...state,
      /**Se  il login avviene senza problemi impostiamo il campo authError a null */
      authError: null,
      user: user
    }
  case AuthActions.LOGOUT:
    return {
      ...state,
      user:null
    }
  case AuthActions.LOGIN_START:
    return{
      ...state,
      /**Quando si avvia la fase di login impostiamo il campo authError a null */
      authError: null,
    }
    case AuthActions.LOGIN_FAIL:
      return{
        ...state,
        user:null,
        /**Se il login fallisce si valorizza il campo authError dello state col valore del payload */
        authError: action.payload,
      }
  default:
    return state;
 }

}
