import { Component } from '@angular/core';

import { SaraService,  Feedback as FeedbackModel } from '../../Sarah/sara.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactusadmin',
  standalone: false,
  templateUrl: './contactusadmin.component.html',
  styleUrl: './contactusadmin.component.css'
})
export class ContactusadminComponent {


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
   
    this.loadContactMessages();
   
  }

  loadContactMessages(): void {
    this.saraService.getAllContactMessages().subscribe({
      next: (data :any) => {
        this.contactMessages = data;
        console.log('Contact messages loaded:', this.contactMessages);
      },
      error: (error :any) => {
        console.error('Error loading contact messages:', error);
      }
    });
  }


  sendContactMessage(contactData: any): void {
    this.saraService.addContactMessage(contactData).subscribe({
      next: () => {
        console.log('Message sent successfully');
        this.loadContactMessages();
      },
      error: (error :any) => {
        console.error('Error sending message:', error);
      }
    });
  }


}
