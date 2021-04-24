export class Counter {

  private id:number;
  private name:string;
  private sectionIndex:number;

  constructor(name:string, id:number, sectionIndex:number){
    this.id = id;
    this.name = name;
    this.sectionIndex = sectionIndex;
  }

  get Id(){
    return this.id;
  }

  set Id(value:number){
    this.id = value;
  }

  get Name(){
    return this.name;
  }

  set Name(value:string){
    this.name = value;
  }

  get SectionIndex(){
    return this.sectionIndex;
  }

  set SectionIndex(value:number){
    this.sectionIndex = value;
  }

}
