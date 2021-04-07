import { SectionComponent } from './../section/section.component';
import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  firstLoad = new EventEmitter<boolean>();
  sectionComponentArray = new EventEmitter<Array<SectionComponent>>();
  loadedData = new EventEmitter<SectionComponent>();
  closeChildSection = new EventEmitter<SectionComponent>();

  constructor() { }
}
