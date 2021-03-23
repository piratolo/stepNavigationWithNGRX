import { Section } from './../model/section.model';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.sass'],
  encapsulation:ViewEncapsulation.None
})
export class SectionComponent implements OnInit {

  @Input() section: Section;

  constructor() { }

  ngOnInit(): void {
  }

}
