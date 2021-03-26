import { SectionComponent } from './../section/section.component';
export class PreloadHandler{

  preload(sectionComponent:SectionComponent){
    if(sectionComponent == null)return;
    sectionComponent.spinnerContainer = true;
    sectionComponent.elementListData = [];
  }

}
