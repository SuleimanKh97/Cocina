import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'http://localhost:5261/api/Sondos';

    constructor(private http: HttpClient) { }


    getAllUsers() {
        return this.http.get<any>(`${this.apiUrl}/AllUser`);
    }

    getUserById(id: number) {
        return this.http.get<any>(`${this.apiUrl}/GetProfile/${id}`);
    }
   
    submitFeedback(feedback: any) {
        return this.http.post(`${this.apiUrl}/AddFeedback`, feedback);
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

    getUserBookingHistory(UserId: number) {
        return this.http.get<any>(`${this.apiUrl}/BookingHistory/${UserId}`);
    }
}
