import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../../http.service';
import { AuthService } from '../../services/auth.service' ;
import { Router } from '@angular/router';
import { ItemMenu } from '../../type';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.sass']
})
export class ContentsComponent implements OnInit {

  id       : number = 0; 
  tp       : number = 0;  
  id_menu  : number = 0; 
  Menu : ItemMenu = {'id':0,'name':'',icon:'',children:[]};
  SubMenu : ItemMenu[]=[];
  
  constructor(private route: ActivatedRoute, private router: Router, private siteService : SiteService, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {      
      this.id = params['id']; 
      this.getData ();                
    });
  }
  getData (){
    if (this.id>0) {
      let s = this.siteService.getMenuByid(this.id).subscribe(menu => {                    
        this.Menu = menu[0];  
        this.getSubMenuData();       
        s.unsubscribe(); 
      }); 
    }    
  }

  getSubMenuData (){
    let s = this.siteService.getSubMenu(this.id).subscribe(menu => {             
      this.SubMenu = [...menu];
      console.log(this.Menu);
     // if (this.SubMenu.length==0) this.SubMenu = [{'id':0,'name':'Субменю відсутнє',icon:'',children:[]}];
      s.unsubscribe(); 
    });   
  }
}
