import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { SaraService } from '../../Sarah/sara.service';


@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {

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

    this.loadBookings();

  }

  loadBookings(): void {
    this.saraService.getAllBookings().subscribe({
      next: (data: any) => {
        this.bookings = data;
        console.log('Bookings loaded:', this.bookings);
      },
      error: (error: any) => {
        console.error('Error loading bookings:', error);
      }
    });
  }


  acceptBooking(id: number): void {
    this.saraService.acceptBooking(id).subscribe({
      next: () => {
        console.log('Booking accepted successfully');
        this.loadBookings(); // Reload bookings after accepting
      },
      error: (error: any) => {
        console.error('Error accepting booking:', error);
      }
    });
  }

}
