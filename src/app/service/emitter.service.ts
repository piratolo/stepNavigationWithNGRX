import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  firstLoad = new EventEmitter<boolean>();

  constructor() { }
}
