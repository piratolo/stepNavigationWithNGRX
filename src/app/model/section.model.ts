import { Idata } from './../interface/idata';
export enum SectionType{
  SCHEMA,
  TABLE,
  FIELD
}

export enum LoadType{
  LIST,
  DETAIL
}

export class Section{

  singleLabel:string;
  pluralLabel:string;
  index:number;
  type:SectionType;
  show:boolean;
  loadType:LoadType;
  elementListSuccessCallBack: Function;
  elementListDataParser: Function;
  elementListErrorCallBack: Function;

  constructor() { }


}
