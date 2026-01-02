import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../../http.service';
import { Router } from '@angular/router';

import { ItemMenu, IListVideos } from '../../type';


@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.sass']
})
export class ListVideosComponent implements OnInit {

  ListVideos : IListVideos[] = [];
  Menu?: ItemMenu;
  
  id       : number = 0; 
  tp       : number = 0;  

  totalRecords : number = 0;
  offset : number = 0;    
  limit : number = 10;
  search : any = '';

  visible: boolean = false;
  preference_show: boolean = false; 
  current_Page_id : number = 0;
  refresh=false;

  constructor(private route: ActivatedRoute, private router: Router, private siteService : SiteService) { 
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {      
      if (params['id'] != this.id) {
        this.getMenuItem();     
        this.totalRecords==0;    
        this.id = params['id'];
        this.tp = params['typ'];
      } 
      
      if (params['offset'])
        this.offset = params['offset']*1;
      if (params['search'])
        this.search = params['search'];    
    });
  }

  getCountPages (){
    let s = this.siteService.getCountVideos(this.id).subscribe(data => { 
      this.totalRecords = data.cnt;  
      this.getListPage();        
      s.unsubscribe(); 
    }); 
  }
  
  getMenuItem(): void {
    let s = this.siteService.getMenuItem(this.id).subscribe(tmenu => {             
        this.Menu = tmenu;
       // console.log(this.Menu);
       if (this.totalRecords==0) {
        this.getCountPages();
      }
      else {
        this.getListPage();       
      }       
      s.unsubscribe(); 
    }); 
  }

  getListPage(): void {    
    let s = this.siteService.getListVideos(this.id,  this.offset, this.limit, this.search).subscribe(dataListVideos => { 
      dataListVideos.forEach(function(item:IListVideos) {
        item.date = new Date(item.date);          
      });
      
        this.ListVideos = dataListVideos;
        console.log(this.ListVideos);
        //this.refresh=false;       
        s.unsubscribe(); 
    }); 
  }

  onLazyLoad($event:any){
    console.log($event);
    this.offset=$event.first;
    this.getListPage();
  }
  
  openPage (event:any,page_id:number){
    console.log(event);
    let backUrl='list-videos';
    let backId = this.id;
    let backTyp= this.tp;
    let backOffset = this.offset;
    let backSearch = this.search;
    var params : any = {'id':page_id,'typ':'page','backUrl':backUrl, 'backId':backId, 'backTyp':backTyp, 'backOffset':backOffset, 'backSearch':backSearch};
    this.router.navigate(['/page'],{queryParams: params});    
  }

  changePage(page_id:number, val:any, name:string){
    console.log(val);
    console.log(page_id);
    console.log(name);
    let s = this.siteService.updateItemVideo(page_id,name,val).subscribe(dataUpdatePage => {             
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
    this.current_Page_id=id;
    this. getTitPhoto();
  }

  getTitPhoto(){
  //  this.current_Page_id=469184;
    let s = this.siteService.getTitPhoto(this.current_Page_id).subscribe(titPhoto => {             
      console.log(titPhoto);  
      
      this.ListVideos.forEach(function(item:IListVideos) {
         console.log(item);
        if (item.id == titPhoto.id){
          item.photo = titPhoto.src;  
         }                  
       });  
      
      s.unsubscribe(); 
    });
  }

  addItem(){
    console.log('addItemPage');
    let s = this.siteService.addItemPage(this.id).subscribe(item => { 
      this.offset=0;
      this.getListPage();            
      console.log(item);  
      s.unsubscribe(); 
    }); 
  }
}