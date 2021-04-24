import { SectionComponent } from './../section/section.component';
import { FormControl } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { LoadType, Section } from './../model/section.model';
export class RequestParamHandler{

/*   http://10.1.60.161/dashboardaida/resources/customer/getRiepilogoDati

  http://10.1.60.161/dashboardaida/resources/customer/getAllByFilter?numeroPagina=1&numeroElementiPerPagina=25&nome=aa
  http://10.1.60.161/dashboardaida/resources/customer/getDetailsSchemaById/1582690?numeroPagina=1&numeroElementiPerPagina=25

  http://10.1.60.161/dashboardaida/resources/customer/getDetailsTableById/1582724?numeroPagina=1&numeroElementiPerPagina=25

  http://10.1.60.161/dashboardaida/resources/customer/getDetailsColumnById/1582735 */



    formSubmit(sectionComponent:SectionComponent){
      let nome:string = "";
      if(sectionComponent.nomeInput != ""){
        nome = "&nome=" + sectionComponent.nomeInput;
      }
      sectionComponent.section.elementPerPage = sectionComponent.elementPerPageInput;
      sectionComponent.section.requestParam = "&conErrori=" + sectionComponent.conErroriInput + "&senzaErrori=" + sectionComponent.senzaErroriInput + nome ;

    }

    requestParamHandler(sectionComponent:SectionComponent){
      try{
        let id:string ="";
        if((sectionComponent.section.loadType === LoadType.DETAIL && sectionComponent.section.index == 0) || (sectionComponent.section.index > 0)){
          id = "/" + sectionComponent.section.elementDetailId;
          return id + "?numeroPagina=" + sectionComponent.section.requestedPage + "&numeroElementiPerPagina=" + sectionComponent.section.elementPerPage + sectionComponent.section.requestParam;
        }
        else{
          return "?numeroPagina=" + sectionComponent.section.requestedPage + "&numeroElementiPerPagina=" + sectionComponent.section.elementPerPage + sectionComponent.section.requestParam ;

        }
       }
      catch(e){
        console.log(e);
        return "";
      }
    }

}
