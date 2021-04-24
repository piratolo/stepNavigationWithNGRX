import { NgbdModalContent } from './../../bootstrap/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorHandler } from './../../error/errorHandler';
import { Iapplication } from './../../interface/iapplication';
import { RestService } from './../../service/rest.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ApplicationFormComponent implements OnInit {

  applicatonForm:FormGroup;
  errorHandler:ErrorHandler;
  data:Iapplication;
  showTable:boolean = false;

  constructor(private formBuilder:FormBuilder, private restService:RestService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.applicatonForm =  this.formBuilder.group({
      "applicationName" : ["", Validators.pattern("[a-zA-Z 0-9]*")],
      "elementPerPage" : [environment.elementPerPage, this.elementPerPageValidator.bind(this)]
    });
    this.errorHandler = new ErrorHandler();
  }

  onSubmit(){
    console.dir(this.applicatonForm);
    this.loadData();
  }

  loadData(){
    try{
      this.restService.getApplicationList<Iapplication>(this.applicatonForm).subscribe(
        result => {
          this.showTable = true;
          this.data = result;
        },
        error =>{
          this.errorHandler.showError(this.modalService, error);
        });

    }
    catch(error){
      this.errorHandler.showError(this.modalService, error);
    }
  }

  elementPerPageValidator(control:FormControl){
    let min = 10;
    console.dir("elementPerPageValidator");
    if(control.value == min){
      return {'epp': { 'min': min}};
    }
    return null;
  }

}
