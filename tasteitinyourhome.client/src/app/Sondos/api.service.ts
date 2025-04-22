import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'https://localhost:7132/api/Sondos';
    private sajedaApiUrl = 'https://localhost:7132/api/Sajeda';

    constructor(private http: HttpClient) { }


    getAllUsers() {
        return this.http.get<any>(`${this.apiUrl}/AllUser`);
    }

    getUserById(id: number) {
        return this.http.get<any>(`${this.apiUrl}/GetProfile/${id}`);
    }

    submitFeedback(feedback: any) {
        const completeData = {
            ...feedback,
            submittedAt: new Date().toISOString(),
            userName: "string",
            chefName: "string",
            foodName: "string"
        };

        console.log('Sending feedback request with data:', completeData);

        return this.http.post(`${this.apiUrl}/AddFeedback`, completeData);
    }

    // Check if feedback exists for a booking
    checkFeedbackExists(bookingId: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/CheckFeedbackExists/${bookingId}`);
    }



    //updateProfile(user: any, id: number): Observable<any> {
    //    return this.http.put(`${this.apiUrl}/UpdateProfile/${id}`, user);
    //}

    updateProfile(formData: FormData, id: number): Observable<any> {


        return this.http.put(`${this.apiUrl}/UpdateProfile/${id}`, formData);
    }
    //updateProfile( userId: number) {
    //    return this.http.put(`https://your-api-url/api/users/${userId}`, formData);
    //}

    changePassword(passwordData: any, id: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/ChangePassword/${id}`, passwordData);
    }

    getUserBookingHistory(UserId: number) {
        return this.http.get<any>(`${this.apiUrl}/BookingHistory/${UserId}`);
    }

    cancelBooking(bookingId: number): Observable<any> {
        return this.http.put(`${this.sajedaApiUrl}/cancelBooking/${bookingId}`, {});
    }
}
