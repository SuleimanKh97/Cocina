import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginUserDTO } from './loginUserDTO';
import { addUserDTO } from './addUserDTO';

@Injectable({
  providedIn: 'root'
})
export class SallyServiceService {

  private apiUrl = 'https://localhost:5261/api/Sally';
  constructor(private http: HttpClient) { }

  login(user: loginUserDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login`, user, { observe: 'response' });
  }

  // دالة تسجيل جديد
  register(userData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/Register`, userData, { observe: 'response' });
  }

  googleLogin(token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/GoogleLogin`, { token }, { observe: 'response' });
  }
}
