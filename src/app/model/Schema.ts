import { IElement } from '../interface/iElement';
import { Ischema } from './../interface/ischema';
export class Schema implements Ischema{
  oggetto: { id: number; physicalDatabase: { id: number; name: string; vendor: string; version: string; physicalModel: { physicalModelType: { certifiedFlag: string; cwSendDate: string; id: number; name: string; }; }; }; };
  id: number;
  name: string;
  parentName: string;
  elementi: IElement[];
  numeroPagina: number;
  numeroElementiPerPagina: number;
  numeroTotaleElementi: number;

}
