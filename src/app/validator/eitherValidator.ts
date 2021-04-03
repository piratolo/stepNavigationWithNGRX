import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({

  selector: '[data-either-validator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EitherValidatorDirective, multi: true }
  ]
})
export class EitherValidatorDirective implements Validator{

  /*Ci da il selettore che permette di identificare il gruppo di controlli che vogliamo validare */
  @Input("data-either-validator") controlsSelector:string;

  constructor(private elementRef:ElementRef) { }

  validate(control: AbstractControl) {


    if(this.controlsSelector === undefined || this.controlsSelector === null || this.controlsSelector == "")
    {
      return null;
    }

    /*Con la seguente sintassi possiamo ricavare manualmente i campi presenti nel form al quale è stata applicata
    la direttiva
    const campo1 = control.get('name'); name è il valore dell'attributo name*/

    /*Ricaviamo tutti gli oggetti, che rispondono al nostro selettore, presenti nell'elemento FORM al quale
    abbiamo attaccato la direttiva */
    const controls:Array<any>  = this.elementRef.nativeElement.querySelectorAll(this.controlsSelector);

    /*Si verifica che all'interno del gruppo di checkbox almeno una sia selezionata */
    let validationResult:boolean = false;
    controls.forEach(element => {
      if(element.checked){
        validationResult = true;
      }
    });

    if(!validationResult){
      return { 'ev': true}
    }
    else{
      return null;
    }
  }

}
