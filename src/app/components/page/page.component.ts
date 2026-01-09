import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../../http.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.sass']
})
export class PageComponent implements OnInit {

 // public Page? : IPage;
  
  id       : number = 0; 
  tp       : number = 0;  
  id_menu  : number = 0; 
  backUrl : string = '/';
  backId : number = 0;
  backTyp : number = 0;
  backOffset : number = 0;
  backSearch : string ='';
  showButtonBack : boolean = false;
   
  preference_show: boolean = false; 
  current_Page_id : number = 0;
  Page:any={};
  
  constructor(private route: ActivatedRoute, private router: Router, private siteService : SiteService) { }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {      
      const _id = params['id'];
      this.tp = params['typ'];
      if (this.tp==1) this.showButtonBack=false;
      else this.showButtonBack=true;
      this.backUrl = '/'+params['backUrl'];
      this.backId = params ['backId'];
      this.backTyp = params['backTyp']; 
      this.backOffset = params['backOffset']; 
      this.backSearch = params['backSearch'];
     this.getDataPage(_id, this.tp);     
    });
  }
  
  getDataPage (id:number, typ:number){
    let s = this.siteService.getPage(id,typ).subscribe(page => {             
        this.Page = page;
        this.id=page.id;
        this.id_menu=page.id_menu;
        s.unsubscribe(); 
    });   
  }

  BackToList(){
    console.log(this.backOffset);
    console.log(this.backSearch);
    console.log(this.backTyp);
    console.log(this.backId);
    this.router.navigate([this.backUrl],{queryParams: {'id' : this.backId, 'typ' : this.backTyp, 'offset' : this.backOffset, 'search' : this.backSearch }});    
  }

  pref_page(id : number){
    this.current_Page_id=id;
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
      let s = this.siteService.getTitPhoto(this.current_Page_id).subscribe(titPhoto => {             
        s.unsubscribe(); 
      });
    }

  
  changePage(page_id:number, val:any, name:string){
    let s = this.siteService.updatePage(page_id,name,val).subscribe(dataUpdatePage => {             
      s.unsubscribe(); 
  }); 
  }
}
