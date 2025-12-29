import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private config: any;

  constructor(private http: HttpClient) {}

  loadConfig(): Promise<void> {
    return this.http.get('./assets/app.config.json')
      .toPromise()
      .then(cfg => { 
        this.config = cfg; 
      });
  }
  
  get apiBaseUrl(): string { return this.config?.apiBaseUrl; }
  
}
