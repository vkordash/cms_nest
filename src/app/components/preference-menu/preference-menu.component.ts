import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { SiteService } from '../../http.service';
import { IMenu } from '../../type';
import { never } from 'rxjs';
import { AppConfigService } from 'src/app/services/app-config.service';

interface IComponents{ 
  id: Number; 
  name: String;   
} 

@Component({
  selector: 'app-preference-menu',
  templateUrl: './preference-menu.component.html',
  styleUrls: ['./preference-menu.component.sass']
})
export class PreferenceMenuComponent implements OnInit {

  @Input() is_showDialog:boolean=false;
  @Input() Menu_id: number=0;
  @Output() clickDialog = new EventEmitter();

  Components: IComponents[] = [];
  SelectedComponent: number =0;
  //SelectedComponent?: IComponents= {id: 1, name: 'Сторінка'};

  
  isChange=false;
  current_menu_id : number =0;
  Menu:IMenu={
    id : 0,
    parent : 0,
    name:'',
    icon:'',
    id_component:0,
    children:[],
    routerlink:'',
    pn:0,
    activ: false,    
    show_name: true,
    show_dt: true,   
    show_icon: true,
    create_user_name: '',
    create_date: undefined,
    last_date: undefined,
    last_user_name: ''
};  
  constructor(private siteService : SiteService, private config : AppConfigService) { }

  ngOnInit(): void {
    console.log(this.Menu_id);
    this.getListComponents()
    this.getMenuByid();   
  }

  getListComponents(): void {    
    let s = this.siteService.getListComponents().subscribe(_DataComponents => {             
        this.Components = _DataComponents;   
        console.log(this.Components);     
        s.unsubscribe();  
    }); 
  }

  getMenuByid(): void {
    console.log(this.Menu_id);
    if (this.Menu_id>0) {
      let s = this.siteService.getMenuByid(this.Menu_id).subscribe(_Menu => {             
        this.Menu = _Menu[0]; 
        if (_Menu[0].icon && (_Menu[0]['icon'].length>2)) 
           // this.Menu['icon'] = this.config.apiBaseUrl+'/'+_Menu[0]['icon']; 
          this.Menu['icon'] = _Menu[0]['icon']; 
        else delete this.Menu['icon'];
        this.current_menu_id=this.Menu_id; 
        this.isChange=false;
        s.unsubscribe(); 
      }); 
    }    
  }

  deleteIcon(){
    let s = this.siteService.updateMenu(this.Menu_id,'icon','').subscribe(data => {             
        console.log(data);       
        s.unsubscribe(); 
    });  
  }   

  onShow() {
    console.log(this.Menu_id);
    this.getMenuByid();
  }

  changeData (){
    this.isChange=true;
  }

  changeMenu( val:any, name:string){
      console.log(val);
      console.log(this.Menu_id);
      console.log(name);
      let s = this.siteService.updateMenu(this.Menu_id,name,val).subscribe(data => {             
        console.log(data);       
        s.unsubscribe(); 
    });        
  }

  onCancel(){
    this.clickDialog.emit();    
  }



    _Reload(){    
     // this.current_Page_id=id;
      this. getTitPhoto();
    }
  
    getTitPhoto(){    
    /*  let s = this.siteService.getTitPhoto(this.current_Page_id).subscribe(titPhoto => {             
        console.log(titPhoto);  
        
        this.ListPages.forEach(function(item:IListPages) {
          if (item.id == titPhoto.id){
            item.photo = titPhoto.src;  
           }                  
         });  
        
        s.unsubscribe(); 
      });*/
    }
}

