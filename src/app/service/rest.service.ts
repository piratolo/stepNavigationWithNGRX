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

  getDataList(section:Section, sectionComponent: SectionComponent){
      if(section.type == SectionType.SCHEMA){
        return this.getDataListWithType<Ischema>(section, sectionComponent);
      }
      if(section.type == SectionType.TABLE){
        return this.getDataListWithType<Ischema>(section, sectionComponent);
      }
      if(section.type == SectionType.FIELD){
        return this.getDataListWithType<Ischema>(section, sectionComponent);
      }
  }

  getDataListWithType<T>(section:Section, sectionComponent: SectionComponent){
    let params =  this.requestParamHandler.requestParamHandler(section, sectionComponent);
    console.log("params", params);
    return this.httpClient.get<T>(environment.restBaseUrl + section.elementListUrl + params);
  }

}
