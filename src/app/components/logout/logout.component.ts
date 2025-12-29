import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SiteService } from '../../http.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit {

  text_search: string='';
  @Output() isLoggedForm = new EventEmitter();

  constructor( private http: SiteService, private router : Router,  private authService: AuthService  ) { 
  }


  ngOnInit(): void {
  }

  logOut(): void {
    this.authService.logout();    
    //this.http.removeLocalStorage();
    this.isLoggedForm.emit(false);
   // this.router.navigate(['/?isLogged=1']); 
  }

  search(): void {
    console.log(this.text_search);
    if (this.isUrl(this.text_search)){
      const urlObj = new URL(this.text_search);
      const params = this.parseUrlParams(this.text_search); 
      params.search = 1;    
      console.log(params);
      //this.router.navigate([urlObj.pathname],{queryParams: params});      
      document.location.href = urlObj.href+'&search=1'; 
      //this.router.navigate([urlObj.origin+urlObj.pathname],{queryParams: params});       
    }
  }
  
  isUrl(input: string): boolean {
    //const urlPattern = /^(http?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*(\?.*)?(#.*)?$/i;
    //return urlPattern.test(input);

    try {
      const url = new URL(input);
  
      // Проверяем, содержит ли URL корректную схему (http, https)
      if (!['http:', 'https:'].includes(url.protocol)) {
        return false;
      }
  
      return true;
    } catch (_) {
      return false; // Ошибка при разборе — значит, это не URL
    }
  }

  parseUrlParams(url: string): any {
    const params: Record<string, string> = {};
    const urlObj = new URL(url); // Создаём объект URL
    
    urlObj.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    
    return params;
  }
}
