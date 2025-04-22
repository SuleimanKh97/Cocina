import { Component, EventEmitter, Input, Output } from '@angular/core';
import { URLService } from '../url.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-payment',
  standalone: false,
  templateUrl: './user-payment.component.html',
  styleUrl: './user-payment.component.css'
})
export class UserPaymentComponent {
  @Input() booking: any = {};
  selectedMethod: string = 'credit-card';
  paymentForm: FormGroup;
  isProcessing: boolean = false;
  paymentSuccess: boolean = false;
  paymentError: string = '';
  cardTypes: any = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/
  };
  detectedCardType: string = '';

  constructor(
    private _url: URLService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{13,19}$/)]],
      cardName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      expiryMonth: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])$/)]],
      expiryYear: ['', [Validators.required, Validators.pattern(/^[0-9]{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
      saveCard: [false]
    });
  }

  ngOnInit() {
    this.booking = this._url.getBookingData();
    console.log("Received booking in payment:", this.booking);

    // Listen for card number changes to detect card type
    this.paymentForm.get('cardNumber')?.valueChanges.subscribe(val => {
      this.detectCardType(val);
    });
  }

  setPaymentMethod(method: string) {
    this.selectedMethod = method;
  }

  detectCardType(cardNumber: string) {
    // Remove spaces and dashes
    cardNumber = cardNumber.replace(/[\s-]/g, '');

    if (this.cardTypes.visa.test(cardNumber)) {
      this.detectedCardType = 'visa';
    } else if (this.cardTypes.mastercard.test(cardNumber)) {
      this.detectedCardType = 'mastercard';
    } else if (this.cardTypes.amex.test(cardNumber)) {
      this.detectedCardType = 'amex';
    } else if (this.cardTypes.discover.test(cardNumber)) {
      this.detectedCardType = 'discover';
    } else {
      this.detectedCardType = '';
    }
  }

  // Format card number with spaces
  formatCardNumber(event: any) {
    let input = event.target;
    let trimmed = input.value.replace(/\s+/g, '');
    let numbers = [];

    for (let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substring(i, i + 4));
    }

    input.value = numbers.join(' ');
  }

  // Check if expiry date is valid
  isExpiryValid(): boolean {
    const month = this.paymentForm.get('expiryMonth')?.value;
    const year = this.paymentForm.get('expiryYear')?.value;

    if (!month || !year) return false;

    const expiry = new Date();
    expiry.setFullYear(2000 + parseInt(year), parseInt(month), 0);

    return expiry > new Date();
  }

  onSubmit() {
    if (this.selectedMethod === 'cash') {
      // Process cash payment
      this.processPayment('Cash');
      return;
    }

    if (this.paymentForm.valid && this.isExpiryValid()) {
      this.isProcessing = true;
      this.paymentError = '';

      // Simulate payment processing
      setTimeout(() => {
        this.processPayment('Credit Card');
      }, 2000);
    } else {
      // Handle invalid form
      this.paymentForm.markAllAsTouched();

      if (!this.isExpiryValid() && this.paymentForm.get('expiryMonth')?.valid && this.paymentForm.get('expiryYear')?.valid) {
        this.paymentError = 'Your card has expired. Please use a valid card.';
      }
    }
  }

  processPayment(method: string) {
    const paymentData = {
      bookingId: this.booking.bookingId || 1, // Default to 1 if not available
      amount: this.booking.amount,
      paymentMethod: method,
      paymentStatus: 'Completed',
      paymentDate: new Date()
    };

    this._url.addToCheck(paymentData).subscribe({
      next: (response) => {
        this.isProcessing = false;
        this.paymentSuccess = true;

        // Show success message and redirect after delay
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      },
      error: (err) => {
        console.error('Payment API Error:', err);
        this.isProcessing = false;
        this.paymentError = 'Payment processing failed. Please try again.';
      }
    });
  }
}
