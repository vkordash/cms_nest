import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // private apiUrl = 'http://localhost:3000';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

 /* register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }*/

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');    
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token && !this.jwtHelper.isTokenExpired(token)) return true;
    else return false   
  }
}
