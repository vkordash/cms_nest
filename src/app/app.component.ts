import { Component, OnInit, Input } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from './http.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api'; 
import { AppConfigService } from './services/app-config.service';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [MessageService]
})
export class AppComponent {
  
  constructor(private configPrimNG: PrimeNGConfig, private route: ActivatedRoute, private router: Router, private siteService : SiteService, private messageService: MessageService, public config: AppConfigService, private authService: AuthService ) { 
    this.configPrimNG.setTranslation({
      dayNames        : ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"],
      dayNamesMin     : ["Нд","Пн","Вт","Ср","Чт","Пт","Сб"],
      monthNames      : ["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень" ],
      monthNamesShort : ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер","Лип", "Сер", "Вер", "Жов", "Лис", "Гру"],
      dateFormat      : 'dd/mm/yy',
      firstDayOfWeek  : 1,
      today           : 'Сьогодні',
      "accept"        : "Так",
      "reject"        : "Ні",
      "choose"        : "Обрати",
      "upload"        : "Завантажити",
      "cancel"        : "Відмінити",
  });
    this.configPrimNG.ripple = true; 
  }

  public title = 'Hello world!';
  
  isLogged : boolean = false;
  preference_show : boolean = false;
  org_name : string ='Система управління ';
  user_name : string ='';
  id_org : number = 0 ;
  id_user :number = 0;
  db: any = '';
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {    
      if (params['db']!=undefined) {
        this.db = params['db']; 
        document.cookie = `db_cms=${this.db}; path=/; max-age=86400`;  
      }
      else if (this.getCookie('db_cms')!=null){
        this.db = this.getCookie('db_cms');
        if (this.authService.isAuthenticated()) {
          this.isLogged=true;
        }
        //this.router.navigate(['/',{ queryParams: params}] );
      }
      else {
        this.messageService.add({severity:'error', summary: 'Помилка !', detail: 'База данних не визначена!', life: 20000});           
      }
     this.checkDataBase();                     
    })
  }

 
  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }
  
  checkDataBase(){
    console.log(this.db);
    /*this.siteService.checkDataBase(db)
        .subscribe(prop => {
          if (prop.status == 1)  
          {     
            document.cookie = `db_cms=${db}; path=/; max-age=86400`;  
            this.router.navigate(['/login']);  // куда после логина
          }
          else
          {
            this.messageService.add({severity:'error', summary: 'Помилка !', detail: prop.error, life: 20000});             
      }
    });*/
     
  }

  LoginSuccess($event:any){
    console.log($event);
    this.isLogged=$event.stat;
    this.org_name=$event.org_name;
    this.user_name=$event.user_name;
    this.id_user=$event.id_user;
    this.id_org=$event.id_org;
    this.org_name=$event.url_site;
    
  }

  prefer_user(){
    this.preference_show=true;
  }

  _Dialog($event:any){    
    this.preference_show=$event.show;
//    this.getMenu();
    this.updateNode();
  }
  
  updateNode(): void {
  /*  let s = this.siteService.getTreeItem(this.current_menu_id).subscribe(tmenu => {                         
        console.log(this.SelectedItem);
        console.log(tmenu);            
        this.SelectedItem=tmenu;
        console.log(this.data);
        this.refreshNode(this.data);
        console.log(this.data);
    //    this.handleClick(this.SelectedItem);
        s.unsubscribe(); 
    }); */
  }
  
}
