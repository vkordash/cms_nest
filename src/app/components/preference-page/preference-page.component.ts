import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { SiteService } from '../../http.service';
import { ITitPhoto, IPage } from '../../type';

interface IPhotoGallery {
    id : number,
    photo_gallery_name : string | null
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
        photo_gallery_name:'Наше місто'
      },{
        id:37830,
        photo_gallery_name:'Молодіжна рада'
      },{
        id:37021,
        photo_gallery_name:'Вертеп'
      }
    ];

    selectedPhotoCollection:IPhotoGallery = {id : 0, photo_gallery_name : ''};

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
      photo_gallery_name:'',
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
      this.getListPhotoCollection();
      this.getPrefPage();
    }
    
    getListPhotoCollection(){
      let s = this.siteService.getListPhotoCollection().subscribe(Data => {  
          this.PhotoCollections = Data; 
          console.log(Data);         
          s.unsubscribe(); 
      }); 
    }

    getPrefPage(): void {
      if (this.Page_id!=0) {
        let s = this.siteService.getPrefPage(this.Page_id).subscribe(Data => {  
          this.Page = Data; 
          this.Page.id = this.Page_id;
          this.selectedPhotoCollection.id=Data.id_gallery;
          if (Data.id_gallery==0) {
            this.selectedPhotoCollection.photo_gallery_name = '';
          }
          else 
            this.selectedPhotoCollection.photo_gallery_name = Data.photo_gallery_name;
          //console.log(Data);       
        //  this.isChangePage=false;
        //  this.getTitPhoto();
          s.unsubscribe(); 
      }); 
      }    
    }

   onChangePhotoGallery(event: any): void {
   // console.log(event);
   // console.log('Dropdown value changed to:', event.value);
   // console.log('Current selected value:', this.selectedPhotoCollection); 
    this.changePage(this.Page_id,event.value.id,'id_gallery')    
    
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
