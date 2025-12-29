import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { SiteService } from '../../http.service';
import { SingleUploadService } from 'src/app/services/single-upload.service';

import { ITitPhoto } from '../../type';
import { FileUpload } from 'primeng/fileupload';
import { AppConfigService } from '../../services/app-config.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-multi-upload-file',
  templateUrl: './multi-upload-file.component.html',
  styleUrls: ['./multi-upload-file.component.sass'],
  providers: [MessageService]
})
export class MultiUploadFileComponent implements OnInit {

  @Input() Page_id : number = 0;
  @Input() Menu_id : number = 0;
  @Input() id : number = 0;
  @Input() id_component : number = 0;
  @Output() reload = new EventEmitter();

  private server_url = this.config.apiBaseUrl;  
  
  uploadUrl : string = "http://192.168.77.253:20202/file/uploads/";

  status: "initial" | "uploading" | "success" | "fail" = "initial"; // Variable to store file status
  file: File | null = null; 

  constructor(private http: HttpClient, 
    private messageService: MessageService, 
    private siteService : SiteService, 
    private SingleUploadService: SingleUploadService,
    private config : AppConfigService) { }

  ngOnInit(): void {
  }

   onFileSelect(event:any){
      const file = event.files[0];
     // console.log(file);
    }
  
    onBeforeUpload(event: any, fileUpload: FileUpload) {
  
      event.formData.append("PageId",this.Page_id);
      event.formData.append("MenuId",this.Menu_id);
      event.formData.append("id",this.id);
      event.formData.append("id_component",this.id_component);
  
      /*if ((this.Menu_id>0) && (this.Page_id==0)) {
        this.uploadUrl = this.url_menuicon;
      }
      else if ((this.Menu_id>0) && (this.Page_id>0)){
        this.uploadUrl = this.url_photo; 
      }
      else if ((this.Menu_id=0) && (this.Page_id=0)){
        this.uploadUrl = this.url_titphoto; 
      }
      else 
        this.uploadUrl = this.url_titphoto; 
      */
      fileUpload.url = this.uploadUrl;
    //  console.log('onBeforeUpload');
    //  console.log(event);
    }
  
    onSend (event:any){
    //  console.log('onSend');
    //  console.log(event);
    }
  
    onUpload(event:UploadEvent){
      console.log(event);
      for(let file of event.files) {
        console.log(this.id);
        console.log(file);
        //this.setPhoto(file);
      }
     
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Файл успішно завантажений !' });
     // console.log('onUpload');
     // console.log(event);
      //this.reload.emit(); 
      
    }
  
    setPhoto(file:any){
      //console.log(this.Page_id);
      console.log(file);
     /* let s = this.SingleUploadService.setPhoto(this.id, this.id_component, file ).subscribe(dataTitPhoto => { 
        this.reload.emit(); 
          s.unsubscribe(); 
      }); */
    }
}
