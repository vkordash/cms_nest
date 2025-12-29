import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ITitPhoto } from '../type';
import { User } from '../interfaces/User';
import { AppConfigService } from '../services/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class SingleUploadService {

     private url = this.config.apiBaseUrl;        //  url базы данных (без путей)   
      private url_nest = "http://192.168.77.253:20202"   
      private name_token = 'token';
      private token : any = null;

      httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': `Bearer `})       
      };
      
      constructor(private http: HttpClient, private config: AppConfigService) {
      }

      setPhoto(id : number, id_component : number, file:any ): Observable<any[]> {
        
        /*
          id_menu != 0  то іконка пункту меню таблиці меню

          иначе обновляем запись для титульного фото, слайдеров и т.д.

        */
        const params = new HttpParams()
          .set ('id', id)
          .set ('id_component', id_component)
          .set ('file',file);
        
        const url = this.url_nest+this.getSubPath(id_component);
        console.log ('Урл для після завантаження фото '+url);
        return this.http.get<any>(url, { params: params });         
        
      }


      getSubPath (typ:number){

        switch(typ) {
          case 0:
              // Иконка пункта меню
            return '/menu/set-icon/';
            break
          case 1:
              // Титульне фото
              return '/page/set-photo/';
              break;
          case 8:
              // Відеоконтент
              return '/page/set-photo/';
              break;
          case 9:
              // Фотогалерея
              return '/page/set-photo/';
              break;
          case 10:
              // Слайдер сторінок
              return '/page/set-photo/';
              break;
          case 11:
              // Слайдер банерів
              return '/page/set-photo/';
              break;
          case 13:
              // Табс
              return '/page/set-photo/';
              break;
          case 14:
              // Акардіон
              return '/page/set-photo/';
              break;
                  
          default:
            return '';
            console.log("Url запиту для оновлення фото відсутній");
            break;
        }
      }
 
}