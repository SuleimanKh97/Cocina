import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetServiceService {

  private apiUrl = 'https://localhost:7132/api/Sally';
// Adjust based on your actual API route

  constructor(private http: HttpClient) { }

  sendResetCode(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-reset-code`, { email });
  }

  verifyResetCode(email: string, code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-reset-code`, { email, code });
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { email, newPassword });
  }
}
