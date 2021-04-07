import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-base-detail',
  templateUrl: './base-detail.component.html',
  styleUrls: ['./base-detail.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class BaseDetailComponent implements OnInit {

  data:any;

  constructor() { }

  ngOnInit(): void {
  }

}
