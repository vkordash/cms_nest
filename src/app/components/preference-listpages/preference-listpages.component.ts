import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { SiteService } from '../../http.service';
import { ITitPhoto, IPage } from '../../type';

@Component({
  selector: 'app-preference-listpages',
  templateUrl: './preference-listpages.component.html',
  styleUrls: ['./preference-listpages.component.sass']
})
export class PreferenceListpagesComponent implements OnInit {

  @Input() is_showDialog:boolean=false;
  @Input() Page_id: number=0;
  @Output() clickDialog = new EventEmitter();

  Photo : ITitPhoto = {
    "id": 0,    
    "src": "",
    "alt": "",
    "title": "",
    "width": 0,
    "height": 0    
  };

  Page : any = {
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
    last_date:''
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
        this.isChangePage=false;
        this.getTitPhoto();
        s.unsubscribe(); 
    }); 
    }    
  }

  getTitPhoto(): void {
    if (this.Page_id!=0) {
      let s = this.siteService.getTitPhoto(this.Page_id).subscribe(photo => {             
          this.Photo = photo;        
          this.isChangePhoto=false;
          s.unsubscribe(); 
      }); 
    }
  }
  
  ngOnChanges(): void {
    this.getPrefPage();   
  }

  changeData (){
    this.isChangePhoto=true;
  }

  onSave(){
    this.isChangePage = true;
    this.isChangePhoto = true;

    this.clickDialog.emit();
    if (this.isChangePhoto){
      let s = this.siteService.updateTitPhoto(this.Photo).subscribe(result => {             
          console.log(result);
          this.isChangePhoto=true;
          s.unsubscribe(); 
      });      
    } 
    if (this.isChangePage){
      let s = this.siteService.updatePagePref(this.Page).subscribe(result => {             
          console.log(result);
          this.isChangePage=true;
          s.unsubscribe(); 
      });      
    } 
  }

  onCancel(){
    this.clickDialog.emit();    
  }

  onDelete(){
    let s = this.siteService.delTitPhoto(this.Page_id).subscribe(photo => {             
      this.Photo = photo;        
      this.isChangePhoto=false;
      s.unsubscribe(); 
  }); 
  }
}
