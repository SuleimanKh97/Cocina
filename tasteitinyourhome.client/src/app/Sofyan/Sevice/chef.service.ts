import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Chef {
  id: number;
  fullName: string;
  bio?: string;
  experienceYears?: number;
  email?: string;
  phoneNumber?: string;
  availabilitySchedule?: string;
  imageUrl?: string;
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChefService {
  private baseUrl = 'https://localhost:7132/api';

  constructor(private http: HttpClient) { }

  /**
   * Get all chefs from the API
   * @returns Observable with list of chefs
   */
  getAllChefs(): Observable<Chef[]> {
    return this.http.get<Chef[]>(`${this.baseUrl}/Chefs/ShowAllChefs`);
  }

  /**
   * Get chef details by ID
   * @param id Chef ID
   * @returns Observable with chef details
   */
  getChefById(id: number): Observable<Chef> {
    return this.http.get<Chef>(`${this.baseUrl}/Chefs/${id}`);
  }
}
