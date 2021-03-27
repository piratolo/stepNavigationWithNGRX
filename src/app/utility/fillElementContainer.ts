import { ElementList } from './../model/elementList.model';
import { element } from 'protractor';
import { SectionComponent } from './../section/section.component';
export class FillElementContainer{

  fillElementList(data:any, sectionComponent:SectionComponent){
    sectionComponent.elementListData = sectionComponent.section.elementListDataParser(data);
    sectionComponent.spinnerContainer = false;
    sectionComponent.elementListContainer = true;
  }

}
