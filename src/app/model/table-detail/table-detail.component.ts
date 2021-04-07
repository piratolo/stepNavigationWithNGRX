import { BaseDetailComponent } from './../base-detail/base-detail.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class TableDetailComponent extends BaseDetailComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
