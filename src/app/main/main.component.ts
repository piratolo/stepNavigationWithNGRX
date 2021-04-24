import { environment } from './../../environments/environment';
import { AuthService } from './../service/auth.service';
import { EmitterService } from './../service/emitter.service';
import { FillElementContainer } from './../utility/fillElementContainer';
import { ElementDataParser } from './../utility/elementDataParser';
import { Counter } from './../model/counter';
import { Section, SectionType, LoadType } from './../model/section.model';
import { SectionComponent } from './../section/section.component';
import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit{

  sectionComponentArray:Array<SectionComponent> = [];
  @ViewChildren('sectionComponent') sectionComponents: QueryList<SectionComponent>;

  title = 'stepNavigation';

  sectionPrefix:string = "section";

  sectionList:number = 3;
  sectionName:Array <string> = ["Schema", "Tabelle", "Campi"];
  singularSectionName:Array <string> = ["Schema", "Tabella", "Campo"];
  sectionType:Array <SectionType> = [SectionType.SCHEMA, SectionType.TABLE, SectionType.FIELD];
  pluralSectionName:Array <string> = ["Schema", "Tabelle", "Campi"];
  sectionVisible:Array <boolean> = [true, false, false];
  elementListSuccessCallBack:Array <Function> = [];
  elementListDataParser:Array <Function> = [];
  elementDetailSuccessCallBack:Array <Function> = [];
  elementDetailDataParser:Array <Function> = [];
  elementListUrl:Array <string> = ["getAllByFilter", "getDetailsSchemaById", "getDetailsTableById"];
  elementDetailUrl:Array <string> = ["getDetailsSchemaById", "getDetailsTableById", "getDetailsColumnById"];
  noElementFound:Array <string> = ["Nessuno schema trovato", "Nessuna tabella trovata", "Nessun campo trovato"];
  elementViewed:Array <string> = ["visualizzati", "visualizzate", "visualizzati"];
  sectionObjectList:Array<Section> = [];

  counterArray:Array<Array<Counter>> = [];

  /*funzioni di callback */
  elementDataParser:ElementDataParser;
  fillElementContainer:FillElementContainer;

  constructor(private emitterService:EmitterService, private cd:ChangeDetectorRef, private authService:AuthService){;

    this.elementListSuccessCallBack.push(new FillElementContainer().fillElementList);
    this.elementListSuccessCallBack.push(new FillElementContainer().fillElementList);
    this.elementListSuccessCallBack.push(new FillElementContainer().fillElementList);

    this.elementListDataParser.push(new ElementDataParser().elementListdataParser);
    this.elementListDataParser.push(new ElementDataParser().elementListdataParser);
    this.elementListDataParser.push(new ElementDataParser().elementListdataParser);

    this.elementDetailSuccessCallBack.push(new FillElementContainer().fillElementDetail);
    this.elementDetailSuccessCallBack.push(new FillElementContainer().fillElementDetail);
    this.elementDetailSuccessCallBack.push(new FillElementContainer().fillElementDetail);

    this.elementDetailDataParser.push(new ElementDataParser().elementDetaildataParser);
    this.elementDetailDataParser.push(new ElementDataParser().elementDetaildataParser);
    this.elementDetailDataParser.push(new ElementDataParser().elementDetaildataParser);
  }

  ngOnInit(): void {

    this.authService.autoLogin();

    for(var i = 0; i < 3; i++){
      this.counterArray.push(new Array<Counter>());
    }

    /*Creazione array section e relativa inizializzazione degli oggetti section*/
    for(var i = 0; i < this.sectionList; i++){
      let section = new Section();
      section.singleLabel = this.singularSectionName[i];
      section.pluralLabel = this.pluralSectionName[i];
      section.id = this.sectionPrefix + i;
      section.index = i;
      section.type = this.sectionType[i];
      section.show = this.sectionVisible[i];
      section.loadType = LoadType.LIST;
      section.elementListSuccessCallBack = this.elementListSuccessCallBack[i];
      section.elementListDataParser = this.elementListDataParser[i];
      section.elementDetailSuccessCallBack = this.elementDetailSuccessCallBack[i];
      section.elementDetailDataParser = this.elementDetailDataParser[i];
      section.requestedPage = 1;
      section.currentPage = 1;
      section.elementPerPage = environment.elementPerPage;
      section.elementListUrl = this.elementListUrl[i];
      section.elementDetailUrl = this.elementDetailUrl[i];
      section.noElementFound= this.noElementFound[i];
      section.noElementFound= this.noElementFound[i];
      section.elementViewed= this.elementViewed[i];
      section.errorMessage = "Attenzione: i servizi al momento non sono disponibili";

      if(i == 0){
        section.firstColumn = true;
      }
      else{
        section.firstColumn = false;
      }
      if(i == (this.sectionList - 1)){
        section.lastColumn = true;
      }
      else{
        section.lastColumn = false;
      }
      this.sectionObjectList.push(section);
    }
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
    this.emitterService.firstLoad.emit(true);
    this.sectionComponents.forEach(sectionComponent => this.sectionComponentArray.push(sectionComponent));
    this.emitterService.sectionComponentArray.emit(this.sectionComponentArray);
  }

  onCounted(counter:Counter){
    this.counterArray[counter.SectionIndex].forEach(element => {
      if(element.Id == counter.Id){
        const index = this.counterArray[counter.SectionIndex].indexOf(element);
        if(index > -1)this.counterArray[counter.SectionIndex].splice(index, 1);
      }
    });

    this.counterArray[counter.SectionIndex].unshift(counter);
    console.log(this.counterArray);
  }

  counterClicked(counterCliked:Counter){
    console.log("AppComponent", counterCliked);
    this.emitterService.autoLoading.emit(counterCliked);
  }

}
