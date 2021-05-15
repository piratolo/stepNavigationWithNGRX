import { IElement } from './../interface/iElement';
import { environment } from './../../environments/environment';
import { Counter } from './../model/counter';
import { Ischema } from './../interface/ischema';
import { FieldDetailComponent } from './../model/field-detail/field-detail.component';
import { RequestParamHandler } from './../utility/requestParamHandler';
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
import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as SchemaActions from '../section/store/section.actions';
/*importiamo la classe SectionReducer, usando come alias la convenzione "from". Usando l'alias fromSection
potremo accedere all'interfaccia, definita in section-reducer.ts, che ci da la struttura dell'intero application state*/
import * as fromApp from '../store/app.reducer';

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

  private firstLoadSubscription:Subscription;

  /*campi del form */
  initialFormValue: Object;
  formInitialValue = {};
  nomeInput:string = "";
  conErroriInput:boolean = true;
  senzaErroriInput:boolean = false;
  elementPerPageInput:number = 25;

  /*dati chiamate rest.
  E' di tipo observable visto che i dati li otteniamo tramite l'application state,
   e non direttamente tramite chiamate rest.
   Il tipo di observable sarà uguale al tipo di dato definito nel campo "schemas" dell'application state*/
   elementListData:Observable<fromApp.AppState['schemas']>;

   //elementListData:Array<any> = [];

  elementDetailData:Array<any> = [];

  /*mostra/nascondi elementi */
  dataContainer:boolean = true;
  elementListContainer:boolean = false;
  elementDetailContainer:boolean = false;
  //spinnerContainer:boolean = true;
  /*creiamo il campo per capire se dobbiamo avviare o fermare lo spinner. Il campo è di tipo observable visto che il dato lo
  otteniamo tramite l'application state.*/
  spinnerContainer:Observable<fromApp.AppState['schemas']['startLoading']> = this.store.select(state => state.schemas.startLoading);
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

  @Output("onCounted") counted = new EventEmitter<Counter>();

  constructor(
    public sanitizer: DomSanitizer,
    public elementRef: ElementRef,
    private restService:RestService,
    public emitterService:EmitterService,
    private cd: ChangeDetectorRef,
    private componentFactoryResolver:ComponentFactoryResolver,
    /*Questo è il servizio che permette di utilizzare la modale */
    public modalService: NgbModal,
    /*Importiamo l'application state */
    public store:Store<fromApp.AppState>)
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
    //this.spinnerContainer = null;
  }

  ngOnInit(): void {

    if(this.section.firstColumn){
      this.loadData();
    }

    this.requestParamHandler.formSubmit(this);

    this.section.clickOnPaginationCallBack = this.loadData.bind(this);
    this.section.elementListClickSuccessCallBack = this.elementListClicked.bind(this);
    this.formInitialValue = {name: this.nomeInput, conErrori: this.conErroriInput, senzaErrori: this.senzaErroriInput, elementPerPage: environment.elementPerPage};

    if(!this.section.firstColumn){
      this.firstLoad = false;
    }

    this.emitterService.loadedData.subscribe(sectionComponent =>{
      if((sectionComponent.section.index + 1) == this.section.index){
        this.firstLoad = true;
        this.preloadHandler.preload(this);
        this.section.show = true;
        this.sectionUtility.callTypeHandler(this);
        this.section.elementDetailId = sectionComponent.section.elementDetailId;
        this.section.fatherElementDetailId = sectionComponent.section.elementDetailId;
        this.section.elementListSuccessCallBack(sectionComponent.elementDetailData, this);
        this.sectionUtility.showCurrentDataContainer(this);
        this.preloadHandler.postLoad(this);
      }
    });

    this.emitterService.closeChildSection.subscribe(sectionComponent =>{
      if((sectionComponent.section.index + 1)  == this.section.index){
        this.closeDetail();
        this.section.show = false;
        this.section.requestParam = "&conErrori=" + this.formInitialValue['conErrori'] + "&senzaError=" + this.formInitialValue['senzaErrori'];
        this.section.elementPerPage = this.formInitialValue['elementPerPage'];
        this.formReset();

       // this.emitterService.closeChildSection.emit(this);
      }
    });

    this.firstLoadSubscription = this.emitterService.firstLoad.subscribe(()=>{
      if(this.section.type == SectionType.SCHEMA){
       // this.loadData();
        /*Change detect per evitare l'errore ExpressionChangedAfterItHasBeenCheckedError sul valore elementListContainer,
        che è false ma subito dopo diventa true.
        ATTENZIONE: il detectChange verrà chiamato anche su tutti i componenti figli*/
        this.cd.detectChanges();
      }
    });

    this.emitterService.autoLoading.subscribe(counter =>{
      if(this.section.index == counter.SectionIndex){
        this.closeDetail();
        this.elementListClicked(counter.id, counter.name);
      }
    });


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


  /** questa funzione non è una best practice. In realtà andava creata un'action per recuperare
   * i dati tramite chiamata rest e la chiamata rest andava "inserita" in un effect. Qui invece
   * i servizi rest vengono chiamati tramite la stessa funzione loadData e una volta avuti i dati
   * questi vengono passati allo store tramite l'action SchemaActions.FetchSchema */
  loadData(){
    try{
      /*sfruttando l'application state avviamo lo spinner */
     this.store.dispatch(new SchemaActions.StartLoading(true));

       this.preloadHandler.preload(this);
       /*Si fa la subscribe al servizio rest*/
       var sub = this.restService.getDataList(this).subscribe(
        result => {
        this.preloadHandler.postLoad(this);
        /** i dati presi dal db li passiamo allo store */
        this.store.dispatch(new SchemaActions.FetchSchema(result));
        },
        error =>{
          this.preloadHandler.postLoad(this, error);
        });

    }
    catch(error){
        this.preloadHandler.postLoad(this, error);
    }
    finally{
      sub.unsubscribe();
      /*sfruttando l'application state fermiamo lo spinner */
      setTimeout(()=>{
        this.store.dispatch(new SchemaActions.StartLoading(false));
      }, 1234)

    }

    /**ricaviamo dallo store la lista degli schema da mostrare nel template html */
    this.elementListData = this.store.select('schemas');

  }

  elementListClicked(id:number, name:string){
    this.counted.emit(new Counter(name, id, this.section.index));
    this.section.elementDetailId = id;
    this.section.loadType = LoadType.DETAIL;
    this.section.elementPerPage = this.formInitialValue['elementPerPage'];
    const previousCurrentPage =  this.section.currentPage;
    const previousRequestedPage =  this.section.requestedPage;
    this.section.currentPage = 1;
    this.section.requestedPage = 1;
    this.loadData();
    this.section.elementPerPage = this.elementPerPageInput;
    this.section.currentPage = previousCurrentPage;
    this.section.requestedPage = previousRequestedPage;
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
        case SectionType.FIELD:
          detailComponent = FieldDetailComponent;
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

  /* Questo metodo fake serve per utilizzare lo store: permette di aggiungere, passando per lo store, uno schema alla
  lista degli schema */
  aggiungi1(){
    const schema:IElement = {
      id:14,
      name:"il mio nome",
      parentName: "il mio parent",
      elementi:null,
      numeroPagina:null,
      numeroElementiPerPagina:null,
      numeroTotaleElementi:null,
    }
    this.store.dispatch(new SchemaActions.AddSchema(schema));
  }

  /* Questo metodo fake serve per utilizzare lo store: permette di aggiungere, passando per lo store, un'array di schema alla
  lista degli schema */
  aggiungi2(){
    const schema:IElement[] = [{
      id:15,
      name:"il mio nome2",
      parentName: "il mio parent2",
      elementi:null,
      numeroPagina:null,
      numeroElementiPerPagina:null,
      numeroTotaleElementi:null,
    },
    {
      id:16,
      name:"il mio nome3",
      parentName: "il mio parent3",
      elementi:null,
      numeroPagina:null,
      numeroElementiPerPagina:null,
      numeroTotaleElementi:null,
    }]
    this.store.dispatch(new SchemaActions.AddSchemas(schema));
  }

 /* Questo metodo fake serve per utilizzare lo store: permette di aggiornare uno specifico schema nella lista degli schema */
  aggiorna(){
    const schema:IElement = {
      id:100,
      name:"sono lo schema aggiornato",
      parentName: "sono lo schema aggiornato parent",
      elementi:null,
      numeroPagina:null,
      numeroElementiPerPagina:null,
      numeroTotaleElementi:null,
    }
    this.store.dispatch(new SchemaActions.UpdateSchema({index:0, schema:schema}));
  }

   /* Questo metodo fake serve per utilizzare lo store: permette di cancellare uno specifico schema nella lista degli schema */
   cancella(){
    this.store.dispatch(new SchemaActions.DeleteSchema(0));
  }

}
