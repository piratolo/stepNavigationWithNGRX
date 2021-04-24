import { BaseDetailComponent } from './../base-detail/base-detail.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-field-detail',
  templateUrl: './field-detail.component.html',
  styleUrls: ['./field-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FieldDetailComponent extends BaseDetailComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
