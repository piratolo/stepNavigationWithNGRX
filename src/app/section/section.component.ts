import { RequestParamHandler } from './../utility/requestParamHandler';
import { NgbdModalContent } from './../bootstrap/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableDetailComponent } from './../model/table-detail/table-detail.component';
import { BaseDetailComponent } from './../model/base-detail/base-detail.component';
import { SchemaDetailComponent } from './../model/schema-detail/schema-detail.component';
import { DetailTypeDirective } from './../directive/detail-type.directive';
import { IPage } from './../interface/ipage';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandler, ErrorType } from './../error/errorHandler';
import { FillElementContainer } from './../utility/fillElementContainer';
import { ElementDataParser } from '../utility/elementDataParser';
import { PreloadHandler } from './../utility/preloadHandler';
import { EmitterService } from './../service/emitter.service';
import { RestService } from './../service/rest.service';
import { SectionUtility } from '../utility/sectionUtility';
import { LoadType, Section, SectionType } from './../model/section.model';
import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class SectionComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("form", {static:false}) form: NgForm;
  @Input() section: Section;
  /*Utilizziamo @ViewCHild per recuperare l’elemento nel quale mostrare a RUNTIME il component per mostrare il dettaglio
    dell'elemento selezionato (Schema, tabella, ecc.). Come parametro passiamo la direttiva DetailTypeDirective
    che serve a indentificare l’elemento html che conterrà il component.
    Infatti, all’elemento che deve contenere il component applicheremo il selettore della direttiva DetailTypeDirective*/
  @ViewChild(DetailTypeDirective, {static:false}) detailTypeHost:DetailTypeDirective;

  sectionComponentArray:Array<SectionComponent>;

  private firstLoadSubscription:Subscription;
  private loadedDataSubscription:Subscription;

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
  elementTitle:boolean=false;
  filterForm:boolean=true;
  closeDetailButton:boolean=false;

  /*elementi html */
  listContainer:any;
  loadingEndedMessage:string;
  spinnerContainerMessage:string = "Caricamento in corso";
  titleSection:string;

  /*classi di utility */
  preloadHandler:PreloadHandler;
  elementDataParser:ElementDataParser;
  fillElementContainer:FillElementContainer;
  errorHandler: ErrorHandler;
  sectionUtility:SectionUtility;
  requestParamHandler:RequestParamHandler;

  /*messaggi di error */
  errorMessage:string;

  /*paginazione */
  pages:Array<IPage> = [];

  /*oggetti HTML */
  spinnerContainerNativeElement: ElementRef["nativeElement"];

  firstLoad:boolean = true;

  constructor(
    public sanitizer: DomSanitizer,
    public elementRef: ElementRef,
    private restService:RestService,
    public emitterService:EmitterService,
    private cd: ChangeDetectorRef,
    private componentFactoryResolver:ComponentFactoryResolver,
    /*Questo è il servizio che permette di utilizzare la modale */
    public modalService: NgbModal)
    {
    this.preloadHandler = new PreloadHandler();
    this.elementDataParser = new ElementDataParser();
    this.fillElementContainer = new FillElementContainer();
    this.errorHandler = new ErrorHandler();
    this.sectionUtility = new SectionUtility();
    this.requestParamHandler = new RequestParamHandler();
  }

  ngOnDestroy(): void {
    this.firstLoadSubscription.unsubscribe();
    this.loadedDataSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.requestParamHandler.formSubmit(this);
    this.section.clickOnPaginationCallBack = this.loadData.bind(this);
    this.section.elementListClickSuccessCallBack = this.elementListClicked.bind(this);
    this.formInitialValue = {name: this.nomeInput, conErrori: this.conErroriInput, senzaErrori: this.senzaErroriInput, elementPerPage: this.elementPerPageInput};

    if(!this.section.firstColumn){
      this.firstLoad = false;
    }

    this.emitterService.loadedData.subscribe(sectionComponent =>{
      if((sectionComponent.section.index + 1) == this.section.index){
        this.preloadHandler.preload(this);
        this.section.show = true;
        this.sectionUtility.callTypeHandler(this);
        this.section.elementDetailId = sectionComponent.section.elementDetailId;
        this.section.fatherElementDetailId = sectionComponent.section.elementDetailId;
        this.formReset();
        this.fillElementContainer.fillElementList(sectionComponent.elementDetailData, this);
        this.sectionUtility.showCurrentDataContainer(this);
        this.preloadHandler.postLoad(this);
      }
    });

    this.emitterService.closeChildSection.subscribe(sectionComponent =>{
      if((sectionComponent.section.index + 1)  == this.section.index){
        this.emitterService.closeChildSection.emit(this);
        this.section.show = false;
        this.closeDetail();
      }
    });

    this.firstLoadSubscription = this.emitterService.firstLoad.subscribe(()=>{
      if(this.section.type == SectionType.SCHEMA){
        this.loadData();
        /*Change detect per evitare l'errore ExpressionChangedAfterItHasBeenCheckedError sul valore elementListContainer,
        che è false ma subito dopo diventa true.
        ATTENZIONE: il detectChange verrà chiamato anche su tutti i componenti figli*/
        this.cd.detectChanges();
      }
    });

  /*   this.emitterService.sectionComponentArray.subscribe(array=>{
      this.sectionComponentArray = array;
      console.log("fddsfsd",this.sectionComponentArray);
    }); */

  }

  ngAfterViewInit() {
    this.sectionUtility.initializeSection(this);
    this.spinnerContainerNativeElement = this.elementRef.nativeElement.querySelector(".spinner-container");


  }

  onSubmit(){
    if(this.form.valid){
      this.requestParamHandler.formSubmit(this);
      this.section.currentPage = 1;
      this.section.requestedPage = 1;
      this.section.elementDetailId = this.section.fatherElementDetailId;
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
        this.preloadHandler.postLoad(this);
        this.section.elementCurrentSuccessCallBack(result, this);
        },
        error =>{
          this.preloadHandler.postLoad(this, error);
        });
    }
    catch(error){
        this.preloadHandler.postLoad(this, error);
    }
  }

  elementListClicked(id:number){
    this.section.elementDetailId = id;

    this.section.loadType = LoadType.DETAIL;
    console.log("prima", this.section);
    this.loadData();
    console.log("dopo", this.section);
  }

  showDetailTemplate() {
    try{
      this.cd.detectChanges();
      let detailComponent = BaseDetailComponent;
      switch(this.section.type){
        case SectionType.SCHEMA:
          detailComponent = SchemaDetailComponent;
          break;
          case SectionType.TABLE:
            detailComponent = TableDetailComponent;
            break;
      }
      const detailTemplateCmpFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
      const hostViewContainerRef = this.detailTypeHost.viewContainerRef;
      hostViewContainerRef.clear();
      const componentRef = hostViewContainerRef.createComponent(detailTemplateCmpFactory);
      componentRef.instance.data = this.detailTypeHost.data;
      this.cd.detectChanges();
    }
    catch(e){
      this.errorHandler.showGenericError(this, e, ErrorType.COMMON, true);
    }
  }

  closeDetail(){
    this.section.loadType = LoadType.LIST;
    this.section.elementDetailId = this.section.fatherElementDetailId;
    this.section.currentPage = 1;
    this.section.requestedPage = 1;
    this.sectionUtility.callTypeHandler(this);
    this.sectionUtility.showCurrentDataContainer(this);
    this.emitterService.closeChildSection.emit(this);
  }

}
