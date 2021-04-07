import { NgbdModalContent } from './../bootstrap/modal/modal.component';
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
        sectionComponent.elementListContainer = false;
        sectionComponent.elementDetailContainer = false;
      }
      sectionComponent.errorMessageContainer = show;
    }

    if(show && error){
      this.showGenericError(sectionComponent, error, ErrorType.REST_CALL, true)
    }
  }

  showGenericError(sectionComponent: SectionComponent, error:Error, errorType: ErrorType, show:boolean){
    /* Questo codice apre programmaticamente la popup, senza che sia necessario premere il pulsante */
    const modalRef = sectionComponent.modalService.open(NgbdModalContent);
    modalRef.componentInstance.modalTitle = "Attenzione";
    modalRef.componentInstance.modalContent = "Si è verificato un errore: " + error.message;
  }

}
