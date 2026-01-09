import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../../http.service';
import { Router } from '@angular/router';

import { IListVideos } from '../../type';
import { TokenService } from '../../services/token.service'


@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.sass']
})
export class ListVideosComponent implements OnInit {

  ListVideos : IListVideos[] = [];
  
  id       : number = 0; 
  tp       : number = 0;  

  totalRecords : number = 0;
  offset : number = 0;    
  limit : number = 10;
  search : string = '';

  visible: boolean = false;
  preference_show: boolean = false; 
  current_Page_id : number = 0;
  refresh=false;
  access: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private siteService : SiteService,
    private tokenService:TokenService
  ) { 

  }

  ngOnInit(): void {
    this.access = this.tokenService.getAccess('video');
    if (this.access) {
      this.route.queryParams.subscribe(params => {  
        if (params['id'] != this.id) {
          this.totalRecords==0;    
          this.id = params['id'];
          this.tp = params['typ'];
          this.offset = Number(params['offset']) || 0;
          this.search = params['search'] || '';
          this.loadData();
        }}) 
    }
  }


  loadData(): void {    
    let s = this.siteService.getListVideos(this.id,  this.offset, this.limit, this.search).subscribe(ResData => { 
      this.totalRecords= ResData.total;
            ResData.data.forEach(function(item:IListVideos) {
              item.date = new Date(item.date);              
            });      
              this.ListVideos = ResData.data;
        s.unsubscribe(); 
    }); 
  }

  
  openPage (event:any,page_id:number){
    let backUrl='list-videos';
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

  updateVideo(page_id:number, val:any, name:string){
    let s = this.siteService.updateItemVideo(page_id,name,val).subscribe(dataUpdatePage => {             
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
    this.current_Page_id=id;
  //  this. getTitPhoto();
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