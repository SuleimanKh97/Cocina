import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Service {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'https://localhost:7132';

  constructor(private http: HttpClient) { }

  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/Home/GetAllServices`);
  }

  handelcontactusRequst(contact: any) {
    return this.http.post(`${this.apiUrl}/Home/ContactUs`, contact);
  }
}
