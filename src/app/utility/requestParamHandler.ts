import { SectionComponent } from './../section/section.component';
import { FormControl } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { Section } from './../model/section.model';
export class RequestParamHandler{

/*   http://10.1.60.161/dashboardaida/resources/customer/getRiepilogoDati

  http://10.1.60.161/dashboardaida/resources/customer/getAllByFilter?numeroPagina=1&numeroElementiPerPagina=25&nome=aa
  http://10.1.60.161/dashboardaida/resources/customer/getDetailsSchemaById/1582690?numeroPagina=1&numeroElementiPerPagina=25

  http://10.1.60.161/dashboardaida/resources/customer/getDetailsTableById/1582724?numeroPagina=1&numeroElementiPerPagina=25

  http://10.1.60.161/dashboardaida/resources/customer/getDetailsColumnById/1582735 */




     requestParamHandler(sectionComponent:SectionComponent){
      try{
        let nome:string = "";
        if(sectionComponent.nomeInput != ""){
          nome = "&nome=" + sectionComponent.nomeInput;
        }
        sectionComponent.section.elementPerPage = sectionComponent.elementPerPageInput;
        return "?numeroPagina=" + sectionComponent.section.requestedPage + "&numeroElementiPerPagina=" + sectionComponent.elementPerPageInput + nome + "&conErrori=" + sectionComponent.conErroriInput + "&senzaError=" + sectionComponent.senzaErroriInput;
      }
      catch(e){
        return "";
      }
    }

}
