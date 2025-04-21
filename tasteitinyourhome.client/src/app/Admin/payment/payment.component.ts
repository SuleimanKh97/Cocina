import { Component } from '@angular/core';
import { SaraService } from '../../Sarah/sara.service';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  selectedService: any = {
    id: 0,
    Name: '',
    Description: '',
    ImageUrl: ''
  };

  services: any = [];
  bookings: any = [];
  payments: any = [];
  contactMessages: any = [];
  feedbacks: any = [];



  constructor(private saraService: SaraService) { }

  ngOnInit(): void {

    this.loadPayments();

  }


  loadPayments(): void {
    this.saraService.getAllPayments().subscribe({
      next: (data :any) => {
        this.payments = data;
        console.log('Payments loaded:', this.payments);
      },
      error: (error :any) => {
        console.error('Error loading payments:', error);
      }
    });
  }











}
