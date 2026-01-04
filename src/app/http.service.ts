import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ITitPhoto } from './type';
import { User } from './interfaces/User';
import { AppConfigService } from './services/app-config.service';

@Injectable({
  providedIn : "root"
})


export class SiteService {
      private url = this.config.apiBaseUrl;        //  url базы данных (без путей)   
      private url_nest_local = "http://192.168.77.253:20202"   
      private url_nest = "http://10.8.0.1:30303"  
      private name_token = 'token';
      private token : any = null;

      httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': `Bearer `})       
      };
      
      constructor(private http: HttpClient, private config: AppConfigService) {
      }

      getUrlServer () : String {
        return this.url_nest;
      }
/*******************************            Menu  */      


      getMenu(id : number): Observable<any[]> {
        const params = new HttpParams().set('id', id);
        // const headers = this.getHeader();
        // let x = this.http.get<any[]>(this.url+"/menu/getMenu?id="+id,{params,headers});
        
        let x = this.http.get<any[]>(this.url_nest+"/menu/getMenu",{params});
        
        return x;
      }

      deleteMenuItem(id : number): Observable<any[]> {
        //let x = this.http.get<any[]>(this.url+"/menu/delete?id="+id);
        let x = this.http.get<any[]>(this.url_nest+"/menu/del?id="+id);
        return x;
      }

      getMenuByid(id : number): Observable<any[]> {
        let x = this.http.get<any[]>(this.url_nest+"/menu/?id="+id);
        return x;
      }

      newItemMenu(id : number): Observable<any[]> {
        let x = this.http.get<any[]>(this.url+"/menu/add?id_menu="+id);
        return x;
      }

      getMenuItem(id : number): Observable<any> {
        let x = this.http.get<any[]>(this.url_nest+"/menu/getMenuItem?id="+id);
        return x;
      }

      getTreeItem(id : number): Observable<any> {
        let x = this.http.get<any[]>(this.url_nest+"/menu/getTreeItem?id="+id);
        return x;
      }

      getNodeExpand (id : number, id_component : number): Observable<any> {
        let x = this.http.get<number[]>(this.url+"/menu/getNodeExpand?id="+id+"&id_component="+id_component);
        return x;
      }

      getSubMenu(id : number): Observable<any> {
        let x = this.http.get<any[]>(this.url_nest+"/menu/getSubMenu?id="+id);
        return x;
      }

      getTabsMenu(id : number): Observable<any> {
        let x = this.http.get<any[]>(this.url_nest+"/menu/getTabsMenu?id="+id);
        return x;
      }

      getAccordionMenu(id : number): Observable<any> {
        let x = this.http.get<any[]>(this.url_nest+"/menu/getAccordionMenu?id="+id);
        return x;
      }
      
      addMenu(id : number): Observable<any[]> {
        //let x = this.http.get<any[]>(this.url+"/menu/add?id="+id);
        let x = this.http.get<any[]>(this.url_nest+"/menu/add?id="+id);
        return x;
      }

      updateMenu(id_menu : number, name:string,val:any): Observable<any[]> {
        let x = this.http.get<any[]>(this.url_nest+"/menu/update?id="+id_menu+"&name="+name+"&val="+val);
        return x;
      } 
      
      dropItemMenu(id_menu : number, parent: number): Observable<any[]> {
        let x = this.http.get<any[]>(this.url_nest+"/menu/drop?id="+id_menu+"&parent="+parent);
        return x;
      } 



      getAccess(id_menu : number): Observable<any[]> {
        
        let x = this.http.get<any[]>(this.url_nest+"/access/?id_menu="+id_menu);
        return x;
      }

      addAccess(id_menu : number, id_user: number): Observable<any[]> {
        let x = this.http.get<any[]>(this.url_nest+"/access/add?id_menu="+id_menu+"&id_user="+id_user);
        return x;
      }

      delAccess(id_menu : number, id_user: number): Observable<any[]> {
        let x = this.http.get<any[]>(this.url_nest+"/access/del?id_menu="+id_menu+"&id_user="+id_user);
        return x;
      }

      getEmployeeAccess(id : number): Observable<any[]> {
        const params = new HttpParams().set('id', id);
        // const headers = this.getHeader();
        let x = this.http.get<any[]>(this.url_nest+"/employee/access",{params});
        return x;
      }

