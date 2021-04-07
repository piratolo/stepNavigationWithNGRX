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
  elementListClickSuccessCallBack: Function;
  clickOnPaginationCallBack:Function;
  elementDetailSuccessCallBack: Function;
  elementDetailDataParser: Function;
  elementCurrentSuccessCallBack: Function;
  elementCurrentDataParser: Function;
  fatherObject:Object;
  childObject:Object;
  firstColumn:boolean;
  lastColumn:boolean;
  elementPerPage:number;
  currentPage:number;
  requestedPage:number;
  requestParam:string ="";
  elementListUrl:string;
  elementDetailUrl:string;
  elementCurrentUrl: string;
  noElementFound:string;
  errorMessage:string;
  id:string;
  dataContainerId:string;
  elementDetailId:number;
  fatherElementDetailId:number;

  constructor() { }


}
