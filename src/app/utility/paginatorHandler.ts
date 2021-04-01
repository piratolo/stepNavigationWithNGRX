import { IPage } from './../interface/ipage';
import { SectionComponent } from './../section/section.component';
import { ElementRef } from '@angular/core';
import { Section } from './../model/section.model';
import { DomSanitizer } from '@angular/platform-browser'
export class PaginatorHandler{

  PAGINATION_CONTAINER_CLASS = "pagination";
  PAGINATION_ITEM_CLASS ="item-pagination";
  PAGINATION_LIST_CLASS ="pagination d-inline";
  LINK_PER_PAGINATION = 6;
  PAGINATION_CONTAINER_START = "<nav class=\"" + this.PAGINATION_CONTAINER_CLASS + "\"><h5 class=\"sr-only\">Paginazione</h5><ul class=\"" + this.PAGINATION_LIST_CLASS + "\">";
  PAGINATION_CONTAINER_END = "</ul></nav>";
  PAGINATION_SELECTOR = "nav.pagination";
  DISPLAY_DATA_TIMEOUT = 200;
  PAGINATION_CURRENT_ITEM_ATTRIBUTE ="data-item-pagination-current";


  paginationClickHandler(callBack:Function, sectionComponent:SectionComponent, requestPage:number){
    sectionComponent.section.requestedPage = requestPage;
    sectionComponent.section.currentPage = requestPage;
    callBack();
  }


  buildPaginator(totalElement, elementPerPage, sectionComponent:SectionComponent):any{

console.log("currentPage", sectionComponent.section.currentPage);


    try{
      var pageNumber = 0;
      if(totalElement > 0 && elementPerPage > 0){
         pageNumber = totalElement / elementPerPage;
         if(pageNumber.toString().indexOf(".") > -1){
          pageNumber = parseInt(pageNumber.toString().substr(0, pageNumber.toString().indexOf("."))) + 1;
         }
      }
      if(pageNumber < 2){
          return;
      }
      var pagination = this.PAGINATION_CONTAINER_START;
      if(sectionComponent.section.currentPage > 1){
          sectionComponent.pages.push({number: 1, href: "javascript:void(0)", callback: this.paginationClickHandler.bind(this, sectionComponent.section.clickOnPaginationCallBack, sectionComponent, 1), label: "<<", title: "Vai alla prima pagina"});
          sectionComponent.pages.push({number: sectionComponent.section.currentPage - 1, href: "javascript:void(0)", callback: this.paginationClickHandler.bind(this, sectionComponent.section.clickOnPaginationCallBack, sectionComponent, sectionComponent.section.currentPage - 1), label: "<", title: "Vai alla pagina precedente"});
        }
      for(var i = 1; i <= pageNumber; i++){
          var href = "javascript:void(0)";
          var currentClass = "";
          var title = i + " - vai alla pagina " + i;
          var itemClass = this.PAGINATION_ITEM_CLASS;
          if(sectionComponent.section.currentPage == i){
              href = "";
              currentClass = "active";
              title = i + " pagina corrente";
              itemClass = "";
          }
          let linkBeforeAndAfterCurrentPage:number = +(this.LINK_PER_PAGINATION / 2).toFixed(0);
          if(
              (i <= sectionComponent.section.currentPage && (i > sectionComponent.section.currentPage - linkBeforeAndAfterCurrentPage) && i >= 1) || (i > pageNumber - this.LINK_PER_PAGINATION && sectionComponent.section.currentPage > i)
              ||
              (i > sectionComponent.section.currentPage && (i <= sectionComponent.section.currentPage + linkBeforeAndAfterCurrentPage || i <= this.LINK_PER_PAGINATION) && i <= pageNumber)
              ){
              sectionComponent.pages.push({number: i, href: href, callback: this.paginationClickHandler.bind(this, sectionComponent.section.clickOnPaginationCallBack, sectionComponent, i), label: ""+i, title: title});
            }
      }
      if(sectionComponent.section.currentPage < pageNumber){
        sectionComponent.pages.push({number: sectionComponent.section.currentPage + 1,  href: "javascript:void(0)", callback: this.paginationClickHandler.bind(this, sectionComponent.section.clickOnPaginationCallBack, sectionComponent, sectionComponent.section.currentPage + 1), label: ">", title: "Vai alla pagina successiva"});
        sectionComponent.pages.push({number: pageNumber, href: "javascript:void(0)", callback: this.paginationClickHandler.bind(this, sectionComponent.section.clickOnPaginationCallBack, sectionComponent, pageNumber), label: ">>", title: "Vai all'ultima pagina"});

       }





     // return pagination = pagination + this.PAGINATION_CONTAINER_END;

      //$(section.htmlContainerSelector).after(pagination);
      //$("#" + section.columnId).find(this.PAGINATION_SELECTOR).fadeIn(this.DISPLAY_DATA_TIMEOUT);
      /* $("#" + section.columnId).find("." + this.PAGINATION_ITEM_CLASS).click(function(){

        section.clickOnPagination = true;
        section.requestPage = $(this).attr(this.PAGINATION_CURRENT_ITEM_ATTRIBUTE);
        section.clickCallback();
      }); */
  }
  catch(e){
    console.log(e);
     // debugMode(e, objectData);
      //errorCodeHandler(PAGINATOR_ERROR, e, objectData);
  }

  }

}
