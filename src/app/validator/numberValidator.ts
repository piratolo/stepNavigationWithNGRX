import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

/*Questo validatore verifica che il dato inserito sia un numero e
permette anche di verificare che sia compreso tra un numero minimo e un numero massimo*/

@Directive({
  /*Questo selettore, applicato al campo di input da validare, avvierà il validatore.
  Il suo valore, se definito nell'HTML, viene utilizzato dallo stesso validatore, come
  si evince dal codice sottostante (@Input...)*/
  selector: '[data-numberValidatorDirective]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: NumberValidatorDirective, multi: true }
  ]
})
export class NumberValidatorDirective implements Validator{

  /*Definiamo due input per avere un valore minimo e una massimo da utilizzare
   durante la validazione.

   L'attributo HTML data-numberValidatorDirective è quello che permette di applicare
   la direttiva e quindi di avviare il validatore. Deve essere sempre presente
   nel tag del campo di input, altrimenti non parte il validatore.
   Come si evince dal codice presente nel metodo validate(),
   il valore di questo attributo, se presente, determinerà il valore minimo che deve essere
   inserito nel campo di input.

   L'attributo HTML data-numberValidatorDirective-max è opzionale e permette, come si evince dal codice
   presente nel metodo validate(), di determinare il valore massimo che deve essere
   inserito nel campo di input. */
  @Input("data-numberValidatorDirective") minValue:string;
  @Input("data-numberValidatorDirective-max") maxValue:string;

  constructor() { }

  validate(formControlValue: FormControl) {
    if(formControlValue.value == "" || formControlValue.value === undefined || formControlValue.value === null){
      return null;
    }

    //Ricaviamo il valore del campo di input e lo trasforiamo in numero con il +
    let value:number = +formControlValue.value;

    /*Se nel campo di input è stato definito un valore per l'attributo
    data-numberValidatorDirective allora questo valore verrà utilizzato come valore minimo*/
    let min = (this.minValue !== undefined || this.minValue !== null || this.minValue != "") ? this.minValue : null;

    /*Se nel campo di input è stato definito un valore per l'attributo
    data-numberValidatorDirective-max" allora questo valore verrà utilizzato come valore massimo*/
    let max = (this.maxValue !== undefined || this.maxValue !== null || this.maxValue != "") ? this.maxValue : null;

    /*Se il valore non è numero restituiamo un errore con codice nvNaN*/
    if (isNaN(value)) {
      return { 'nvNaN': true}
    }

    /*Le righe seguenti verificano se viene richiesto e se è stato inserito numero compreso tra un valore
    minimo e uno massimo */
    let minError: boolean = false;
    let maxError: boolean = false;

    if (min != null && value < +min) {
     minError = true;
    }

    if (max != null && value > +max) {
      maxError = true;
    }

    /*Se il valore non è compreso tra il min e il max restituiamo un errore con codice nvRange*/
    if (minError && maxError) {
      return { 'nvRange': true, 'range': "compreso tra " + min + " e " + max};
    }
    if (minError && !maxError) {
      return { 'nvRange': true, 'range': "maggiore o uguale a " + min}
    }
    if (!minError && maxError) {
      return { 'nvRange': true, 'range': "minore o uguale a " + max}
    }

    return null;
  }

}
