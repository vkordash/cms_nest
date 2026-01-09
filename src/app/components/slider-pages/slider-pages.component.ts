import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../../http.service';
import { Router } from '@angular/router';

import { IListPages } from '../../type';

@Component({
  selector: 'app-slider-pages',
  templateUrl: './slider-pages.component.html',
  styleUrls: ['./slider-pages.component.sass']
})
export class SliderPagesComponent implements OnInit {

 ListSliders : IListPages[] = [];
  
  id       : number = 0; 
  tp       : number = 0;  

  offset : number = 0;    
  limit : number = 10;
  search : any = '';
  totalRecords : number = 0;

  refresh=false;

  preference_show: boolean = false; 
  current_Page_id : number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private siteService : SiteService) { 
    
    
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {      
      if (params['id'] != this.id) {
        this.totalRecords==0;    
        this.id = params['id'];
        this.tp = params['typ'];
        this.offset = Number(params['offset']) || 0;
        this.search = params['search'] || '';
        this.loadData();
      }    
    });
  }

  
  loadData(): void {    
    let s = this.siteService.getDataSliders(this.id, this.offset, this.limit, this.search).subscribe(ResData => { 
      this.totalRecords= ResData.total;
      ResData.data.forEach(function(item:IListPages) {
        item.date = new Date(item.date);              
      });      
        this.ListSliders = ResData.data;
        s.unsubscribe();
    }); 
  }

  updateSlider(id:number, val:any, name:string){
    let s = this.siteService.updatePage(id,name,val).subscribe(dataUpdatePage => {             
      console.log(dataUpdatePage);       
      s.unsubscribe(); 
    });     
  }

  onPhotoChange($event:any){
    console.log($event);
    this.offset=$event.first;
    this.loadData();
  }
  
  addItem(){
    console.log('addItemSlider');
    let s = this.siteService.addItemSlider(this.id).subscribe(item => {             
      console.log(item);       
      s.unsubscribe(); 
    }); 
  }

  pageItemSlider(id:number){
    console.log('PageItemSlider');
  }

  delItemSlider(id:number){
    console.log('delItemSlider');
  }

  _Reload(){    
    //this. getTitPhoto();
  }

  pref_page(page_id : number){
    this.current_Page_id=page_id;
    this.preference_show = true;
  }

  _Dialog(){    
    this.preference_show=false;
  }

  openPage (event:any,page_id:number){
    console.log(event);
    let backUrl='slider_banners';
    let backId = this.id;
    let backTyp= this.tp;
    let backOffset = this.offset;
    let backSearch = this.search;
    var params : any = {
      'id':page_id,
      'typ':'page',
      'backUrl':backUrl, 
      'backId':backId, 
      'backTyp':backTyp, 
      'backOffset':backOffset, 
      'backSearch':backSearch
    };
    this.router.navigate(['/page'],{queryParams: params});    
  }

  
  clearSearch(){
    this.search='';
    this.newSearch();
  }

  newSearch(){
    this.totalRecords=0;
    this.offset=0;    
    this.loadData();
  }
}
