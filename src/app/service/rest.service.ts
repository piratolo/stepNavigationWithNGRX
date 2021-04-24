import { SectionComponent } from './../section/section.component';
import { RequestParamHandler } from './../utility/requestParamHandler';
import { environment } from './../../environments/environment';
import { SectionType } from './../model/section.model';
import { Ischema } from './../interface/ischema';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  requestParamHandler:RequestParamHandler;

  constructor(private httpClient:HttpClient) {
    this.requestParamHandler = new RequestParamHandler();
  }

  getDataList(sectionComponent: SectionComponent){
      if(sectionComponent.section.type == SectionType.SCHEMA){
        return this.getDataListWithType<Ischema>(sectionComponent);
      }
      if(sectionComponent.section.type == SectionType.TABLE){
        return this.getDataListWithType<Ischema>(sectionComponent);
      }
      if(sectionComponent.section.type == SectionType.FIELD){
        return this.getDataListWithType<Ischema>(sectionComponent);
      }
  }

  getDataListWithType<T>(sectionComponent: SectionComponent){
    let params =  this.requestParamHandler.requestParamHandler(sectionComponent);
    console.log("url per section " + sectionComponent.section.id + ": ", environment.restBaseUrl + sectionComponent.section.elementCurrentUrl + params);
    return this.httpClient.get<T>(environment.restBaseUrl + sectionComponent.section.elementCurrentUrl + params);
  }

  getApplicationList<T>(applicatonForm:FormGroup){
    let name = applicatonForm.get("applicationName").value;
    console.log("name", name);
    let elementPerPage = applicatonForm.get("elementPerPage").value;
    let params = "";
    params = (name != "") ? "?name=" + name + "&numeroElementiPerPagina=" + elementPerPage : "?numeroElementiPerPagina=" + elementPerPage;
    let url = environment.restBaseUrl + "getAllApp" + params;
    console.log(url);
    return this.httpClient.get<T>(url);
  }

}
