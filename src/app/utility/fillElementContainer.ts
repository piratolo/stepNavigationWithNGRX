import { Idata } from './../interface/idata';
import { PaginatorHandler } from './paginatorHandler';
import { SectionComponent } from './../section/section.component';
export class FillElementContainer{

  paginatorHandler: PaginatorHandler;

  fillElementList(data:Idata, sectionComponent:SectionComponent){
    sectionComponent.elementListData = sectionComponent.section.elementListDataParser(data);
    //totalElement, elementPerPage, section:Section
    sectionComponent.listContainerPaginationCode = new PaginatorHandler().buildPaginator(data.numeroTotaleElementi, data.numeroElementiPerPagina, sectionComponent.section);
   }

}
