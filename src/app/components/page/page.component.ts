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


     // console.log(this.showButtonBack);
     this.getDataPage(_id, this.tp);     
    });
  }
  
  getDataPage (id:number, typ:number){
    let s = this.siteService.getPage(id,typ).subscribe(page => {             
      //  this.Page = page;
        this.id=page.id;
        this.id_menu=page.id_menu;
        s.unsubscribe(); 
    });   
  }

  BackToList(){
   

    this.router.navigate([this.backUrl],{queryParams: {'id' : this.backId, 'typ' : this.backTyp, 'offset' : this.backOffset, 'search' : this.backSearch }});    
  }
}
