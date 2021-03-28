import { Section, LoadType } from './../model/section.model';
import { SectionComponent } from './../section/section.component';

export enum ErrorType{
  COMMON = "Attenzione: si è verificato un errore",
  REST_CALL = "Attenzione: i server potrebbero non essere raggiungibili"
}

export class ErrorHandler{

  constructor(){}

  showSectionError(sectionComponent: SectionComponent, section: Section, show:boolean):void;
  showSectionError(sectionComponent: SectionComponent, section: Section, show:boolean, error:Error):void

  showSectionError(sectionComponent: SectionComponent, section: Section, show:boolean, error?:Error):void{
    if(sectionComponent != null && section != null){
      if(show){
        sectionComponent.errorMessage = section.errorMessage;
      }
      if(section.loadType === LoadType.LIST){
        sectionComponent.elementListContainer = !show;
      }
      else if(section.loadType === LoadType.DETAIL){
        sectionComponent.elementDetailContainer = !show;
      }
      sectionComponent.errorMessageContainer = show;
    }

    if(show && error){
      console.log("Attenzione, si è verificato un errore specifico: " + error.message);
    }
  }

  showGenericError(error:Error, errorType: ErrorType, show:boolean){
    alert("Attenzione, si è verificato un errore generico: " + error.message);
  }

}
