import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { SiteService } from '../../http.service';
import { ITitPhoto } from '../../type';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})
export class TestComponent implements OnInit {

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

  isChange = false;

  constructor(private siteService : SiteService) { }

  ngOnInit(): void {
    this.getTitPhoto();
  }
  
  getTitPhoto(): void {
    let s = this.siteService.getTitPhoto(this.Page_id).subscribe(photo => {             
        this.Photo = photo;        
        this.isChange=false;
        s.unsubscribe(); 
    }); 
  }
  
  ngOnChanges(): void {
    this.getTitPhoto();   
  }

  changeData (){
    this.isChange=true;
  }

  onSave(){
    this.isChange=true;
    this.clickDialog.emit();
    if (this.isChange){
      let s = this.siteService.updateTitPhoto(this.Photo).subscribe(result => {             
          console.log(result);
          s.unsubscribe(); 
      });
      
    } 
  }

  onCancel(){
    this.clickDialog.emit();    
  }

}
