import { ActionReducerMap } from '@ngrx/store'

import * as fromSection from '../section/store/section.reducer'
import * as fromAuth from '../auth/store/auth.reducer'


/** creiamo un'interfaccia per identificare l'intero state di tutta l'applicazione.*/
 export interface AppState{
  schemas: fromSection.State;
  auth: fromAuth.State
}

/**Creiamo un oggetto di tipo ActionReducerMap, che in app.module.ts vrrà passato come parametro al metodo
 * StoreModule.forRoot, in modo da indicare la lista dei reducer presenti nell'applicazione.
 * L'ActionReducerMap sara di tipo AppState, ovvero l'interfaccia che abbiamo creato per definire la
 * struttura del nostro application state
*/
export const appReducer: ActionReducerMap<AppState> = {
  schemas: fromSection.sectionReducer,
  auth: fromAuth.authReducer
}
