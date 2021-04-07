import { Idata } from './idata';
export interface Ischema extends Idata{
  id:number
  name:string;
  parentName:string;
  oggetto: {
    id:number,
    physicalDatabase: {
      id:number,
      name:string,
      vendor:string,
      version:string,
      physicalModel: {
        physicalModelType: {
          certifiedFlag:string,
          cwSendDate:string,
          id:number,
          name:string
        }
      }
    }
  }
}
