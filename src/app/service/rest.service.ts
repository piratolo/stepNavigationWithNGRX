import { Observable } from 'rxjs';
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
        if(environment.inailVPN){
          return this.getDataListWithType<Ischema>(sectionComponent)
        }
        else{
          return new Observable((observer) => {
          let fakeValue = "";
          if(sectionComponent.section.loadType == 0){
            fakeValue= JSON.parse('{"elementi":[{"id":1557198,"name":"AGRIST_S","parentName":"PROFPR_ISIISTS"},{"id":1582690,"name":"ANAGPRO","parentName":"ANAGPRO"},{"id":245569,"name":"BDIFO","parentName":"PAEBQ"},{"id":1891665,"name":"BDS","parentName":"BDS"},{"id":302354,"name":"BICBN","parentName":"BICBN"},{"id":320484,"name":"BICHT","parentName":"BICHT"},{"id":335486,"name":"BICHU","parentName":"BICHT"},{"id":252460,"name":"BICHU","parentName":"BICHU"},{"id":282715,"name":"BICOL","parentName":"BICHU"},{"id":302335,"name":"BICOL","parentName":"BICOP"},{"id":299155,"name":"BICOP","parentName":"BICOP"},{"id":204542,"name":"BICXT","parentName":"BICXT"},{"id":1306906,"name":"BTCH","parentName":"PADLN"},{"id":633665,"name":"CEASC","parentName":"CEASC"},{"id":615015,"name":"CEPKM","parentName":"CEPKM"},{"id":602469,"name":"CEPO2","parentName":"CEPO2"},{"id":608573,"name":"CEPOM","parentName":"CEPO2"},{"id":602498,"name":"CEPOM","parentName":"CEPOM"},{"id":602592,"name":"CEPOX","parentName":"CEPOX"},{"id":1577752,"name":"CERTMP","parentName":"CERTIFICATIDIMALATTIAPROFESSIONALE"},{"id":1306482,"name":"CIANS","parentName":"PADLN"},{"id":1898375,"name":"CLARITY","parentName":"CLARITY"},{"id":245566,"name":"DBPAEBQ0","parentName":"PAEBQ"},{"id":245565,"name":"DBPAEBQL","parentName":"PAEBQ"},{"id":840052,"name":"DBPAVIV0","parentName":"PAVIV"}],"numeroElementiPerPagina":25,"numeroPagina":1,"numeroTotaleElementi":104}');
          }
          else{
            fakeValue = JSON.parse('{"elementi":[{"id":1557281,"name":"DOMANDA"},{"id":1557238,"name":"GRADUATORIA_DOMANDE_STORICO"},{"id":1557199,"name":"TIPO_STATO_AMMISSIONE"},{"id":1557341,"name":"VERIFICA_PROGETTO"}],"numeroElementiPerPagina":25,"numeroPagina":1,"numeroTotaleElementi":4,"oggetto":{"id":1557198,"physicalDatabase":{"id":1549544,"name":"profprs","physicalModel":{"physicalModelType":{"certifiedFlag":"N","cwSendDate":"15-01-2018","id":1549542,"name":"PROFPR_ISIISTS"}},"vendor":"Oracle","version":"11"}}}');
           }
            observer.next(fakeValue);
            observer.complete()
        })
        }
      }
      if(sectionComponent.section.type == SectionType.TABLE){
        if(environment.inailVPN){
          return this.getDataListWithType<Ischema>(sectionComponent);
        }
        else{
          return new Observable((observer) => {
          let fakeValue = "";
          if(sectionComponent.section.loadType == 0){
            fakeValue = JSON.parse('{"elementi":[{"id":1557281,"name":"DOMANDA"},{"id":1557238,"name":"GRADUATORIA_DOMANDE_STORICO"},{"id":1557199,"name":"TIPO_STATO_AMMISSIONE"},{"id":1557341,"name":"VERIFICA_PROGETTO"}],"numeroElementiPerPagina":25,"numeroPagina":1,"numeroTotaleElementi":4,"oggetto":{"id":1557198,"physicalDatabase":{"id":1549544,"name":"profprs","physicalModel":{"physicalModelType":{"certifiedFlag":"N","cwSendDate":"15-01-2018","id":1549542,"name":"PROFPR_ISIISTS"}},"vendor":"Oracle","version":"11"}}}');
          }
          else{
            fakeValue = JSON.parse('{"elementi":[{"id":252484,"name":"ACB_ACRONIMO_HRB"},{"id":252485,"name":"ACB_DESCR"},{"id":252483,"name":"ACB_ID"}],"numeroElementiPerPagina":25,"numeroPagina":1,"numeroTotaleElementi":3,"oggetto":{"documentation":"ACRONIMI BANCHE","id":252482,"name":"TCHUACB"}}');
           }
            observer.next(fakeValue);
            observer.complete()
        })
        }
      }
      if(sectionComponent.section.type == SectionType.FIELD){
        if(environment.inailVPN){
          return this.getDataListWithType<Ischema>(sectionComponent);
        }
        else{
          return new Observable((observer) => {
          let fakeValue = "";
          if(sectionComponent.section.loadType == 0){
            fakeValue= JSON.parse('{"elementi":[{"id":1306919,"name":"BCCOMMITIME"},{"id":1306911,"name":"BCFREQCOMMIT"},{"id":1306920,"name":"BCFREQTIME"},{"id":1306916,"name":"BCINDFIRST"},{"id":1306914,"name":"BCINDREST"},{"id":1306913,"name":"BCINDSTOP"},{"id":1306921,"name":"BCINDTIME"},{"id":1306909,"name":"BCNOMEJOB"},{"id":1306910,"name":"BCNOMEPLN"},{"id":1306912,"name":"BCNUMCOMMIT"},{"id":1306915,"name":"BCRESTINF"},{"id":1306917,"name":"BCSTARTDATE"},{"id":1306918,"name":"BCSTARTTIME"}],"numeroElementiPerPagina":25,"numeroPagina":1,"numeroTotaleElementi":13,"oggetto":{"id":1306908,"name":"CONTROL"}}');
          }
          else{
            fakeValue = JSON.parse('{"dataTypeCategory":"SQLDataTypes:CharacterStringDataType","dataTypeLength":"10","dataTypeName":"VARCHAR2","fieldProcedureName":"fieldProcName","fieldProcedureParameters":"fieldProcParameters","id":1582735,"nullableFlag":"Y","primitiveType":"CHARACTER_VARYING"}');
           }
            observer.next(fakeValue);
            observer.complete()
        })
        }
      }
  }

  getDataListWithType<T>(sectionComponent: SectionComponent){
    let params =  this.requestParamHandler.requestParamHandler(sectionComponent);
    console.log("url per section " + sectionComponent.section.id + ": ", environment.restBaseUrl + sectionComponent.section.elementCurrentUrl + params);
    return this.httpClient.get<T>(environment.restBaseUrl + sectionComponent.section.elementCurrentUrl + params);
  }

  getApplicationList<T>(applicatonForm:FormGroup){
    let name = applicatonForm.get("applicationName").value;
    let elementPerPage = applicatonForm.get("elementPerPage").value;
    let params = "";
    params = (name != "") ? "?name=" + name + "&numeroElementiPerPagina=" + elementPerPage : "?numeroElementiPerPagina=" + elementPerPage;
    let url = environment.restBaseUrl + "getAllApp" + params;
    console.log(url);
    if(environment.inailVPN){
      return this.httpClient.get<T>(url);
    }
    else{
      return new Observable<T>((observer) => {
      observer.next(JSON.parse('{"elementi":[{"codApp":"ADC-BuoniTaxi_adcbe-application [01-09-2020]","idApp":8278,"nomeApp":"Generic_Super_Pom","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"Run2_01-SET-20_old"},{"codApp":"ADC-BuoniTaxi_adcbe-application [old patterns 03-09-2020]","idApp":8284,"nomeApp":"Generic_Super_Pom","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"Run2_03-SET-20_old"},{"codApp":"ADC-BuoniTaxi_adcbe-application [test new patterns 03-09-2020]","idApp":8286,"nomeApp":"Generic_Super_Pom","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"Run2_03-SET-20_old"},{"codApp":"ADC-BuoniTaxi_adcbe-application (OK)","idApp":8287,"nomeApp":"Generic_Super_Pom","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"Run2_04-SET-20_old"},{"codApp":"AgendaAppuntamenti_agenda-dal","idApp":8371,"nomeApp":"agenda-dal-component","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"Run31.0"},{"codApp":"Alpi_AlpiEjb-new2","idApp":8468,"nomeApp":"autoliquidazione-alpi-be","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"Run36.0.2"},{"codApp":"Alpi_AlpiEjb-new3","idApp":8469,"nomeApp":"autoliquidazione-alpi-be","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"Run36.0.2"},{"codApp":"Alpi_AlpiEjb-new4","idApp":8470,"nomeApp":"autoliquidazione-alpi-be","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"Run36.0.2"},{"codApp":"Alpi_AlpiEjb-new5","idApp":8471,"nomeApp":"autoliquidazione-alpi-be","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"Run36.0.2"},{"codApp":"Alpi_AlpiEjb-new6","idApp":8475,"nomeApp":"autoliquidazione-alpi-be","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"Run36.0.2"},{"codApp":"Alpi_AlpiEjb-new7","idApp":8476,"nomeApp":"autoliquidazione-alpi-be","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"Run36.0.2"},{"codApp":"Alpi_AlpiEjb-new10","idApp":8481,"nomeApp":"autoliquidazione-alpi-be","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"Run36.0.2"},{"codApp":"Alpi_AlpiEjb-new11","idApp":8482,"nomeApp":"autoliquidazione-alpi-be","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"Run36.0.2"},{"codApp":"Alpi_AlpiEjb-new12","idApp":8483,"nomeApp":"autoliquidazione-alpi-be","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"Run36.0.2"},{"codApp":"Alpi_AlpiEjb-last1","idApp":8555,"nomeApp":"autoliquidazione-alpi-be","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"6.0.2"},{"codApp":"Alpi_AlpiEjb-last2","idApp":8594,"nomeApp":"autoliquidazione-alpi-be","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"Run1_6.0.2_AND"},{"codApp":"Alpi_AlpiEjb-last3","idApp":8616,"nomeApp":"autoliquidazione-alpi-be","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"6.0.2_AND"},{"codApp":"Alpi_AlpiEjb","idApp":8647,"nomeApp":"autoliquidazione-alpi-be","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"6.0.2"},{"codApp":"AIDA_aida-be-ear","idApp":8657,"nomeApp":"aida-be-pom","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"Run1_3.0.2"},{"codApp":"AIDA_aida-be-ear","idApp":8674,"nomeApp":"aida-be-pom","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"Run2_3.0.2"},{"codApp":"AIDA_aida-be-ear","idApp":8682,"nomeApp":"aida-be-pom","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"Run3_3.0.2"},{"codApp":"AIDA_aida-be-ear","idApp":8691,"nomeApp":"aida-be-pom","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"Run4_3.0.2"},{"codApp":"AIDA_aida-be-ear","idApp":8699,"nomeApp":"aida-be-pom","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"Run5_3.0.2"},{"codApp":"AIDA_aida-be-ear","idApp":8703,"nomeApp":"aida-be-pom","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"RunBL_3.0.2"},{"codApp":"AIDA_aida-be-ear","idApp":8706,"nomeApp":"aida-be-pom","numeroTotaleElementi":0,"sourceCobol":"false","versApp":"3.0.2"}],"numeroElementiPerPagina":25,"numeroPagina":1,"numeroTotaleElementi":196}'));
      observer.complete()
    })
    }
  }

}
