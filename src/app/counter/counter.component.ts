import { Counter } from './../model/counter';
import { Section } from './../model/section.model';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CounterComponent implements OnInit {

  @Input() counter:Array<Counter> = [];
  @Input() section: Section;
  @Output("onCounterClick") counterClick = new EventEmitter<Counter>();

  constructor() { }

  ngOnInit(): void {
  }

  counterClicked(counterClicked:Counter){
    this.counterClick.emit(counterClicked);
  }

}
