import { ElementList } from '../model/elementList.model';
export class ElementDataParser {

    elementListdataParser(data:any){
      let newObject = {elements:[]};
      data.elementi.forEach(element => {
        let el = new ElementList();
        el.name = element.name;
        el.id = element.id;
        newObject.elements.push(el);
      });

      return newObject;

    }

}
