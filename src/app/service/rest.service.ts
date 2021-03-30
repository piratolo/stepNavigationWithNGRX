import { SectionComponent } from './../section/section.component';
import { RequestParamHandler } from './../utility/requestParamHandler';
import { environment } from './../../environments/environment';
import { Section, SectionType } from './../model/section.model';
import { Ischema } from './../interface/ischema';
import { HttpClient } from '@angular/common/http';
import { Injectable, ElementRef } from '@angular/core';

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
    console.log("url per section " + sectionComponent.section.id + ": ", environment.restBaseUrl + sectionComponent.section.elementListUrl + params);
    return this.httpClient.get<T>(environment.restBaseUrl + sectionComponent.section.elementListUrl + params);
  }

}
