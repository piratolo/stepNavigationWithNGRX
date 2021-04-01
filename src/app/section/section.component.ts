import { IPage } from './../interface/ipage';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandler, ErrorType } from './../error/errorHandler';
import { FillElementContainer } from './../utility/fillElementContainer';
import { ElementDataParser } from '../utility/elementDataParser';
import { PreloadHandler } from './../utility/preloadHandler';
import { EmitterService } from './../service/emitter.service';
import { RestService } from './../service/rest.service';
import { SectionUtility } from '../utility/sectionUtility';
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
  initialFormValue: Object;
  formInitialValue = {};
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
  spinnerMessage:string;

  /*classi di utility */
  preloadHandler:PreloadHandler;
  elementDataParser:ElementDataParser;
  fillElementContainer:FillElementContainer;
  errorHandler: ErrorHandler;
  sectionUtility:SectionUtility;

  /*messaggi di error */
  errorMessage:string;

  /*paginazione */
  pages:Array<IPage> = [];

  firstLoad:boolean = true;

  constructor(public sanitizer: DomSanitizer, public elementRef: ElementRef, private restService:RestService, private emitterService:EmitterService, private cd: ChangeDetectorRef) {
    this.preloadHandler = new PreloadHandler();
    this.elementDataParser = new ElementDataParser();
    this.fillElementContainer = new FillElementContainer();
    this.errorHandler = new ErrorHandler();
    this.sectionUtility = new SectionUtility();
  }

  ngOnInit(): void {
    this.section.clickOnPaginationCallBack = this.loadData.bind(this); this.prova.bind(this);
    this.formInitialValue = {name: this.nomeInput, conErrori: this.conErroriInput, senzaErrori: this.senzaErroriInput, elementPerPage: this.elementPerPageInput};
    this.emitterService.firstLoad.subscribe(()=>{
      if(this.section.type == SectionType.SCHEMA){
        this.loadData();
        /*Change detect per evitare l'errore ExpressionChangedAfterItHasBeenCheckedError sul valore elementListContainer,
        che è false ma subito dopo diventa true.
        ATTENZIONE: il detectChange verrà chiamato anche su tutti i componenti figli*/
        this.cd.detectChanges();
      }
    });
  }

  ngAfterViewInit() {
    this.sectionUtility.initializeSection(this);
  }

  onSubmit(){
    if(this.form.valid){
      this.section.currentPage = 1;
      this.section.requestedPage = 1;
      this.loadData();
    }
  }

  formReset(){
    this.sectionUtility.formReset(this);
  }

  loadData(){
    try{
      this.preloadHandler.preload(this);
      this.restService.getDataList(this).subscribe(
        result => {
        this.section.elementListSuccessCallBack(result, this);
        this.preloadHandler.postLoad(this);
        },
        error =>{
          this.preloadHandler.postLoad(this, error);
        });
    }
    catch(error){
        this.preloadHandler.postLoad(this, error);
    }
  }

  prova(){
    alert();
  }

}
