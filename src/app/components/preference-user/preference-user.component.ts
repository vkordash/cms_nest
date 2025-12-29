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
    this.getOrg();
  }

  onHide(){
    this.closeDialog.emit({show:false});        
  }

  getUser(){
    let s = this.siteService.getUser(this.id_user).subscribe(data => {             
      this.User = data;  
      this.getPerson(this.User.id_pers);
      s.unsubscribe();  
    }); 
  }

  getPerson(id_pers:number){
    let s = this.siteService.getEmployee(id_pers).subscribe(data => {             
      this.Person = data;
      this.userForm = this.fb.group({
        coname: [data.coname, [Validators.required, Validators.minLength(2)]], 
        fname: [data.fname, [Validators.required, Validators.minLength(2)]], 
        lname: [data.lname, [Validators.required, Validators.minLength(2)]], 
        post: [data.post, [Validators.required, Validators.minLength(10)]], 
        email: [data.email, [Validators.required, Validators.email]],
        id_pers: [data.id]     
      });
      s.unsubscribe();  
    }); 
  }

  getOrg(){
    /*let s = this.siteService.getEmployee(this.id_user).subscribe(data => {             
      this.Person = data;        
      s.unsubscribe();  
    }); */
  }

  get f(): { [key: string]: AbstractControl } {
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
  }
}
