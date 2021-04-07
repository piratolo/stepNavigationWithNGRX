import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Component, ContentChild, Input, ViewEncapsulation, ElementRef, AfterContentInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


/*********  component che gestisce la popup ********/
@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div class="modal-header">
    <h4 class="modal-title">{{modalTitle}}</h4>
    <button type="button" class="close" [attr.aria-label]="closeTitle" title="{{closeTitle}}" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body" [innerHTML]="modalContent">

  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">{{closeLabel}}</button>
  </div>
  `,
  encapsulation: ViewEncapsulation.None
})

export class NgbdModalContent {

  @Input() modalTitle;
  @Input() modalContent;
  closeLabel:string = "Chiudi";
  closeTitle:string = "Chiudi finestra modale";

  constructor(public activeModal: NgbActiveModal) {

  }

}
/*********  fine component che gestisce la popup ********/

/*********  component che gestisce il pulsante (modal.component.html) che permetterà di apre la popup ********/
@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal.component.html',
  encapsulation: ViewEncapsulation.None
})

export class ModalComponent implements AfterContentInit{

  @Input() buttonLabel:string = "Apri Modale";
  @Input() modalTitle;

  /*Nella pagina che richiama questo component (<ngbd-modal-component>
                                                    <div #content>
                                                       ...
                                                    </div>
                                                </ngbd-modal-component> )
    è possibile inserire un un tag con la reference "#content", in modo da accedere
    al contenuto html ed farlo visualizzare all'interno della popup, passandolo
    nel campo modalContent del component che stampa la popup
  */
  @ContentChild('content', {static:true}) content:ElementRef;

  constructor(private modalService: NgbModal) {
  }

  ngAfterContentInit(): void {
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.modalTitle = this.modalTitle;
    modalRef.componentInstance.modalContent = this.content.nativeElement.innerHTML;
  }

 }
/********* fine component che gestisce il pulsante che permetterà di apre la popup ********/

