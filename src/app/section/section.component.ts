import { ErrorHandler, ErrorType } from './../error/errorHandler';
import { FillElementContainer } from './../utility/fillElementContainer';
import { ElementDataParser } from '../utility/elementDataParser';
import { PreloadHandler } from './../utility/preloadHandler';
import { EmitterService } from './../service/emitter.service';
import { RestService } from './../service/rest.service';
import { FormUtility } from './../utility/formUtility';
import { Section, SectionType } from './../model/section.model';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class SectionComponent implements OnInit, AfterViewInit {

  @ViewChild("form", {static:false}) form: NgForm;
  @Input() section: Section;

  /*campi del form */
  nomeInput:string = "";
  conErroriInput:boolean = true;
  senzaErroriInput:boolean = false;
  elementPerPageInput:number = 25;

  /*dati chiamate rest */
  elementListData:Array<any> = [];
  elementDetailData:Array<any> = [];

  /*mostra/nascondi elementi */
  dataContainer:boolean = true;
  elementListContainer:boolean = false;
  elementDetailContainer:boolean = false;
  spinnerContainer:boolean = true;
  errorMessageContainer:boolean = false;

  /*elementi html */
  listContainer:any;

  /*classi di utility */
  preloadHandler:PreloadHandler;
  elementDataParser:ElementDataParser;
  fillElementContainer:FillElementContainer;
  errorHandler: ErrorHandler;

  /*messaggi di error */
  errorMessage:string;

  constructor(public elementRef: ElementRef, private restService:RestService, private emitterService:EmitterService, private cd: ChangeDetectorRef) {
    this.preloadHandler = new PreloadHandler();
    this.elementDataParser = new ElementDataParser();
    this.fillElementContainer = new FillElementContainer();
    this.errorHandler = new ErrorHandler();
  }

  ngOnInit(): void {
    this.emitterService.firstLoad.subscribe(()=>{
      if(this.section.type == SectionType.SCHEMA){
        this.loadData();
        /*Change detect per evitare l'errore ExpressionChangedAfterItHasBeenCheckedError sul valore elementListContainer,
        che è false ma subito dopo diventa true.
        ATTENZIONE: il detectChange verrà chiamato anche su tutti i componenti figli*/
        //this.cd.detectChanges();
      }
    });
  }

  ngAfterViewInit() {
    let formUtility = new FormUtility();
    formUtility.initializeForm(this.elementRef, this.section);
  }

  onSubmit(){
    if(this.form.valid){
      this.loadData();
    }
  }

  loadData(){
    try{

      this.preloadHandler.preload(this, this.section);
      this.restService.getDataList(this.section, this).subscribe(
        result => {
        this.section.elementListSuccessCallBack(result, this);
        this.preloadHandler.postLoad(this, this.section);
        },
        error =>{
          this.preloadHandler.postLoad(this, this.section, error);
        });
    }
    catch(error){
        this.preloadHandler.postLoad(this, this.section, error);
    }
  }

}
