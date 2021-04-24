import { Iapp } from './../interface/Iapp';
import { Iapplication } from './../interface/iapplication';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngbd-table-pagination',
  templateUrl: './application-table.component.html',
  encapsulation:ViewEncapsulation.None,
})

export class ApplicationTableComponent implements OnInit {

  @Input() data:Iapplication = null;
  applications:Array<Iapp>;

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  constructor() {

  }

  ngOnInit(): void {
    console.dir(this.data);
    this.collectionSize =  this.data.elementi.length;
    this.refreshCountries();

  }

  refreshCountries() {
    this.applications = this.data.elementi
       .map((app, i) => ({id: i + 1, ...app}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
