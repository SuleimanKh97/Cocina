import { Component, EventEmitter, Input, Output } from '@angular/core';
import { URLService } from '../url.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-payment',
  standalone: false,
  templateUrl: './user-payment.component.html',
  styleUrl: './user-payment.component.css'
})
export class UserPaymentComponent {
  @Input() booking: any = {};
  selectedMethod: string = 'credit-card';

  payment = {
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'cash',
    saveCard: false

  };

  private items: any[] = [];
  constructor(private _url: URLService) { }

  ngOnInit() {
    this.booking = this._url.getBookingData();
    //this.booking.amount = this.booking.price * this.booking.guestCount;
    console.log("Received booking in payment:", this.booking);
  }

  setPaymentMethod(method: string) {
    this.selectedMethod = method;
  }

  //onSubmit(form: any) {
  //  if (form.valid) {
  //    const payload = {
  //      booking: {
  //        chefId: this.booking.chefId,
  //        userId: this.booking.userId,
  //        date: this.booking.date,
  //        time: this.booking.time,
  //        notes: this.booking.notes,
  //        guests: this.booking.guests,
  //        amount: this.booking.amount,
  //        location: this.booking.location
  //      },
  //      payment: {
  //        amount: this.booking.amount,
  //        paymentMethod: this.selectedMethod,
  //        paymentStatus: 'Pending',
  //        paymentDate: new Date(),
  //        cardDetails: this.selectedMethod === 'credit-card' ? { ...this.payment } : null
  //      }
  //    };

  //    console.log('Submitting payload:', JSON.stringify(payload, null, 2));

  //    this._url.addToCheck(this.booking).subscribe
  //    ({
  //      next: () => alert("✅ Booking and Payment added successfully!"),
  //      error: (err) => {
  //        console.error('❌ API Error:', err);
  //        alert("❌ Something went wrong. Please try again.");
  //      }
  //    });
  //  } else {
  //    console.warn('Form is invalid');
  //  }
  //}

  onSubmit(form: any) {
    if (form.valid) {
      const bookingPayload = {
        chefId: this.booking.chefId,
        userId: this.booking.userId,
        date: this.booking.date,
        time: this.booking.time,
        notes: this.booking.notes,
        guests: this.booking.guests,
        amount: this.booking.amount,
        location: this.booking.location
      };

      console.log('📦 Submitting booking:', JSON.stringify(bookingPayload, null, 2));

      this._url.addToCheck(bookingPayload).subscribe({
        next: () => alert("✅ Booking added successfully!"),
        error: (err) => {
          console.error('❌ Booking API Error:', err);
          alert("❌ Something went wrong. Please try again.");
        }
      });
    } else {
      console.warn('⚠️ Form is invalid');
    }
  }


}
