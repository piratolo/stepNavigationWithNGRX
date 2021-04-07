import { Directive, Input, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  selector: '[data-detail-type]'
})
export class DetailTypeDirective implements OnInit{

  @Input() data:any;

  constructor(public viewContainerRef:ViewContainerRef) { }

  ngOnInit(): void {
  }



}
