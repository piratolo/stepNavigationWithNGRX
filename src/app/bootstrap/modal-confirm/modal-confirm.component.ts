import { Component, Input, Type, ViewEncapsulation, ContentChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">{{modalTitle}}</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body" [innerHTML]="modalContent">
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('ko')">{{koButtonLabel}}</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('ok')">{{okButtonLabel}}</button>
  </div>
  `
})
export class NgbdModalConfirm {

  @Input() modalTitle = "";
  @Input() modalContent = "";
  @Input() okButtonLabel = "Ok";
  @Input() koButtonLabel = "Annulla";

  constructor(public modal: NgbActiveModal) {}
}

@Component({
  selector: 'ngbd-modal-focus',
  templateUrl: './modal-confirm.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ModalConfirmComponent {

  @Input() buttonLabel:string = "Apri Modale";
  @Input() modalTitle = "";
  @Input() okButtonLabel = "Ok";
  @Input() koButtonLabel = "Annulla";

  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
      (click)="modal.close('Ok click')">Ok</button>`;

  @ContentChild('content', {static:true}) content:ElementRef;

  constructor(private _modalService: NgbModal) {}

  open(name: string) {
    const modalRef = this._modalService.open(NgbdModalConfirm);
    modalRef.componentInstance.modalTitle = this.modalTitle;
    modalRef.componentInstance.okButtonLabel = this.okButtonLabel;
    modalRef.componentInstance.koButtonLabel = this.koButtonLabel;
  }
}
