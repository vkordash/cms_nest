import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../../http.service';
import { Router } from '@angular/router';

import { ItemMenu, IListPages } from '../../type';


@Component({
  selector: 'app-slider-pages',
  templateUrl: './slider-pages.component.html',
  styleUrls: ['./slider-pages.component.sass']
})
export class SliderPagesComponent implements OnInit {

  ListPages : IListPages[] = [];
  Menu?: ItemMenu;
  
  id       : number = 0; 
  tp       : number = 0;  

  offset : number = 0;    
  limit : number = 5;
  search : any = '';

  refresh=false;

  constructor(private route: ActivatedRoute, private router: Router, private siteService : SiteService) { 
    
    
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {      
      this.id = params['id'];
      this.tp = params['typ'];

      this.getMenuItem();     
    });
  }

  
  getMenuItem(): void {
    let s = this.siteService.getMenuItem(this.id).subscribe(tmenu => {             
        this.Menu = tmenu;
        this.getListPage();       
        s.unsubscribe(); 
    }); 
  }

  getListPage(): void {    
    let s = this.siteService.getListPages(this.id, this.offset, this.limit, this.search).subscribe(dataListPages => { 
      dataListPages.forEach(function(item:IListPages) {
        item.date = new Date(item.date);  
        console.log(item);               
      });
      
        this.ListPages = dataListPages;
        console.log(this.ListPages);
        this.refresh=false;       
        s.unsubscribe(); 
    }); 
  }

  changePage(page_id:number, val:any, name:string){
    console.log(val);
    console.log(page_id);
    console.log(name);
    let s = this.siteService.updatePage(page_id,name,val).subscribe(dataUpdatePage => {             
      console.log(dataUpdatePage);       
      s.unsubscribe(); 
    }); 
  }

  openPage (event:any,page_id:number){
    console.log(event);
    let backUrl='slider-pages';
    let backId = this.id;
    let backTyp= this.tp;
    let backOffset = this.offset;
    let backSearch = this.search;
    var params : any = {'id':page_id,'typ':'page','backUrl':backUrl, 'backId':backId, 'backTyp':backTyp, 'backOffset':backOffset, 'backSearch':backSearch};
    this.router.navigate(['/page'],{queryParams: params});    
  }
}
