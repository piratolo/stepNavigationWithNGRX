import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-collapse-basic',
  templateUrl: './collapse-basic.component.html',
  styleUrls: ['./collapse-basic.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgbdCollapseBasic implements OnInit {

  public isCollapsed = false;
  @Input() buttonLabel:string;
  @Input() id:string;


  ngOnInit(): void {
  }
}


