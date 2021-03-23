import { Section } from './model/section.model';
import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AppComponent implements OnInit{

  title = 'stepNavigation';



  sectionList: number =3;
  sectionObjectList:Array<Section> = [];

  ngOnInit(): void {
     for(var i = 0; i < this.sectionList; i++){
       console.log(i);
      let section = new Section();
      section.Label = "Sezione " + i;
      this.sectionObjectList.push(section);
    }
  }



}
