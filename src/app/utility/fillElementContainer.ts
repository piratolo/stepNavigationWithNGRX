import { SectionComponent } from './../section/section.component';
export class FillElementContainer{

  fillElementList(data:any, sectionComponent:SectionComponent){
    sectionComponent.elementListData = sectionComponent.section.elementListDataParser(data);
  }

}
