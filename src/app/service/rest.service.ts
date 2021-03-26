import { environment } from './../../environments/environment';
import { FormUtility } from './../utility/formUtility';
import { Section, SectionType } from './../model/section.model';
import { Ischema } from './../interface/ischema';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient:HttpClient) {
  }

  getData(section:Section){
      if(section.type == SectionType.SCHEMA){
        return this.getDataWithType<Ischema>();
      }
      if(section.type == SectionType.TABLE){
        return this.getDataWithType<Ischema>();
      }
      if(section.type == SectionType.FIELD){
        return this.getDataWithType<Ischema>();
      }
  }

  getDataWithType<T>(){
    return this.httpClient.get<T>(environment.restBaseUrl + "getAllByFilter?numeroPagina=1&numeroElementiPerPagina=25")
  }
}
