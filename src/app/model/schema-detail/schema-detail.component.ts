import { BaseDetailComponent } from './../base-detail/base-detail.component';
import { Component, OnInit, AfterViewInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-schema-detail',
  templateUrl: './schema-detail.component.html',
  styleUrls: ['./schema-detail.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class SchemaDetailComponent extends BaseDetailComponent implements OnInit{

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
