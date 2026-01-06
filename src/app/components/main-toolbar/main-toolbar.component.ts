import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.sass']
})
export class MainToolbarComponent implements OnInit {

  Component: any ={};
  
  params: any = {}
  
  url : string = "https://site.menarada.gov.ua";

  constructor(private route: ActivatedRoute, private router: Router, private siteService : SiteService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {  
      this.params = params;    
    //  console.log(params);
      this.getItem();
    });
  }

  getItem(): void {
    if (this.params.id){
      let s = this.siteService.getComponent(this.params.typ).subscribe(Data => {             
          this.Component = Data[0];
          console.log(Data);
          s.unsubscribe(); 
      }); 
    }    
  }

  gotoPage(){
    window.open(this.url+'/'+this.Component.link+'?id='+this.params.id, '_blank', 'noopener,noreferrer'); // Параметры для безопасности [7, 9]
  }

  pref(){

  }
}
