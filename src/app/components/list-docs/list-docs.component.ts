import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../../http.service';
import { Router } from '@angular/router';
import { ItemMenu, IListDocs } from '../../type';
import { LazyLoadEvent } from 'primeng/api';

interface People {
    firstname?: string;
    lastname?: string;
    age?: string;
}


@Component({
  selector: 'app-list-docs',
  templateUrl: './list-docs.component.html',
  styleUrls: ['./list-docs.component.sass']
})


export class ListDocsComponent implements OnInit {

  id       : number = 0; 
  tp       : number = 0;  

  totalRecords : number = 0;
  offset : number = 0;    
  limit : number = 25;

  sortField?: string;
  sortOrder?: number;
  filters?: { [key: string]: string };
  
  ListDocs : IListDocs[] = [];
  Menu?: ItemMenu;
  refresh=false;

  loading: boolean = false;
  
  constructor(private route: ActivatedRoute, private router: Router, private siteService : SiteService) { 
            
    }
    
    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {      
        this.id = params['id'];
        this.tp = params['typ'];
        if (params['offset'])
          this.offset = params['offset']*1;
        this.getMenuItem();     
      });
    }
  
    getMenuItem(): void {
      this.loading = true;
      let s = this.siteService.getMenuItem(this.id).subscribe(tmenu => {             
          this.Menu = tmenu[0];
          this.totalRecords =0;
          this.getCountDocs();
          s.unsubscribe(); 
      }); 
    }
    
    getCountDocs (){
      this.loading = true;
      let s = this.siteService.getCountDocs(this.id).subscribe(cnt => { 
        this.totalRecords = cnt;  
        this.getListDocs();        
        s.unsubscribe(); 
      }); 
    }
    
    getListDocs(): void { 
      this.loading = true;   
      let s = this.siteService.getListDocs(this.id, this.offset, this.limit).subscribe(data => { 
          this.ListDocs = [...data];
        //  this.refresh=false; 
          this.loading = false;      
          s.unsubscribe(); 
      }); 
    }
  
    onLazyLoad($event:any){
      console.log($event);
      this.offset=$event.first;
      this.limit=$event.rows;
      this.getListDocs();
    }
}
