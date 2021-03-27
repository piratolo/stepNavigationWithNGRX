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
  nomeInput:string = "";
  conErroriInput:boolean = true;
  senzaErroriInput:boolean = false;
  elementPerPageInput:number = 25;

  /*dati chiamate rest */
  elementListData:Array<any> = [];

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

  constructor(public elementRef: ElementRef, private restService:RestService, private emitterService:EmitterService) {
    this.preloadHandler = new PreloadHandler();
    this.elementDataParser = new ElementDataParser();
    this.fillElementContainer = new FillElementContainer();
  }

  ngOnInit(): void {

    this.emitterService.firstLoad.subscribe(()=>{
      if(this.section.type == SectionType.SCHEMA){
        this.loadData();
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
    console.log("el", this.elementPerPageInput);
    this.preloadHandler.preload(this);
    this.restService.getDataList(this.section, this).subscribe(
      result => {
      console.log(this);
      this.section.elementListSuccessCallBack(result, this);
     let a = this.elementListData;
      },
      error =>{
        console.log("erroe", error);
        this.spinnerContainer = false;
        this.elementListContainer = true;
      });
  }

}