/*******************************            PAGE  */

      getPage(id : number, typ : number): Observable<any> {  
        return this.http.get<any>(this.url_nest+"/page/?id="+id+"&typ="+typ);
      }

      updatePage(id_page:number,name:string,val:any):Observable<any>{
        let x = this.http.get<any>(this.url_nest+"/page/update?id_page="+id_page+"&name="+name+"&val="+val);
        return x;         
      }

     /* updatePagePref(
        id:number,
        photo_src: string,
        photo_alt: string,
        photo_title: string,
        seo_title: string,
        seo_description: string,
        seo_keywords: string,
        seo_robots: string,
        seo_canonical: string,        
        seo_opengraph: string
      ){
        const params = new HttpParams()
          .set('id', id)
          .set('photo_src', photo_src)
          .set('photo_alt', photo_alt)
          .set('photo_title', photo_title)
          .set('seo_title', seo_title)
          .set('seo_description', seo_description)
          .set('seo_keywords', seo_keywords)
          .set('seo_robots', seo_robots)
          .set('seo_canonical', seo_canonical)
          .set('seo_opengraph', seo_opengraph)
          ;*/
        updatePagePref(params :any){
          console.log(params);
        let x = this.http.get<any>(this.url_nest+"/page/upd_pref",{ params });
        return x;        
      }
/*******************************           List Page  */
      getListPages(id_menu : number, offset : number, limit : number, tag? : string): Observable<any> {    
        //let x = this.http.get<any>(this.url+"/listpages/?id_menu="+id_menu+"&limit="+limit+"&offset="+offset+"&search="+tag);
        let x = this.http.get<any>(this.url_nest+"/page/list?id_menu="+id_menu+"&limit="+limit+"&offset="+offset+"&search="+tag);
        return x;
      }

      addItemPage(id_menu:number):Observable<any>{
        let x = this.http.get<any>(this.url_nest+"/page/add?id_menu="+id_menu);
        return x;         
      }

      getCountPages(id_menu : number): Observable<any> {
        //return this.http.get<number>(this.url+"/listpages/cnt?id_menu="+id_menu);
        return this.http.get<number>(this.url_nest+"/page/cnt?id_menu="+id_menu);
      }

      getPrefPage(id_page:number):Observable<any>{
        let x = this.http.get<any>(this.url_nest+"/page/pref?id="+id_page);
        return x;         
      }
/*******************************           List Video  */

      getListVideos(id_menu : number, offset : number, limit : number,  tag? : string): Observable<any> {  
        
        
      //  let x = this.http.get<any>(this.url_nest+"/listvideos/?id_menu="+id_menu+"&limit="+limit+"&offset="+offset+"&search="+tag);
        let x = this.http.get<any>(this.url_nest+"/video/?id_menu="+id_menu+"&limit="+limit+"&offset="+offset+"&search="+tag);
        return x;
      }

      getCountVideos(id_menu : number): Observable<any> {
      //  return this.http.get<number>(this.url_nest+"/listvideos/cnt?id_menu="+id_menu);
        return this.http.get<any>(this.url_nest+"/video/cnt?id_menu="+id_menu);
      }

      addItemVideo(id_menu:number):Observable<any>{
        let x = this.http.get<any>(this.url_nest+"/listvideos/add?id_menu="+id_menu);
        return x;         
      }

      updateItemVideo(id_page:number,name:string,val:any):Observable<any>{
        //let x = this.http.get<any>(this.url+"/listvideos/update?id="+id_page+"&name="+name+"&val="+val);
        let x = this.http.get<any>(this.url_nest+"/video/upd?id="+id_page+"&name="+name+"&val="+val);
        return x;         
      }
/*******************************            Slider  */      
      getDataSliders(id_menu : number, offset : number, limit : number, tag? : string): Observable<any> {    
        let x = this.http.get<any>(this.url_nest+"/slider/?id_menu="+id_menu+"&offset="+offset+"&limit="+limit+"&search="+tag);
        return x;
      }

      getCountSliders(id_menu : number): Observable<any> {
        return this.http.get<any>(this.url_nest+"/slider/cnt?id_menu="+id_menu);
      }

      addItemSlider(id_menu:number):Observable<any>{
        let x = this.http.get<any>(this.url_nest+"/slider/add?id_menu="+id_menu);
        return x;         
    }
