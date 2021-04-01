import { SectionComponent } from './../section/section.component';
import { ErrorHandler, ErrorType } from '../error/errorHandler';
import { Section } from '../model/section.model';
import { ElementRef } from "@angular/core";

export class SectionUtility{

  errorHandler:ErrorHandler;

  constructor(){
    this.errorHandler = new ErrorHandler();
  }

  initializeSection(sectionComponent: SectionComponent){
    if(sectionComponent.elementRef){
      sectionComponent.elementRef.nativeElement.id = sectionComponent.section.id;

      sectionComponent.section.dataContainerId = "data" + sectionComponent.section.index;
      sectionComponent.elementRef.nativeElement.querySelector(".data-container").id = sectionComponent.section.dataContainerId;

      this.initializeForm(sectionComponent.elementRef, sectionComponent.section);
    }
  }

  initializeForm(form: ElementRef, section:Section):void{
    try{
      if(form == null){
        return;
      }
      let nameDiv = form.nativeElement.querySelector("div.name");
      if(nameDiv == null) return;
      nameDiv.querySelector("label").innerHTML = "Cerca " + section.pluralLabel;
      nameDiv.querySelector("label").setAttribute("for", "name" + section.index);
      nameDiv.querySelector("input").id = "name" + section.index;

      let conErroriDiv = form.nativeElement.querySelector("div.con-errori");
      if(conErroriDiv == null) return;
      conErroriDiv.querySelector("label").setAttribute("for", "conErrori" + section.index);
      conErroriDiv.querySelector("input").id = "conErrori" + section.index;

      let senzaErroriDiv = form.nativeElement.querySelector("div.senza-errori");
      if(senzaErroriDiv == null) return;
      senzaErroriDiv.querySelector("label").setAttribute("for", "senzaErrori" + section.index);
      senzaErroriDiv.querySelector("input").id = "senzaErrori" + section.index;

      let paginationDiv = form.nativeElement.querySelector("div.element-per-page");
      if(paginationDiv == null) return;
      paginationDiv.querySelector("label").innerHTML = "Elementi per pagina";
      paginationDiv.querySelector("label").setAttribute("for", "elementPerPage" + section.index);
      paginationDiv.querySelector("select").id = "elementPerPage" +  section.index;

    }
    catch(e){
      this.errorHandler.showGenericError(e, ErrorType.COMMON, true);
    }

  }

  formReset(sectionComponent:SectionComponent){
    sectionComponent.section.elementPerPage = sectionComponent.elementPerPageInput;
    sectionComponent.form.resetForm(sectionComponent.formInitialValue);
  }

}
