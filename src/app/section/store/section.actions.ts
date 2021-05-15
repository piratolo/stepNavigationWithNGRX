import { IElement } from './../../interface/iElement';
import { Action } from '@ngrx/store';


/*Quando lanciamo un'action questa passa attraverso tutti i reducer, quindi dobbiamo essere sicuri che le costanti
presenti in un file actions.ts siano diverse dalle costanti utilizzate negli altri file actions.ts. Per questo motivo utilizziamo
una convenzione che prevede l'uso di un prefisso tra parentesi quadre, invece di utilizzare una stringa in maiuscolo. Tra le parentiesi quadre
utilizzeremo come prefisso il nome della "funzione" per la quale abbiamo creato le actions. */
/* export const ADD_SCHEMA = "ADD_SCHEMA";
export const ADD_SCHEMAS = "ADD_SCHEMAS";
export const UPDATE_SCHEMA = "UPDATE_SCHEMA";
export const DELETE_SCHEMA = "DELETE_SCHEMA";
export const START_LOADING = "START_LOADING";
 */
export const ADD_SCHEMA = "[schema] add schema";
export const ADD_SCHEMAS = "[schema] add schemas";
export const UPDATE_SCHEMA = "[schema] update schema";
export const DELETE_SCHEMA = "[schema] delete schema";
export const START_LOADING = "[schema] start loading";
export const FETCH_SCHEMA = "[schema] fetch schema";

/*classe permette di aggiungere uno schema alla lista */
export class AddSchema implements Action{
  readonly type: string = ADD_SCHEMA;
  constructor(public payload: {id:number,name:string,parentName:string}){}
}

/*classe permette di aggiungere un'array di schema alla lista */
export class AddSchemas implements Action{
    /*Questa classe serve per aggiungere più elementi (quindi per aggiungere un'array di elementi). Ma se,
  come è logico pensare, nel costruttore passiamo come parametro un'array di IElement Visual Studio darà errore. Non
  è chiaro se sia un baco di TypeScript; la soluzione è passare un parametro singolo, quindi non un'array,
  senza definirne il tipo specifico, ma utilizzando il tipo "any". Per lo stesso motivo non definiamo come string
  il campo type*/
  //readonly type:string = ADD_SCHEMAS;
  //constructor(public payload: IElement[]){}

  readonly type = ADD_SCHEMAS;
  constructor(public payload:any){}
}

 /*classe permette di aggiungernare uno schema nella lista */
 export class UpdateSchema implements Action{
   readonly type: string = UPDATE_SCHEMA;
   /*il payload è un oggetto che contiene l'indice dello schema da modificare e lo schema dal quale prendere i dati*/
   constructor(public payload: {index:number, schema: IElement}){}
 }

 /*classe permette di cancellare uno schema nella lista */
 export class DeleteSchema implements Action{
   readonly type: string = DELETE_SCHEMA;
   /*il payload è un numero che indica l'indice dello schema da cancellare*/
   constructor(public payload: number){}
 }

 /*classe permette di avviare lo spinner */
 export class StartLoading implements Action{
   readonly type: string = START_LOADING;
   constructor(public payload: boolean){}
 }

/** recupera gli schema da l db */
 export class FetchSchema implements Action{
  readonly type: string = FETCH_SCHEMA;
  /* constructor(public payload: {
                              elementi:[
                                        {id: number,
                                        name: string,
                                        parentName: string
                                      }],
                                      numeroPagina:number,
                                      numeroElementiPerPagina:number,
                                      numeroTotaleElementi:number,
                                      startLoading:number
                                }){} */

  /**Come tipo di dato mettiamo any per non dover modificare molte altre cose in questa app di esempio */
  constructor(public payload:any){}
 }

/*Questa sintassi indica che SchemaActions può essere sia di tipo classe "AddSchema" sia di tipo classe "AddSchemas".
In questo modo in altre classi possiamo definire un campo di tipo SchemaActions, che potrà accettare un valore sia di tipo
"AddSchema" che di tipo "AddSchemas" */
export type SectionAction =  AddSchema | AddSchemas | UpdateSchema | DeleteSchema | StartLoading | FetchSchema;

