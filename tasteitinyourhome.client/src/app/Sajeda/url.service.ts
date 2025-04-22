import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface BookingModel {
  id?: number;
  userId: number;
  chefId: number;
  foodId: number;
  serviceId: number;
  numberOfGuests: number;
  bookingDate: string;
  timeSlot: string;
  status?: string;
  createdAt?: Date;
  // Additional properties for UI
  userName?: string;
  chefName?: string;
  foodName?: string;
  serviceName?: string;
  amount?: number;
  location?: string;
}

export interface PaymentModel {
  bookingId: number;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  paymentDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class URLService {
  private apiBaseUrl = 'https://localhost:7132/api/Sajeda';
  private bookingData: any;

  // Observable source for user bookings
  private userBookingsSubject = new BehaviorSubject<BookingModel[]>([]);
  public userBookings$ = this.userBookingsSubject.asObservable();

  constructor(private _http: HttpClient) { }

  // Booking operations
  addBook(data: any): Observable<any> {
    const userId = this.getCurrentUserId();
    if (userId) {
      // Ensure the booking is associated with the logged-in user
      data.userId = userId;
    }
    return this._http.post(`${this.apiBaseUrl}/CreateBook`, data)
      .pipe(
        tap((response: any) => {
          // After successful booking, refresh the user's bookings
          this.getUserBookings(userId);
        })
      );
  }

  // Get bookings for the current user
  getUserBookings(userId?: number): Observable<BookingModel[]> {
    if (!userId) {
      userId = this.getCurrentUserId();
      if (!userId) {
        // If no user ID, return empty array
        this.userBookingsSubject.next([]);
        return this.userBookings$;
      }
    }

    return this._http.get<BookingModel[]>(`${this.apiBaseUrl}/getUserBookings/${userId}`)
      .pipe(
        tap(bookings => {
          this.userBookingsSubject.next(bookings);
        })
      );
  }

  // Cancel a booking
  cancelBooking(bookingId: number): Observable<any> {
    return this._http.put(`${this.apiBaseUrl}/cancelBooking/${bookingId}`, {})
      .pipe(
        tap(() => {
          // After cancellation, refresh the user's bookings
          const userId = this.getCurrentUserId();
          if (userId) {
            this.getUserBookings(userId);
          }
        })
      );
  }

  // Get current user ID from session storage
  getCurrentUserId(): number | undefined {
    const userId = sessionStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : undefined;
  }

  // Chef operations
  getAllChefs() {
    return this._http.get(`${this.apiBaseUrl}/getChiefs`);
  }

  // Food operations
  getAllFoods(chefId: number, categoryId: number): Observable<any> {
    return this._http.get<any>(`${this.apiBaseUrl}/getfood?chefId=${chefId}&categoryId=${categoryId}`);
  }

  // Category operations
  getAllCategorires() {
    return this._http.get(`${this.apiBaseUrl}/getCategories`);
  }

  // Service operations
  getAllServices() {
    return this._http.get(`${this.apiBaseUrl}/getService`);
  }

  getServicebyCheifID(chefId: number) {
    return this._http.get(`${this.apiBaseUrl}/getService${chefId}`);
  }

  // Payment operations
  addToCheck(data: any) {
    return this._http.post(`${this.apiBaseUrl}/Pay`, data);
  }

  // Availability operations
  getAvailability(chefId: number, date: string) {
    return this._http.get(`${this.apiBaseUrl}/${chefId}/availability?bookingDate=${date}`);
  }

  // Booking data storage for the booking process
  setBookingData(data: any) {
    this.bookingData = data;
  }

  getBookingData() {
    return this.bookingData;
  }

  // Process credit card payment - simulated
  processCardPayment(cardData: any, bookingData: any): Observable<any> {
    // In a real implementation, this would call a secure payment gateway
    // For now we'll just simulate success by returning the booking payment
    return this.addToCheck({
      bookingId: bookingData.bookingId || 1,
      amount: bookingData.amount,
      paymentMethod: 'Credit Card',
      paymentStatus: 'Completed',
      paymentDate: new Date()
    });
  }

  // Validate credit card - basic validation only
  validateCreditCard(cardNumber: string): { valid: boolean, type?: string } {
    // Remove spaces and dashes
    cardNumber = cardNumber.replace(/[\s-]/g, '');

    // Check for valid card types
    const cardPatterns = {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      amex: /^3[47][0-9]{13}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/
    };

    if (cardPatterns.visa.test(cardNumber)) {
      return { valid: true, type: 'visa' };
    } else if (cardPatterns.mastercard.test(cardNumber)) {
      return { valid: true, type: 'mastercard' };
    } else if (cardPatterns.amex.test(cardNumber)) {
      return { valid: true, type: 'amex' };
    } else if (cardPatterns.discover.test(cardNumber)) {
      return { valid: true, type: 'discover' };
    }

    return { valid: false };
  }
}

