import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../../http.service';
import { Router } from '@angular/router';
import { ItemMenu, IListPages } from '../../type';


@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.sass']
})
export class BannersComponent implements OnInit {

  id       : number = 6; 
  ListPages : IListPages[] = [];
  Menu?: ItemMenu;

  constructor(private route: ActivatedRoute, private router: Router, private siteService : SiteService) {         
  }

  ngOnInit(): void {    
    this.getMenuItem();
  }

  getMenuItem(): void {
    let s = this.siteService.getMenuItem(this.id).subscribe(tmenu => {             
        this.Menu = tmenu;
       // console.log(this.Menu);
        this.getBanners();       
        s.unsubscribe(); 
    }); 
  }

  getBanners(): void {    
    let s = this.siteService.getBanners().subscribe(dataListPages => { 
      dataListPages.forEach(function(item:IListPages) {
        item.date = new Date(item.date);          
      });
      
        this.ListPages = dataListPages;
        console.log(this.ListPages);
        s.unsubscribe(); 
    }); 
  }

}
