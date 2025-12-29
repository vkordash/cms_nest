import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../../http.service';
import { MessageService } from 'primeng/api'; 
import { AuthService } from '../../services/auth.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  login   : string = "admin";
  passwd  : string = "111111";
  test_database: string = '';
  display : boolean = true;

  @Output() isLoggedForm = new EventEmitter();
  @Input() database : string = '';

  constructor( private http: SiteService, private router : Router, private route: ActivatedRoute, private title : Title, private messageService: MessageService, private authService: AuthService ) { 
    }

    
    ngOnInit(): void {
      
      /*this.route.queryParams.subscribe(params => {      
        if (params['db']){
          this.database = params['db'];         
        }
        else {
          this.messageService.add({severity:'error', summary: 'Помилка !', detail:  'База данних '+this.test_database, life: 20000});   
          this.database=this.test_database;              
        }
      })*/
      //this.database = this.getCookie('db_cms');
      
    }

    getCookie(name: string): string | null {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? decodeURIComponent(match[2]) : null;
    }

    send() : void {
          if  (this.database=='') {
            this.messageService.add({severity:'error', summary: 'Помилка !', detail:  'База данних не визначена! ', life: 20000});
          }
          else {
            this.http.login(this.login,this.passwd, this.database)
            .subscribe(prop => {
                  if (prop && prop.status == 1)  
                  {     
                      this.authService.setToken(prop.token);
                      this.isLoggedForm.emit({stat:true, org_name:prop.org_name, user_name : prop.user_name, id_user : prop.id_user, id_org: prop.id_org, url_site: prop.url_site });
                      this.router.navigate(['/welcome']);  // куда после логина
                  }
                  else
                  {
                      this.messageService.add({severity:'error', summary: 'Помилка !', detail: 'Не правильний логін чи пароль!', life: 20000}); 
                      this.router.navigate(['/login']);  // куда после логина   
                  }
              });
          }          
    }
}
