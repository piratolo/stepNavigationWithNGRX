import { SectionComponent } from './../section/section.component';
import { ErrorHandler, ErrorType } from '../error/errorHandler';
import { LoadType, Section } from '../model/section.model';
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

      this.initializeForm(sectionComponent.elementRef, sectionComponent);
    }
  }

  initializeForm(form: ElementRef, sectionComponent: SectionComponent):void{
    try{
      if(form == null){
        return;
      }
      let nameDiv = form.nativeElement.querySelector("div.name");
      if(nameDiv == null) return;
      nameDiv.querySelector("label").innerHTML = "Cerca " + sectionComponent.section.pluralLabel;
      nameDiv.querySelector("label").setAttribute("for", "name" + sectionComponent.section.index);
      nameDiv.querySelector("input").id = "name" + sectionComponent.section.index;

      let conErroriDiv = form.nativeElement.querySelector("div.con-errori");
      if(conErroriDiv == null) return;
      conErroriDiv.querySelector("label").setAttribute("for", "conErrori" + sectionComponent.section.index);
      conErroriDiv.querySelector("input").id = "conErrori" + sectionComponent.section.index;

      let senzaErroriDiv = form.nativeElement.querySelector("div.senza-errori");
      if(senzaErroriDiv == null) return;
      senzaErroriDiv.querySelector("label").setAttribute("for", "senzaErrori" + sectionComponent.section.index);
      senzaErroriDiv.querySelector("input").id = "senzaErrori" + sectionComponent.section.index;

      let paginationDiv = form.nativeElement.querySelector("div.element-per-page");
      if(paginationDiv == null) return;
      paginationDiv.querySelector("label").innerHTML = "Elementi per pagina";
      paginationDiv.querySelector("label").setAttribute("for", "elementPerPage" + sectionComponent.section.index);
      paginationDiv.querySelector("select").id = "elementPerPage" +  sectionComponent.section.index;

    }
    catch(e){
      this.errorHandler.showGenericError(sectionComponent, e, ErrorType.COMMON, true);
    }

  }

  formReset(sectionComponent:SectionComponent){
    //sectionComponent.section.elementPerPage = sectionComponent.formInitialValue['elementPerPageInput'];
    sectionComponent.form.resetForm(sectionComponent.formInitialValue);
  }

  callTypeHandler(sectionComponent:SectionComponent){
    switch(sectionComponent.section.loadType){
      case LoadType.LIST:
        sectionComponent.titleSection = "Lista " + sectionComponent.section.pluralLabel;
        sectionComponent.elementTitle = false;
        sectionComponent.elementListContainer = false;
        sectionComponent.elementDetailContainer = false;
        sectionComponent.filterForm=true;
        sectionComponent.closeDetailButton=false;
        sectionComponent.section.elementCurrentSuccessCallBack = sectionComponent.section.elementListSuccessCallBack;
        sectionComponent.section.elementCurrentDataParser = sectionComponent.section.elementListDataParser;
        sectionComponent.section.elementCurrentUrl = sectionComponent.section.elementListUrl;
        break;
      case LoadType.DETAIL:
        sectionComponent.titleSection = "Dettaglio " + sectionComponent.section.singleLabel;
        sectionComponent.elementTitle = false;
        sectionComponent.elementDetailContainer = false;
        sectionComponent.elementListContainer = false;
        sectionComponent.filterForm=false;
        sectionComponent.closeDetailButton=true;
        sectionComponent.section.elementCurrentSuccessCallBack = sectionComponent.section.elementDetailSuccessCallBack;
        sectionComponent.section.elementCurrentDataParser = sectionComponent.section.elementDetailDataParser;
        sectionComponent.section.elementCurrentUrl = sectionComponent.section.elementDetailUrl;
        break;
    }
  }

  resetDataHandler(sectionComponent){
    switch(sectionComponent.section.loadType){
      case LoadType.LIST:
        sectionComponent.pages = []
        //sectionComponent.elementListData = null;
        break;
      case LoadType.DETAIL:
        sectionComponent.elementDetailData = [];
        break;
    }
  }

  showCurrentDataContainer(sectionComponent:SectionComponent){
    switch(sectionComponent.section.loadType){
      case LoadType.LIST:
        sectionComponent.elementListContainer = true;
        break;
        case LoadType.DETAIL:
          sectionComponent.elementDetailContainer = true;
          break;
    }
  }

}
