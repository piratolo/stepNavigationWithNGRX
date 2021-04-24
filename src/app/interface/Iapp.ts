import { IElement } from './iElement';
export interface Iapp extends IElement{
  idApp:number
  codApp:string;
  nomeApp:string;
  numeroTotaleElementi: number;
  sourceCobol:string;
  versApp:string;

}
