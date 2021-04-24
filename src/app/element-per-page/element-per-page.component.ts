import { AbstractControl } from '@angular/forms';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-element-per-page',
  templateUrl: './element-per-page.component.html',
  styleUrls: ['./element-per-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})

/*Componente che gestisce la select della paginazione. Lo scopo di questo componente è il riutilizzo nei reactive form.
Un esempio di implementazione in un reative form è presente nel template application-form.component.html

  <app-element-per-page [control]="nomeDelFormGroupCheDeveContenereLaSelect.get('nomeDelControlloNelFormGroup')" [idPrefix]="'prefissoDaApplicareAllDIdDellaSelect '" [controlName]="'attributoNameDaDareAllaSelect'" [labelText]="'testoDellaLabel'"></app-element-per-page>

*/
export class ElementPerPageComponent implements OnInit {

  @Input() control:AbstractControl;
  @Input() idPrefix:string;
  @Input() controlName:string;
  @Input() labelText:string;

  controlId:string;

  constructor() { }

  ngOnInit(): void {
    this.controlId = this.idPrefix + "ElementoPerPage";
  }

  prova:string;

}
