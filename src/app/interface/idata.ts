import { IElement } from './iElement';
import { Ischema } from './ischema';
export interface Idata {

  elementi:Array<IElement>;
  numeroPagina:number;
  numeroElementiPerPagina:number;
  numeroTotaleElementi:number;

}
