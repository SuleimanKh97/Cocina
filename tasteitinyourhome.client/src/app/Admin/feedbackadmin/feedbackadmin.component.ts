import { Component } from '@angular/core';

import { SaraService, Feedback as FeedbackModel } from '../../Sarah/sara.service';


@Component({
  selector: 'app-feedbackadmin',
  standalone: false,
  templateUrl: './feedbackadmin.component.html',
  styleUrl: './feedbackadmin.component.css'
})
export class FeedbackadminComponent {

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

    this.loadFeedbacks();
  }

  chaf: any;
  loadFeedbacks(): void {
    this.saraService.getAllFeedbacks().subscribe({
      next: (data :any) => {
        this.feedbacks = data;
        console.log('Feedbacks loaded:', this.feedbacks);
      },
      error: (error :any) => {
        console.error('Error loading feedbacks:', error);
      }
    });
  }


  addFeedback(feedbackData: any): void {
    this.saraService.addFeedback(feedbackData).subscribe({
      next: () => {
        console.log('Feedback added successfully');
        this.loadFeedbacks();
      },
      error: (error) => {
        console.error('Error adding feedback:', error);
      }
    });
  }

}
