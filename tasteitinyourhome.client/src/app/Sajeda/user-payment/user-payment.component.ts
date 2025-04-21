//import { Component, EventEmitter, Input, Output } from '@angular/core';
//import { URLService } from '../url.service';
//import { Location } from '@angular/common';


//@Component({
//  selector: 'app-user-payment',
//  standalone: false,
//  templateUrl: './user-payment.component.html',
//  styleUrl: './user-payment.component.css'
//})
//export class UserPaymentComponent {
// booking: any = {}; // Receiving booking data from parent



//  selectedMethod: string = 'credit-card';

//  payment = {
//    cardNumber: '',
//    cardName: '',
//    expiryDate: '',
//    cvv: '',
//    paymentMethod: 'cash',
//    saveCard: false

//  };

//  private items: any[] = [];
//  constructor(private _url: URLService, private location: Location) { }

//  ngOnInit() {
//    const navigation = this.location.getState() as { booking?: any };
//    this.booking = navigation.booking;

//    console.log('Received booking data:', this.booking);
//    this.booking.amount = this.calculateAmount();
//  }




//  calculateAmount(): number {
//    if (this.booking.price && this.booking.guestCount) {
//      return this.booking.price * this.booking.guestCount;
//    }
//    return 0;
//  }


//  setPaymentMethod(method: string) {
//    this.selectedMethod = method;
//  }

//  onSubmit(form: any) {
//    if (form.valid) {
//      const payload = {
//        booking: {
//          chefId: this.booking.chefId,
//          userId: this.booking.userId,
//          date: this.booking.date,
//          time: this.booking.time,
//          notes: this.booking.notes
//        },
//        payment: {
//          amount: this.booking.amount,
//          paymentMethod: this.selectedMethod,
//          paymentStatus: 'Pending',
//          paymentDate: new Date(),
//          cardDetails: this.selectedMethod === 'credit-card' ? { ...this.payment } : null
//        }
//      };

//      console.log('Submitting payload:', payload);

//      this._url.addToCheck(payload).subscribe({
//        next: () => alert("✅ Booking and Payment added successfully!"),
//        error: () => alert("❌ Something went wrong. Please try again.")
//      });
//    } else {
//      console.warn('Form is invalid');
//    }
//  }

//  // Assuming you have a method to handle the payment form submission
//  submitPayment(): void {
//    // Update the booking object with payment details
//    const updatedBooking = {
//      ...this.booking,
//      payment: {
//        method: 'CreditCard', // Example, update based on actual form data
//        cardNumber: '1234567812345678',
//        cardName: 'John Doe',
//        expiryDate: '12/25',
//        cvv: '123'
//      },
//      amount: 200 // Assuming this is updated after payment processing
//    };
//  }
//}

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
    this.booking.amount = this.booking.price * this.booking.guestCount;
    console.log("Received booking in payment:", this.booking);
  }

  setPaymentMethod(method: string) {
    this.selectedMethod = method;
  }

  onSubmit(form: any) {
    if (form.valid) {
      const payload = {
        booking: {
          chefId: this.booking.chefId,
          userId: this.booking.userId,
          date: this.booking.date,
          time: this.booking.time,
          notes: this.booking.notes
        },
        payment: {
          amount: this.booking.amount,
          paymentMethod: this.selectedMethod,
          paymentStatus: 'Pending',
          paymentDate: new Date(),
          cardDetails: this.selectedMethod === 'credit-card' ? { ...this.payment } : null
        }
      };

      console.log('Submitting payload:', payload);

      this._url.addToCheck(payload).subscribe({
        next: () => alert("✅ Booking and Payment added successfully!"),
        error: () => alert("❌ Something went wrong. Please try again.")
      });
    } else {
      console.warn('Form is invalid');
    }
  }
}
