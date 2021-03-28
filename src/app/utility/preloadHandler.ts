import { LoadType, Section } from './../model/section.model';
import { ErrorHandler } from './../error/errorHandler';
import { SectionComponent } from './../section/section.component';
export class PreloadHandler{

  errorHandler: ErrorHandler;

  constructor(){
    this.errorHandler = new ErrorHandler();
  }

  preload(sectionComponent:SectionComponent, section:Section){
    if(sectionComponent == null)return;
    this.errorHandler.showSectionError(sectionComponent, section, false);
    if(section.loadType === LoadType.LIST){
      sectionComponent.elementListData = [];
    }
    else if(section.loadType === LoadType.DETAIL){
      sectionComponent.elementDetailData = [];
    }
    sectionComponent.spinnerContainer = true;
  }

  postLoad(sectionComponent:SectionComponent, section:Section, error?: Error){
    sectionComponent.spinnerContainer = false;
    if(section.loadType === LoadType.LIST){
      if(!error)sectionComponent.elementListContainer = true;
    }
    else if(section.loadType === LoadType.DETAIL){
      if(!error)sectionComponent.elementDetailContainer = true;
    }
    if(error){
      this.errorHandler.showSectionError(sectionComponent, section, true, error);
    }
  }

}
