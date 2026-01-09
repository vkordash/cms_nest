import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../../http.service';
import { Router } from '@angular/router';

import { ItemMenu, IListPhotos } from '../../type';


@Component({
  selector: 'app-list-photos',
  templateUrl: './list-photos.component.html',
  styleUrls: ['./list-photos.component.sass']
})
export class ListPhotosComponent implements OnInit {

  ListPhotos : IListPhotos[] = [];
  Menu?: ItemMenu;
  
  id       : number = 0; 
  tp       : number = 0;  

  totalRecords : number = 0;
  offset : number = 0;    
  limit : number = 12;
  search : any = '';

  checked : boolean = true;  
  
  defaultDate = new Date();
  valuesChips: string[] = [];

  visible: boolean = false;
  preference_show: boolean = false; 
  current_Page_id : number = 0;
  refresh=false;
  
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
    let s = this.siteService.getListPhotos(this.id, this.offset, this.limit, this.search).subscribe(ResData => {
          this.totalRecords= ResData.total;
          ResData.data.forEach(function(item:IListPhotos) {
          //  item.date = new Date(item.date);              
          });      
            this.ListPhotos = ResData.data;
            s.unsubscribe(); 
        }); 
  }

  onPhotoChange(event: any) {    
    this.offset = event.first;
    this.loadData();
  }

  openPage (event:any,page_id:number){
    console.log(event);
    let backUrl='list-pages';
    let backId = this.id;
    let backTyp= this.tp;
    let backOffset = this.offset;
    let backSearch = this.search;
    var params : any = {'id':page_id,'typ':'page','backUrl':backUrl, 'backId':backId, 'backTyp':backTyp, 'backOffset':backOffset, 'backSearch':backSearch};
    this.router.navigate(['/page'],{queryParams: params});    
  }

  updatePhoto(id:number, val:any, name:string){
    let s = this.siteService.updatePhoto(id,name,val).subscribe(dataUpdatePage => {             
      console.log(dataUpdatePage);       
      s.unsubscribe(); 
  }); 
  }

  /*pref_page(page_id : number){
    this.current_Page_id=page_id;
    this.preference_show = true;
  }*/

  delete(id : number){
    console.log(id);
  }
 /* addTitPhoto(page_id:number){
    let s = this.siteService.addTitPhoto(page_id).subscribe(dataUpdatePage => {             
        console.log(dataUpdatePage);       
        s.unsubscribe(); 
    }); 
  }*/

  _Dialog(){    
    this.preference_show=false;
  }

  _Reload(id:number){    
    this.current_Page_id=id;
    this. getTitPhoto();
  }

  __Reload(id : number){

  }

  getTitPhoto(){    
    let s = this.siteService.getTitPhoto(this.current_Page_id).subscribe(titPhoto => {             
      console.log(titPhoto);  
      
      this.ListPhotos.forEach(function(item:IListPhotos) {
        if (item.id_page == titPhoto.id){
          item.src = titPhoto.src;  
         }                  
       });  
      
      s.unsubscribe(); 
    });
  }

  addItem(){
    console.log('addItemPage');
    let s = this.siteService.addItemPhoto(this.id).subscribe(item => { 
      this.offset=0;
      this.loadData();            
      console.log(item);  
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
