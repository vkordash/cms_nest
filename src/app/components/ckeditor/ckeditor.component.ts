import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

//import Editor from 'ckeditor5-custom-build/build/ckeditor';
//import Editor from '@ckeditor/ckeditor5-build-classic';
//import * as Editor from 'ckeditor5-custom-build/build/ckeditor';
//import Editor from 'ckeditor5';
import * as Editor from 'ckeditor5/build/ckeditor';
//import Editor from "../../../../ckeditor5/build/ckeditor";
import { ActivatedRoute } from '@angular/router';
import { IPage } from 'src/app/type';
import { SiteService } from '../../http.service';


@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.sass']
})
export class CkeditorComponent implements OnInit, OnChanges {

  @Input() Page_id: number =0;
  @Input() Page_tp: number =0;
  @Input() Page_id_menu: number =0;

  title = 'angular';
  public Editor:any = Editor;
  
  public Config = {
    placeholder: "Type the content here!"
  }; 

  public Page: IPage = {'text':'','id':0,'head':'','title':'','date':''};

  /*public model = {
    editorData: = ''
  };*/
  constructor(private route: ActivatedRoute,  private siteService : SiteService) { }

  ngOnInit() {
    if (this.Page_tp!=1)
      this.getDataPage(this.Page_id, this.Page_tp);     
    else
      this.getDataPage(this.Page_id, 0);            
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.Page_tp!=1)
      this.getDataPage(this.Page_id, this.Page_tp);     
    else
      this.getDataPage(this.Page_id, 0);   
  }

  getDataPage (id:number, typ:number){
    let s = this.siteService.getPage(id,typ).subscribe(page => {             
        this.Page = page;        
       // this.model.editorData = this.Page['text'];
       // this.PageItem = [...this.PageItem];
      //  console.log(this.Page);
        s.unsubscribe(); 
    });   
  }
   
}

