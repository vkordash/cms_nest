import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode'; // Импортируем декодер


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token : any;
  constructor() { 

  }

  // Метод для декодирования токена
  decodeToken(): any {
    try {
      this.token = localStorage.getItem('token');
      return jwtDecode(this.token);
    } catch (error) {
      console.error("Ошибка декодирования токена:", error);
      return null;
    }
  }

  // Метод для получения данных из токена
  getPayload(): any {
    const decoded = this.decodeToken();
    return decoded ? decoded : null;
  }

  // Метод для получения имени пользователя (пример)
  getUsername(): string | null {
    const payload = this.getPayload();
    return payload ? payload.sub : null; // 'sub' - стандартное имя для ID пользователя
  }

  // Метод для получения роли (пример)
  getRole(): string[] | null {
    const payload = this.getPayload();
    return payload ? payload.role : null; // 'role' - пример поля
  }

  getAccess(role:string): boolean {
    const roles = this.getRole()
    return roles ? roles?.includes(role) : false;
  }
}
