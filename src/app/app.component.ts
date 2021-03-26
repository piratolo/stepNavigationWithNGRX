import { FillElementContainer } from './utility/fillElementContainer';
import { ElementDataParser } from './utility/elementDataParser';
import { EmitterService } from './service/emitter.service';
import { RestService } from './service/rest.service';
import { Section, SectionType, LoadType } from './model/section.model';
import { Component, ViewEncapsulation, OnInit, AfterViewInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit{

  title = 'stepNavigation';

  sectionList:number = 3;
  sectionName:Array <string> = ["Schema", "Tabelle", "Campi"];
  singularSectionName:Array <string> = ["Schema", "Tabella", "Campo"];
  sectionType:Array <SectionType> = [SectionType.SCHEMA, SectionType.TABLE, SectionType.FIELD];
  pluralSectionName:Array <string> = ["Schema", "Tabelle", "Campi"];
  sectionVisible:Array <boolean> = [true, false, false];
  elementListSuccessCallBack:Array <Function> = [];
  elementListDataParser:Array <Function> = [];

  sectionObjectList:Array<Section> = [];

  /*funzioni di callback */
  elementDataParser:ElementDataParser;
  fillElementContainer:FillElementContainer;

  constructor(private emitterService:EmitterService){
    this.fillElementContainer = new FillElementContainer();
    this.elementListSuccessCallBack.push(this.fillElementContainer.fillElementList);
    this.elementListSuccessCallBack.push(this.fillElementContainer.fillElementList);
    this.elementListSuccessCallBack.push(this.fillElementContainer.fillElementList);

    this.elementDataParser = new ElementDataParser();
    this.elementListDataParser.push(this.elementDataParser.elementListdataParser);
    this.elementListDataParser.push(this.elementDataParser.elementListdataParser);
    this.elementListDataParser.push(this.elementDataParser.elementListdataParser);
  }

  ngOnInit(): void {
     for(var i = 0; i < this.sectionList; i++){
      let section = new Section();
      section.singleLabel = this.singularSectionName[i];
      section.pluralLabel = this.pluralSectionName[i];
      section.index = i;
      section.type = this.sectionType[i];
      section.show = this.sectionVisible[i];
      section.loadType = LoadType.LIST;
      section.elementListSuccessCallBack = this.elementListSuccessCallBack[i];
      section.elementListDataParser = this.elementListDataParser[i];
      this.sectionObjectList.push(section);
    }
  }

  ngAfterViewInit(): void {
    this.emitterService.firstLoad.emit(true);
  }

}
