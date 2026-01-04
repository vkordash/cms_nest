import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../../http.service';
import { Router } from '@angular/router';

import { ItemMenu, IListPages } from '../../type';


@Component({
  selector: 'app-slider-banners',
  templateUrl: './slider-banners.component.html',
  styleUrls: ['./slider-banners.component.sass']
})
export class SliderBannersComponent implements OnInit {
  ListPages : IListPages[] = [];
  Menu?: ItemMenu;
  
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
      this.id = params['id'];
      this.tp = params['typ'];

      this.getMenuItem();     
    });
  }

  
  getMenuItem(): void {
    let s = this.siteService.getMenuItem(this.id).subscribe(tmenu => {             
        this.Menu = tmenu[0];
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

  getCountPages (){
    let s = this.siteService.getCountSliders(this.id).subscribe(data=> { 
      this.totalRecords = data.cnt;  
      this.getListPage();        
      s.unsubscribe(); 
    }); 
  }

  getListPage(): void {    
    let s = this.siteService.getDataSliders(this.id, this.offset, this.limit, this.search).subscribe(dataListPages => { 
      dataListPages.forEach(function(item:IListPages) {       
        item.date = new Date(item.date);               

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
    if (name == 'width' || name == 'heigth') {
      let s = this.siteService.updatePhoto(page_id,name,val).subscribe(dataUpdatePage => {             
        console.log(dataUpdatePage);       
        s.unsubscribe(); 
      }); 
    }
    else {
      let s = this.siteService.updatePage(page_id,name,val).subscribe(dataUpdatePage => {             
        console.log(dataUpdatePage);       
        s.unsubscribe(); 
      }); 
    }
  }

  onLazyLoad($event:any){
    console.log($event);
    this.offset=$event.first;
    this.getListPage();
  }
  
  changePhoto(page_id:number, val:any, name:string){
    console.log(val);
    console.log(page_id);
    console.log(name);
    let s = this.siteService.updatePhoto(page_id,name,val).subscribe(dataUpdatePage => {             
      console.log(dataUpdatePage);       
      s.unsubscribe(); 
    }); 
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
    var params : any = {'id':page_id,'typ':'page','backUrl':backUrl, 'backId':backId, 'backTyp':backTyp, 'backOffset':backOffset, 'backSearch':backSearch};
    this.router.navigate(['/page'],{queryParams: params});    
  }
}
