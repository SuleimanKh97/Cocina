import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7132/api/Sondos';

    constructor(private http: HttpClient) { }


    getAllUsers() {
        return this.http.get<any>(`${this.apiUrl}/AllUser`);
    }

    getUserById(id: number) {
        return this.http.get<any>(`${this.apiUrl}/GetProfile/${id}`);
    }

  

    //updateProfile(user: any, id: number): Observable<any> {
    //    return this.http.put(`${this.apiUrl}/UpdateProfile/${id}`, user);
    //}

    updateProfile(user: any, id: number): Observable<any> {
       

        return this.http.put(`${this.apiUrl}/UpdateProfile/${id}`, user);
    }

    changePassword(passwordData: any, id: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/ChangePassword/${id}`, passwordData);
    }

    getUserBookingHistory(userId: number) {
        return this.http.get<any>(`${this.apiUrl}/BookingHistory/${userId}`);
    }
}
