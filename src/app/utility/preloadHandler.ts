import { LoadType, Section } from './../model/section.model';
import { ErrorHandler } from './../error/errorHandler';
import { SectionComponent } from './../section/section.component';
export class PreloadHandler{

  errorHandler: ErrorHandler;

  constructor(){
    this.errorHandler = new ErrorHandler();
  }

  preload(sectionComponent:SectionComponent){
    if(sectionComponent == null)return;
    this.errorHandler.showSectionError(sectionComponent, sectionComponent.section, false);
    if(sectionComponent.section.loadType === LoadType.LIST){
      sectionComponent.elementListData = [];
      sectionComponent.listContainerPaginationCode = "";
    }
    else if(sectionComponent.section.loadType === LoadType.DETAIL){
      sectionComponent.elementDetailData = [];
    }
    sectionComponent.spinnerContainer = true;
  }

  postLoad(sectionComponent:SectionComponent, error?: Error){
    sectionComponent.spinnerContainer = false;
    if(sectionComponent.section.loadType === LoadType.LIST){
      if(!error)sectionComponent.elementListContainer = true;
    }
    else if(sectionComponent.section.loadType === LoadType.DETAIL){
      if(!error)sectionComponent.elementDetailContainer = true;
    }
    if(error){
      this.errorHandler.showSectionError(sectionComponent, sectionComponent.section, true, error);
    }
  }

}
