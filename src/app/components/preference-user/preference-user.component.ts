import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SiteService } from '../../http.service';

interface IUser{ 
  id: Number; 
  id_pers: number; 
  id_org: number; 
  activ: boolean;  
  login:string;    
}

interface IPerson{ 
  id: Number; 
  coname:string;
  fname:string;
  lname:string;
  post:string;
  email:string;  
}

interface IUserPreference{   
  Tree_ShowAll?: boolean;
  Tree_ShowTyp7?: boolean;
  Page_Vlen?: number;
  Page_Top?: boolean;
  Page_SocNet?: boolean;
  Page_RSS?: boolean;
  Editor_toolbox?: boolean;
  SEO_title?:string;
  SEO_description?:string;
  SEO_keywords?:string; 
  SEO_robots?:string;
  SEO_canonical?:string;
  opengraph?:string;
}



@Component({
  selector: 'app-preference-user',
  templateUrl: './preference-user.component.html',
  styleUrls: ['./preference-user.component.sass']
})
export class PreferenceUserComponent implements OnInit {

  @Input() is_showDialog:boolean=false;
  @Input() Menu_id: number=0;
  @Input() id_org: number=0;
  @Input() id_user: number=0;
  @Output() closeDialog = new EventEmitter();

  User : IUser = {
    id: 0, 
    id_pers: 0, 
    id_org: 0,
    activ: true,
    login:'',       
  }

  Person : IPerson = {
    id: 0, 
    coname:'',
    fname:'',
    lname:'',
    post: '',
    email:''   
  }

  UserPreference: IUserPreference = { 
    Tree_ShowAll: true,
    Tree_ShowTyp7: true,
    Page_Vlen: 0,
    Page_Top: false,
    Page_SocNet: false,
    Page_RSS: false,
    Editor_toolbox:false,
    SEO_title:'',
    SEO_description:'',
    SEO_keywords:'',
    SEO_robots:'',
    SEO_canonical:'',
    opengraph:''
  }

  submitted = false;

  constructor(private fb: FormBuilder, private siteService : SiteService) { }

  userForm = this.fb.group({
    coname: ['', [Validators.required, Validators.minLength(20)]], 
    fname: ['', [Validators.required, Validators.minLength(20)]], 
    lname: ['', [Validators.required, Validators.minLength(20)]], 
    post: ['', [Validators.required, Validators.minLength(50)]], 
    email: ['', [Validators.required, Validators.email]],
    id_pers: ['']        
  });

  ngOnInit(): void {
  }

  onShow() {
    console.log(this.Menu_id);
    this.getUser();
    this.getPerson();
    //this.getOrg();
    this.getPreferUser();
  }

  onHide(){
    this.closeDialog.emit({show:false});        
  }

  getUser(){
    let s = this.siteService.getUser(this.id_user).subscribe(data => {             
      this.User = data;  
      this.getPerson();
      s.unsubscribe();  
    }); 
  }

  getPerson(){
    let s = this.siteService.getEmployee().subscribe(data => {             
      this.Person = data;
      /*this.userForm = this.fb.group({
        coname: [data.coname, [Validators.required, Validators.minLength(2)]], 
        fname: [data.fname, [Validators.required, Validators.minLength(2)]], 
        lname: [data.lname, [Validators.required, Validators.minLength(2)]], 
        post: [data.post, [Validators.required, Validators.minLength(10)]], 
        email: [data.email, [Validators.required, Validators.email]],
        id_pers: [data.id]     
      });*/
      s.unsubscribe(); 
    }); 
  }

  getOrg(){
    /*let s = this.siteService.getEmployee(this.id_user).subscribe(data => {             
      this.Person = data;        
      s.unsubscribe();  
    }); */
  }

  getPreferUser(){
    let s = this.siteService.getPreferUser().subscribe(data => { 
      console.log(data);           
      this.UserPreference = data;        
      s.unsubscribe();  
    }); 
  }

  changeData(val: any, name: string ){
    console.log(name);
    console.log(val);
    let s = this.siteService.updatePreferUser(name,val).subscribe(data => {             
      //this.UserPreference = data;        
      s.unsubscribe();  
    }); 
  }

  changeEmployee(val: any, name: string ) {
    console.log(name);
    console.log(val);
    let s = this.siteService.updateEmployee(name,val).subscribe(data => {             
      //this.UserPreference = data;        
      s.unsubscribe();  
    }); 
  }

  _Reload(id:number){    
    console.log(id);
  //  this.current_Page_id=id;
  //  this. getTitPhoto();
  }

/*  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.userForm.reset();
  }

  onSubmit() {

    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    console.log(this.userForm.value);
    let s = this.siteService.updateUser(this.userForm.value).subscribe(data => {                       
      s.unsubscribe();         
    }); 
  }*/

  onCancel(){

  }
}
