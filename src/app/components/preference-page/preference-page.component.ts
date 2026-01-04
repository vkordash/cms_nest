import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { SiteService } from '../../http.service';
import { ITitPhoto, IPage } from '../../type';

interface IPhotoGallery {
    id : number,
    name : string
}

@Component({
  selector: 'app-preference-page',
  templateUrl: './preference-page.component.html',
  styleUrls: ['./preference-page.component.sass']
})
export class PreferencePageComponent implements OnInit {

  @Input() is_showDialog:boolean=false;
    @Input() Page_id: number=0;
    @Output() clickDialog = new EventEmitter();
  
    /*Photo : ITitPhoto = {
      "id": 0,    
      "src": "",
      "alt": "",
      "title": "",
      "width": 0,
      "height": 0    
    };*/
     
    PhotoCollections:IPhotoGallery[]=[
      {
        id:27071,
        name:'Наше місто'
      },{
        id:37830,
        name:'Молодіжна рада'
      },{
        id:37021,
        name:'Вертеп'
      }
    ];

    selectedPhotoCollection:IPhotoGallery = {id : 0, name : ''};

    Page : any = {
      id:0,
      photo_src:'',
      photo_alt:'',
      photo_title:'',
      seo_title:'',
      seo_description:'',
      seo_keywords:'',
      seo_robots:'',
      seo_canonical:'',
      seo_opengraph:'',
      create_user:'',
      create_date:'',
      last_user:'',
      last_date:'',
      sl_main:0,
      sl_news:0,
      sl_pages:0,
      sl_banners:0,
      new_window:0,
      show_gallery:0,
      id_gallery:0
    } ;
  
    isChangePhoto = false;
    isChangePage = false;
  
    constructor(private siteService : SiteService) { }
  
    ngOnInit(): void {
      this.getPrefPage();
    }
    
    getPrefPage(): void {
      if (this.Page_id!=0) {
        let s = this.siteService.getPrefPage(this.Page_id).subscribe(Data => {  
          this.Page = Data; 
          this.Page.id = this.Page_id;
          console.log(Data);       
        //  this.isChangePage=false;
        //  this.getTitPhoto();
          s.unsubscribe(); 
      }); 
      }    
    }

   onChangePhotoGallery(event: any): void {
    console.log(event);
    // event.value contains the newly selected value
    console.log('Dropdown value changed to:', event.value);
    // You can also access the value directly from the bound property
    console.log('Current selected value:', this.selectedPhotoCollection); 
    
    // Call other logic here, e.g., an API call
  }
  /*
    getTitPhoto(): void {
      if (this.Page_id!=0) {
        let s = this.siteService.getTitPhoto(this.Page_id).subscribe(photo => {             
            this.Photo = photo;        
            this.isChangePhoto=false;
            s.unsubscribe(); 
        }); 
      }
    }*/
    
    ngOnChanges(): void {
      this.getPrefPage();   
    }
  
    changeData (){
      this.isChangePhoto=true;
    }

    changePage(page_id:number, val:any, name:string){
      //console.log(val);
      //console.log(page_id);
      //console.log(name);
      let s = this.siteService.updatePage(page_id,name,val).subscribe(dataUpdatePage => {             
          console.log(dataUpdatePage);       
          s.unsubscribe(); 
      }); 
    }
  
    onCancel(){
      this.clickDialog.emit();    
    }

    _Reload(id:number){    
      console.log(id);
      this.getPrefPage();
    //  this.current_Page_id=id;
    //  this. getTitPhoto();
    }
    /*onSave(){
      this.isChangePage = true;
     // this.isChangePhoto = true;
  
      this.clickDialog.emit();
     /* if (this.isChangePhoto){
        let s = this.siteService.updateTitPhoto(this.Photo).subscribe(result => {             
            console.log(result);
            this.isChangePhoto=true;
            s.unsubscribe(); 
        });      
      } */
    /*  if (this.isChangePage){
        let s = this.siteService.updatePagePref(this.Page).subscribe(result => {             
            console.log(result);
            this.isChangePage=true;
            s.unsubscribe(); 
        });      
      } 
    }*/
  
    
  
    onDelete(){
      console.log('Delete');
      let s = this.siteService.delTitPhoto(this.Page_id).subscribe(photo => {             
          this.getPrefPage();     
          this.isChangePhoto=false;
          s.unsubscribe(); 
      }); 
    }

}
