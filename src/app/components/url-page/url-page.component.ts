import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../../http.service';
import { IMenu } from '../../type';



@Component({
  selector: 'app-url-page',
  templateUrl: './url-page.component.html',
  styleUrls: ['./url-page.component.sass']
})
export class UrlPageComponent implements OnInit {

 // url : string='';
 // name : string='';
  isExternal: boolean = true;
  isChange = false;
  id: number = 0;
  //tp: number = 6;
  Item: IMenu = {"routerlink":"","id":0,"name":"", "new_window":1};

  uploadedGFG: any[] = []; 

  constructor(private route: ActivatedRoute, private siteService : SiteService) { } 
  ngOnInit(): void {
    this.isChange= false;
    this.route.queryParams.subscribe(params => {      
      this.id = params['id'];      
      this.getMenuItem();     
    });
  }

  getMenuItem(): void {
    let s = this.siteService.getMenuItem(this.id).subscribe(tmenu => {  
        this.Item=tmenu[0];  
        this.Item['id'] = tmenu[0].key;
        s.unsubscribe(); 
    }); 
}
/*  Save(e:any):void{
    if (this.isChange){
      console.log('Save');
    //  console.log(this.url);
    //  console.log(this.name);
    //  console.log(this.isExternal);  
    //  console.log(this.id);               
      console.log(this.Item);
      this.isChange= false;
    }    
  }

  /*RedirectUrl(e:any):void{
    console.log('RedirectUrl');
    console.log(this.isExternal);
  }

  /*handleChange(e:any):void {
    this.isChange = true;
    this.isExternal = e.checked;    
  }

  handleChangeData(e:any) {
    this.isChange = true;        
  }

  
    onUpload(event:any) { 
      console.log(event);
        for (let file of event.files) { 
        this.uploadedGFG.push(file); 
        } 
    } */
  
    changeMenu(id:any, val:any, name:string){
      console.log(val);
      console.log(id);
      console.log(name);
      let s = this.siteService.updateMenu(id,name,val).subscribe(data => {             
        console.log(data);       
        s.unsubscribe(); 
    });
    }
}
