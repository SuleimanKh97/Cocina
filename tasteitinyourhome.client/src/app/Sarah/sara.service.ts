import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  name?: string;
}

export interface Booking {
  id: number;
  userId: number;
  serviceId: number;
  bookingDate: string;
  status: string;
  userName?: string;
  serviceName?: string;
}

export interface Payment {
  id: number;
  bookingId?: number;
  amount: number;
  paymentDate: string;
  status: string;
  paymentMethod?: string;
  userName?: string;
  serviceName?: string;
}

export interface ContactMessage {
  id: number;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface Feedback {
  id: number;
  userId: number;
  serviceId: number;
  rating: number;
  comment: string;
  createdAt: string;
  userName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SaraService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:7132/api/Sara';

  // Services API calls
  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/getService`);
  }

  addService(serviceData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddService`, serviceData);
  }

  updateService(id: number, serviceData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateService/${id}`, serviceData);
  }

  deleteService(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.apiUrl}/deleteService/${id}`, { observe: 'response' });
  }

  // Bookings API calls
  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/getBookings`);
  }

  acceptBooking(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateBookings/${id}`, {});
  }

  // Payments API calls
  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/getPayments`);
  }

  // Contact messages API calls
  getAllContactMessages(): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(`${this.apiUrl}/getMessage`);
  }

  addContactMessage(contactData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addMessage`, contactData);
  }

  // Feedback API calls
  getAllFeedbacks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getFeedback`);
  }

  addFeedback(feedbackData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addFeedback`, feedbackData);
  }
}
