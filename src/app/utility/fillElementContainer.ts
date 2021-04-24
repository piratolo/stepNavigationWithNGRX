import { EmitterService } from './../service/emitter.service';
import { SectionType } from './../model/section.model';
import { Idata } from './../interface/idata';
import { PaginatorHandler } from './paginatorHandler';
import { SectionComponent } from './../section/section.component';
export class FillElementContainer{

  paginatorHandler: PaginatorHandler;

  fillElementList(data:Idata, sectionComponent:SectionComponent){
    sectionComponent.elementListData = sectionComponent.section.elementCurrentDataParser(data);
    new PaginatorHandler().buildPaginator(data.numeroTotaleElementi, data.numeroElementiPerPagina, sectionComponent);
  }

  fillElementDetail(data:Idata, sectionComponent:SectionComponent){
    sectionComponent.elementDetailData = sectionComponent.section.elementCurrentDataParser(data);
    sectionComponent.showDetailTemplate();
    sectionComponent.emitterService.loadedData.emit(sectionComponent);
  }

}
