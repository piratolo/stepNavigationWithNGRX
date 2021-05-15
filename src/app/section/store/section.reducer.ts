import { IElement } from './../../interface/iElement';
import * as SectionActions from "./section.actions";

/* Interfaccia che determina la struttura dello state di SectionReducer. Questa interfaccia viene richiamata all'interno
dell'interfaccia (AppState) che gestisce lo state di tutta l'applicazione. */
export interface State{
    elementi:{id:number,name:string,parentName:string}[],
    numeroPagina:number,
    numeroElementiPerPagina:number,
    numeroTotaleElementi:number,
    startLoading:boolean
}

/* stato iniziale da utilizzare quando si apre l'applicazione. Non è sempre necessario,
in realtà in questo caso è del tutto inutile, è presente solo a titolo di esempio*/
export const initialState:State = {
  elementi:[{id: 1557198,
    name: "AGRIST_S",
    parentName: "PROFPR_ISIISTS"}
  ],
  numeroPagina:1,
  numeroElementiPerPagina:25,
  numeroTotaleElementi:0,
  startLoading:false
}

export function sectionReducer (state:State = initialState, action: SectionActions.SectionAction){
    switch(action.type){
       case SectionActions.ADD_SCHEMA:
      //   /*lo state originale è immutabile, quindi non può essere modificato; dobbiamo
      //   fare un copia dello state prima di modificarlo */
         return{
           ...state,
           elementi: [...state.elementi, action.payload]
         }
        case SectionActions.ADD_SCHEMAS:
          return{
            ...state,
            /*questo case aggiunge una lista di elementi, per questo utilizziamo lo spread operator sul payload */
            elementi: [...state.elementi, ...action.payload]
          }
        case SectionActions.UPDATE_SCHEMA:
          /*dall'array degl schema prendiamo lo schema che vogliamo modificare */
          const schema = state.elementi[action.payload['index']];
          /* visto che lo state è immutabile non possiamo modificarlo, dobbiamo prima crearne una copia e poi modificare
          la copia */
          /*creiamo un oggetto con che contiene sia il vecchio schema sia il nuovo schema, con il quale modificheremo il vecchio schema */
          const updatedSchema = {
            /*il vecchio schema che vogliamo modificare */
            ...schema,
            /*il nuovo schema (come payload) con il quale modificare il vecchio schema*/
            ...action.payload['schema']
          }
          /*creiamo una nuova array contenente la lista degli schema e modifichiamo lo schema presente all'indice indicato dal payload*/
          const updatedSchemaArray = [...state.elementi]
          updatedSchemaArray[action.payload['index']] = updatedSchema;
          return{
              ...state,
              elementi: updatedSchemaArray
          }
          case SectionActions.DELETE_SCHEMA:
           /*  restituiamo una nuovo state rimuovendo lo schema indicato */
            return{
              ...state,
              /*il metodo filter restituisce una nuova array. Vengono ciclati gli elementi dell'array: se la funzione passata al metodo filter restituisce true,
              l'elemento corrente dell'array originale verrà aggiunto alla nuova array*/
              elementi: state.elementi.filter((schema, index)=>{
                /* nella nuova array mettiamo tutti gli schema il cui indice è diverso dal quello presente nel payload */
                return index !== action.payload
              })
            };
           case SectionActions.START_LOADING:
             return{
               ...state,
               startLoading:Boolean(action.payload)
             }
            case SectionActions.FETCH_SCHEMA:
              return{
                ...state,
                elementi:action.payload.elementi,
                numeroPagina:action.payload.numeroPagina,
                numeroElementiPerPagina:action.payload.numeroElementiPerPagina,
                numeroTotaleElementi:action.payload.numeroTotaleElementi,
              }
      default:
        return state;
    }

}
