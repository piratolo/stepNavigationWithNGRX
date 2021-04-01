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
  elementListContainerVariable:object;
  clickOnPaginationCallBack:Function;
  fatherObject:object;
  childObject:object;
  firstColumn:boolean;
  lastColumn:boolean;
  elementPerPage:number;
  currentPage:number;
  requestedPage:number;
  requestParam:string;
  elementListUrl:string;
  elementDetailUrl:string;
  noElementFound:string;
  errorMessage:string;
  id:string;
  focusElementId:string;
  dataContainerId:string;

  constructor() { }


}