/*******************************            Banners  */
      getBanners(): Observable<any> {    
        let x = this.http.get<any>(this.url_nest+"/banners/");
        return x;
      }

/*******************************            Tags  */     
      getTags(id:number,id_component:number):Observable<any>{
        //let x = this.http.get<any>(this.url+"/tags/?id="+id+"&id_component="+id_component);
        let x = this.http.get<any>(this.url_nest+"/chips/?id="+id+"&id_component="+id_component);
        return x;         
      }

      addLinkTag(id:number,id_component:number,name:string):Observable<any>{
        let x = this.http.get<any>(this.url_nest+"/chips/add?id="+id+"&id_component="+id_component+"&name="+name);
        return x;         
      }

      delLinkTag(id:number,id_component:number,name:string):Observable<any>{
        let x = this.http.get<any>(this.url_nest+"/chips/del?id="+id+"&id_component="+id_component+"&name="+name);
        return x;         
      } 

      delTitPhoto(id:number):Observable<any>{
        let x = this.http.get<any>(this.url_nest+"/page/del-titul-photo?id="+id);
        return x;         
      }
/*******************************            TitPhoto  */      
      getTitPhoto(id : number): Observable<any> {
      //  let x = this.http.get<any[]>(this.url+"/titphoto/get?id="+id);
        let x = this.http.get<any>(this.url_nest+"/titul-photo/?id="+id);
        return x;
      }

      updateTitPhoto(photo:ITitPhoto):Observable<any>{
        let x = this.http.get<any>(this.url_nest+"/titul-photo/upd?id="+photo.id+"&title="+photo.title+"&alt="+photo.alt+"&height="+photo.height+"&width="+photo.width);
        return x;         
      }
/*
      delTitPhoto(id:number):Observable<any>{
        let x = this.http.get<any>(this.url_nest+"/titul-photo/del?id="+id);
        return x;         
      }*/

      /*******************************            ListPhotos  */      
      getListPhotos(id_menu : number, offset : number, limit : number, tag? : string): Observable<any> {    
        //let x = this.http.get<any>(this.url+"/listphotos/?id_menu="+id_menu+"&limit="+limit+"&offset="+offset+"&search="+tag);
        let x = this.http.get<any>(this.url_nest+"/photo/list?id_menu="+id_menu+"&limit="+limit+"&offset="+offset+"&search="+tag);
        return x;
      }

      getCountPhotos(id_menu : number): Observable<any> {
        return this.http.get<number>(this.url_nest+"/photo/cnt?id_menu="+id_menu);
      }

      addItemPhoto(id_menu:number):Observable<any>{
        let x = this.http.get<any>(this.url_nest+"/photo/add?id_menu="+id_menu);
        return x;         
    }

/*******************************            Photo  */

      




      updatePhoto(id_page:number,name:string,val:any):Observable<any>{
        let x = this.http.get<any>(this.url+"/photo/upd?id_page="+id_page+"&name="+name+"&val="+val);
        return x;         
      }

/*******************************           List Docs  */
      getListDocs(id_menu : number, limit : number, offset : number, tag? : string): Observable<any> {  
        let x = this.http.get<any>(this.url+"/listdocs/?id_menu="+id_menu+"&limit="+limit+"&offset="+offset+"&search="+tag);
        return x;
      }
      
      getCountDocs(id_menu : number): Observable<number> {
        return this.http.get<number>(this.url+"/listdocs/cnt?id_menu="+id_menu);
      }

      
      

