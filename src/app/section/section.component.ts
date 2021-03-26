import { FillElementContainer } from './../utility/fillElementContainer';
import { ElementDataParser } from '../utility/elementDataParser';
import { PreloadHandler } from './../utility/preloadHandler';
import { EmitterService } from './../service/emitter.service';
import { RestService } from './../service/rest.service';
import { FormUtility } from './../utility/formUtility';
import { Section, SectionType } from './../model/section.model';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
  nomeInput:string;
  conErroriInput:boolean = true;
  senzaErroriInput:boolean = false;
  elementPerPageInput:number = 25;

  /*dati chiamate rest */
  elementListData;

  /*mostra/nascondi elementi */
  dataContainer:boolean = true;
  elementListContainer:boolean = false;
  spinnerContainer:boolean = true;

  /*elementi html */
  listContainer:any;

  /*classi di utility */
  preloadHandler:PreloadHandler;
  elementDataParser:ElementDataParser;
  fillElementContainer:FillElementContainer;

  constructor(public myElementRef: ElementRef, private restService:RestService, private emitterService:EmitterService) {
    emitterService.firstLoad.subscribe(()=>{
      if(this.section.type == SectionType.SCHEMA){
        this.loadData();
      }
    });
    this.preloadHandler = new PreloadHandler();
    this.elementDataParser = new ElementDataParser();
    this.fillElementContainer = new FillElementContainer();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    let formUtility = new FormUtility();
    formUtility.initializeForm(this.myElementRef, this.section);
  }

  onSubmit(){
    if(this.form.valid){
      this.loadData();
    }
  }

  loadData(){
    this.preloadHandler.preload(this);
    this.restService.getData(this.section).subscribe(
      result => {
      console.log(this);
      this.section.elementListSuccessCallBack(result, this);
      },
      error =>{
        console.log("erroe", error);
        this.spinnerContainer = false;
        this.elementListContainer = true;
      });
  }

}
