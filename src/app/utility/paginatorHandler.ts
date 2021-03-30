import { ElementRef } from '@angular/core';
import { Section } from './../model/section.model';
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

  buildPaginator(totalElement, elementPerPage, section:Section):any{
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
      if(section.currentPage > 1){
          pagination = pagination + "<li><a href=\"javascript:void(0)\" aria-label=\"Vai alla prima pagina\" title=\"Vai alla prima pagina\" class=\"" + this.PAGINATION_ITEM_CLASS + "\" " + this.PAGINATION_CURRENT_ITEM_ATTRIBUTE + "=\"1\"><img src=\"/static-dashboardaida-fe/img/icona_freccie-blu_reverse.png\" alt=\"Vai alla prima pagina\"></a></li>";
          pagination = pagination + "<li><a href=\"javascript:void(0)\" aria-label=\"Vai alla pagina precedente\" title=\"Vai alla pagina precedente\" class=\"" + this.PAGINATION_ITEM_CLASS + "\" " + this.PAGINATION_CURRENT_ITEM_ATTRIBUTE + "=\"" + (section.currentPage - 1) + "\"><img src=\"/static-dashboardaida-fe/img/icona_freccia-blu_reverse.png\" alt=\"Vai alla pagina precedente\"></a></li>";
      }
      for(var i = 1; i <= pageNumber; i++){
          var href = "href=\"javascript:void(0)\"";
          var currentClass = "";
          var title = i + " - vai alla pagina " + i;
          var itemClass = this.PAGINATION_ITEM_CLASS;
          if(section.currentPage == i){
              href = "";
              currentClass = "active";
              title = i + " pagina corrente";
              itemClass = "";
          }
          let linkBeforeAndAfterCurrentPage:number = +(this.LINK_PER_PAGINATION / 2).toFixed(0);
          if(
              (i <= section.currentPage && (i > section.currentPage - linkBeforeAndAfterCurrentPage) && i >= 1) || (i > pageNumber - this.LINK_PER_PAGINATION && section.currentPage > i)
              ||
              (i > section.currentPage && (i <= section.currentPage + linkBeforeAndAfterCurrentPage || i <= this.LINK_PER_PAGINATION) && i <= pageNumber)
              ){
              pagination = pagination + "<li class=\"" + currentClass + "\"><a " + href + " title=\"" + title + "\" aria-label=\"" + title + "\" class=\"" + itemClass + "\" " + this.PAGINATION_CURRENT_ITEM_ATTRIBUTE + "=\"" + i + "\">" + i + "</a></li>";
          }
      }
      if(section.currentPage < pageNumber){
          pagination = pagination + "<li><a href=\"javascript:void(0)\" aria-label=\"Vai alla pagina successiva\" title=\"Vai alla pagina successiva\" class=\"" + this.PAGINATION_ITEM_CLASS + "\" " + this.PAGINATION_CURRENT_ITEM_ATTRIBUTE + "=\"" + (+section.currentPage + 1) + "\"><img src=\"/static-dashboardaida-fe/img/icona_freccia-blu.png\" alt=\"Vai alla pagina successiva\"></a></li>";
          pagination = pagination + "<li><a href=\"javascript:void(0)\" aria-label=\"Vai all'ultima pagina\" title=\"Vai all'ultima pagina\" class=\"" + this.PAGINATION_ITEM_CLASS + "\" " + this.PAGINATION_CURRENT_ITEM_ATTRIBUTE + "=\"" + pageNumber + "\"><img src=\"/static-dashboardaida-fe/img/icona_freccie-blu.png\" alt=\"Vai all'ultima pagina\"></a></li>";
      }

      //console.log("pagination", pagination);
      return pagination = pagination + this.PAGINATION_CONTAINER_END;

      //$(section.htmlContainerSelector).after(pagination);
      //$("#" + section.columnId).find(this.PAGINATION_SELECTOR).fadeIn(this.DISPLAY_DATA_TIMEOUT);
      /* $("#" + section.columnId).find("." + this.PAGINATION_ITEM_CLASS).click(function(){

        section.clickOnPagination = true;
        section.requestPage = $(this).attr(this.PAGINATION_CURRENT_ITEM_ATTRIBUTE);
        section.clickCallback();
      }); */
  }
  catch(e){
     // debugMode(e, objectData);
      //errorCodeHandler(PAGINATOR_ERROR, e, objectData);
  }

  }

}
