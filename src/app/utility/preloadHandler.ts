import { LoadType } from './../model/section.model';
import { ErrorHandler } from './../error/errorHandler';
import { SectionComponent } from './../section/section.component';
export class PreloadHandler{

  errorHandler: ErrorHandler;

  constructor(){
    this.errorHandler = new ErrorHandler();
  }

  preload(sectionComponent:SectionComponent){
    if(sectionComponent == null)return;
    sectionComponent.pages = []
    this.errorHandler.showSectionError(sectionComponent, sectionComponent.section, false);
    if(sectionComponent.section.loadType === LoadType.LIST){
      sectionComponent.elementListData = [];
    }
    else if(sectionComponent.section.loadType === LoadType.DETAIL){
      sectionComponent.elementDetailData = [];
    }
    if(!sectionComponent.firstLoad){
      sectionComponent.loadingEndedMessage = "";
      sectionComponent.loadingEnded = false;
      sectionComponent.spinnerContainerMessage = "Caricamento in corso";
    }
    sectionComponent.spinnerContainer = true;
  }

  postLoad(sectionComponent:SectionComponent, error?: Error){
    sectionComponent.spinnerContainer = false;
    if(!sectionComponent.firstLoad){
      sectionComponent.spinnerContainerMessage = "";
      sectionComponent.loadingEndedMessage = "Caricamento terminato";
      sectionComponent.loadingEnded = true;
      sectionComponent.elementRef.nativeElement.focus();
    }

    if(sectionComponent.section.loadType === LoadType.LIST){
      if(!error)sectionComponent.elementListContainer = true;
    }
    else if(sectionComponent.section.loadType === LoadType.DETAIL){
      if(!error)sectionComponent.elementDetailContainer = true;
    }
    if(error){
      this.errorHandler.showSectionError(sectionComponent, sectionComponent.section, true, error);
    }

    if(sectionComponent.firstLoad){
      sectionComponent.firstLoad = false;
    }
  }

}
