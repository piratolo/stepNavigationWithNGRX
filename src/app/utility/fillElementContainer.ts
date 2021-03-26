import { SectionComponent } from './../section/section.component';
export class FillElementContainer{

  fillElementList(data:any, sectionComponent:SectionComponent){
    console.log("fillElementList");
    sectionComponent.elementListData = sectionComponent.section.elementListDataParser(data);
    sectionComponent.spinnerContainer = false;
    sectionComponent.elementListContainer = true;
  }

}
