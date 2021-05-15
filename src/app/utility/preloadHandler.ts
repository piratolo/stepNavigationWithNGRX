import { SectionUtility } from './sectionUtility';
import { LoadType } from './../model/section.model';
import { ErrorHandler } from './../error/errorHandler';
import { SectionComponent } from './../section/section.component';
export class PreloadHandler{

  errorHandler: ErrorHandler;
  sectionUtility: SectionUtility;

  constructor(){
    this.errorHandler = new ErrorHandler();
    this.sectionUtility = new SectionUtility();
  }

  preload(sectionComponent:SectionComponent){
    try{
      if(sectionComponent == null)return;
      this.errorHandler.showSectionError(sectionComponent, sectionComponent.section, false);
      this.sectionUtility.callTypeHandler(sectionComponent);
      this.sectionUtility.resetDataHandler(sectionComponent);
      sectionComponent.loadingEndedMessage = "";
      if(!sectionComponent.firstLoad){

        sectionComponent.spinnerContainerMessage = "Caricamento in corso";
      }

      if(!sectionComponent.firstLoad && sectionComponent.spinnerContainerNativeElement){
        sectionComponent.spinnerContainerNativeElement.setAttribute("role", "alert");
      }
    }
    catch(e){
      console.log(e);
    }

  }

  postLoad(sectionComponent:SectionComponent, error?: Error){
    if(!sectionComponent.firstLoad){
      sectionComponent.spinnerContainerMessage = "";
      sectionComponent.loadingEndedMessage = "Caricamento terminato";
      sectionComponent.elementRef.nativeElement.querySelector(".loading-ended").focus();
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
    else{
      sectionComponent.elementTitle = true;
    }

    if(sectionComponent.firstLoad){
      sectionComponent.firstLoad = false;
    }
  }

}
