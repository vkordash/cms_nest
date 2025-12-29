import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator} from 'src/app/shared/password-match.directive';
import { MessageService } from 'primeng/api'; 
import { SiteService } from '../../http.service';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    fullName: ['',[Validators.required, Validators.pattern(/^[a-zA-Z]+(?:a-zA-Z]+)*$/)]],
    email: ['',[Validators.required, Validators.email]],
    password: ['',Validators.required],
    confirmPassword: ['',Validators.required]
  },{
    validators : passwordMatchValidator
  });

  constructor(private fb:FormBuilder, private siteService : SiteService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  get fullName(){
    return this.registerForm.controls['fullName'];
  }

  get email(){
    return this.registerForm.controls['email'];
  }

  get password(){
    return this.registerForm.controls['password'];
  }

  get confirmPassword(){
    return this.registerForm.controls['confirmPassword'];
  }

  submitDetails(){
    console.log(this.registerForm.value);
    const postData = {...this.registerForm.value};
    delete postData.confirmPassword;
      let s = this.siteService.registerUser(postData as User).subscribe(response =>
        { 
          console.log(response);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Message Content'});
        },
          
          error => console.log(error)              
      );                     
      s.unsubscribe();     
  }
}


/*****
 * 
 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['',Validators.required]
  });

  constructor(private fb:FormBuilder) {

   }

  ngOnInit(): void {
  }

 
}


 *
 * *** */