import { EmitterService } from './../service/emitter.service';
import { SectionType } from './../model/section.model';
import { Idata } from './../interface/idata';
import { PaginatorHandler } from './paginatorHandler';
import { SectionComponent } from './../section/section.component';
import * as SchemaActions from '../section/store/section.actions';
export class FillElementContainer{

  paginatorHandler: PaginatorHandler;

  fillElementList(data:Idata, sectionComponent:SectionComponent){
    console.log("fillElementList");
    sectionComponent.elementListData = sectionComponent.section.elementCurrentDataParser(data);
    //sectionComponent.elementListData = sectionComponent.store.select('schemas');
    new PaginatorHandler().buildPaginator(data.numeroTotaleElementi, data.numeroElementiPerPagina, sectionComponent);
  }

  fillElementDetail(data:Idata, sectionComponent:SectionComponent){
    sectionComponent.elementDetailData = sectionComponent.section.elementCurrentDataParser(data);
    sectionComponent.showDetailTemplate();
    sectionComponent.emitterService.loadedData.emit(sectionComponent);
  }

}
