import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { SiteService } from '../../http.service';
import { IEmployee, IAccess } from '../../type';

@Component({
  selector: 'app-preference-access',
  templateUrl: './preference-access.component.html',
  styleUrls: ['./preference-access.component.sass']
})
export class PreferenceAccessComponent implements OnInit {

  @Input() is_showDialogAccess:boolean=false;
  @Input() Menu_id: number=0;
  @Output() clickDialogAccess = new EventEmitter();

  isChange : boolean = false;


  listAccess : any[]= [];
  listEmployee : IAccess[]= [];

  selectedItem: any = null; // Выбранный элемент

  // Метод для программного выбора элемента
  selectItem() {
    console.log(this.selectedItem);
  }


  constructor(private siteService : SiteService) { }

  ngOnInit(): void {
    this.getAccessData();
    this.getEmployeeData(); 
  }

  getAccessData(){
    
    let s = this.siteService.getAccess(this.Menu_id).subscribe(data => {             
        console.log(data);
        this.listAccess = [...data];
        s.unsubscribe(); 
    });   
  }

  addAccess(){
    const id_user = this.selectedItem.value;
    let s = this.siteService.addAccess(this.Menu_id, id_user).subscribe(data => {             
        //console.log(data);
        //this.listAccess = [...data];
        console.log(id_user, this.Menu_id);
        this.selectedItem = null;
        this.getAccessData();
        this.getEmployeeData(); 
        
        s.unsubscribe(); 
    });   
  }

  delAccess(id_user:number){
    //const id_user = this.selectedItem.value;
    console.log();    
    let s = this.siteService.delAccess(this.Menu_id, id_user).subscribe(data => {             
        console.log(id_user, this.Menu_id);
        /*for (let i = 0; i < this.listAccess.length; i++) {
          if (this.listAccess[i]['id']==id_user){
            delete this.listAccess[i];
          }
        }       */
        this.selectedItem = null;
        this.getAccessData();
        this.getEmployeeData();    
        
        s.unsubscribe(); 
    });   
  }

  getEmployeeData(){
    let s = this.siteService.getEmployeeAccess(this.Menu_id).subscribe(data => {             
        console.log(data);
        this.listEmployee = [...data];
        s.unsubscribe(); 
    });   
  }
  
  onShowDialogAccess() {
    this.getAccessData();
    this.getEmployeeData();
    console.log(this.Menu_id);
    
  }

  changeData (){
    
    this.isChange=true;
  }

  onSave(){
    this.isChange=true;
    this.clickDialogAccess.emit();
    /*if (this.isChange){
      let s = this.siteService.updateTitPhoto(this.Photo).subscribe(result => {             
          console.log(result);
          s.unsubscribe(); 
      });
      
    } */
  }

  onCancel(){
    this.isChange=false;
    this.clickDialogAccess.emit();    
  }
}
