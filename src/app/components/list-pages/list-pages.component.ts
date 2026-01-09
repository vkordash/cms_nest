import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../../http.service';
import { Router } from '@angular/router';
import { IListPages } from '../../type';


@Component({
  selector: 'app-list-pages',
  templateUrl: './list-pages.component.html',
  styleUrls: ['./list-pages.component.sass']
})

export class ListPagesComponent implements OnInit {

  ListPages : IListPages[] = [];
  
  id       : number = 0; 
  tp       : number = 0;  

  totalRecords : number = 0;
  offset : number = 0;    
  limit : number = 10;
  search : string = '';

  checked : boolean = true;  
  
  visible: boolean = false;
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
    let s = this.siteService.getListPages(this.id, this.offset, this.limit, this.search).subscribe(ResData => {
      this.totalRecords= ResData.total;
      ResData.data.forEach(function(item:IListPages) {
        item.date = new Date(item.date);              
      });      
        this.ListPages = ResData.data;
        s.unsubscribe(); 
    }); 
  }


  openPage (event:any,page_id:number){
    let backUrl='list-pages';
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

  onPageChange(event: any) {    
    this.offset = event.first;
    this.loadData();
  }

  updatePage(page_id:number, val:any, name:string){
    let s = this.siteService.updatePage(page_id,name,val).subscribe(dataUpdatePage => {             
      console.log(dataUpdatePage);       
      s.unsubscribe(); 
    }); 
  }

  pref_page(page_id : number){
    this.current_Page_id=page_id;
    this.preference_show = true;
  }
  _Dialog(){    
    this.preference_show=false;
  }

  _Reload(id:number){    
//    this.current_Page_id=id;
  }

  addItem(){
    let s = this.siteService.addItemPage(this.id).subscribe(item => { 
      this.offset=0;
      this.search='';
      this.loadData();            
      s.unsubscribe(); 
    }); 
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