/*
      getListDocs(params: {
          id_menu: number;
          start: number;
          size: number;
          sortField?: string;
          sortOrder?: number;
          filters?: { [key: string]: string; }})
      
        {
        
         let httpParams = new HttpParams()
            .set('id_menu', params.start)
            .set('offset', params.start)
            .set('limit', params.size);

        if (params.sortField) {
          httpParams = httpParams
            .set('sortField', params.sortField)
            .set('sortOrder', params.sortOrder?.toString() || '1');
        }

        /*if (params.filters) {
          for (const key in params.filters) {
            if (params.filters[key]) {
              httpParams = httpParams.set(`filter_${key}`, params.filters[key]);
            }
          }
        }*/

     /*   return this.http.get<any>(this.url+"/listdocs/", { params: httpParams });
                
      }   

      getCountDocs(params: {id_menu: number;})
      {
          let httpParams = new HttpParams()
            .set('id_menu', params.id_menu);
          
          return this.http.get<number>(this.url+"/listdocs/cnt", {params:httpParams});
      }*/

     
/******************************************************************************************/      
      getListComponents():Observable<any>{

        const params = new HttpParams();
        //const headers = this.getHeader();

        let x = this.http.get<any>(this.url_nest+"/component/",{params});
        return x;         
      }

      registerUser(userDetails: User):Observable<any>{
        const body = { email:'test@test.ua', password: '111111' };
        console.log(userDetails);
        //let x = this.http.post<any>(this.url+"/register",userDetails); 
        let x = this.http.post<any>(this.url+"/auth/register",body); 
        return x;         
      }
     
      login(login: string, passwd : string, db: string):Observable<any>{
        //let lurl = this.url+"/auth/login";
        let url = this.url_nest+"/auth/login";        
        /*const params = new HttpParams()         
         .set('login', login)
         .set('passwd', passwd)
         .set('db', db);
         console.log(params);*/
        //return this.http.post<any>(url,{params}); 

        const body = {
          login,
          passwd,
          db
        };
        return this.http.post<any>(url, body);              
      }

      getHeader (){
        const token = this.getToken();
        return new HttpHeaders().set('Authorization',`Bearer ${token}`);
      }
      setToken(id_pers:string, prop : any)
        {
          //this.name_token = this.name_token+"_"+id_pers;
          //sessionStorage.setItem(this.sess_name,this.name_token);
          //sessionStorage.setItem(namevar_onlyoffice,prop.only_office);
          //localStorage.setItem(this.name_token, JSON.stringify(prop.token));
          localStorage.setItem('token', JSON.stringify(prop.token));
          this.token=prop.token;
        }

        removeLocalStorage()
        {
         // sessionStorage.removeItem(namevar_onlyoffice);
         // sessionStorage.removeItem(this.sess_name);
          localStorage.removeItem(this.name_token);
          this.token=null;
          //sessionStorage.removeItem('stat-list_mess');
          //sessionStorage.removeItem('stat-list_card');
        }

        isLogin() : boolean {
          let r = false;
          if (this.token !== undefined && this.token !== null) 
              r = true;
          return r;    
        }

        getToken(): string | null {
          return localStorage.getItem('token');    
        }

        getUser(id:number):Observable<any>{               
          return this.http.get<number>(this.url_nest+"/user/?id="+id);           
        }  

        getEmployee():Observable<any>{               
          return this.http.get<number>(this.url_nest+"/employee/");           
        } 

        updateEmployee(name:string,val:any):Observable<any>{               
          return this.http.get<number>(this.url_nest+"/employee/upd/?name="+name+"&val="+val);           
        } 

        getPreferOrg():Observable<any>{               
          return this.http.get<number>(this.url_nest_local+"/prefer/org");           
          //return this.http.get<number>(this.url_nest_local+"/pref/?group=org");           
        }

        updatePreferOrg(name:string,val:any):Observable<any>{               
          return this.http.get<number>(this.url_nest_local+"/prefer/org_upd/?name="+name+"&val="+val);      
        }

        getPreferUser():Observable<any>{               
          return this.http.get<any>(this.url_nest_local+"/prefer/user");           
        }

        updatePreferUser(name:string,val:any):Observable<any>{
          let x = this.http.get<any>(this.url_nest_local+"/prefer/user_upd/?name="+name+"&val="+val);
          return x;         
        }

        checkDataBase(db:string):Observable<any>{               
          return this.http.get<string>(this.url+"/checkdatabase/?name="+db);           
        }

        updateUser(userDetails: any):Observable<any>{  
         // const body = { email:'test@test.ua', password: '111111' };             
          return this.http.post<any>(this.url+"/employee/update ",userDetails);           
        }
}
