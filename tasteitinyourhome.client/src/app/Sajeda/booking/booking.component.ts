//import { Component } from '@angular/core';
//import { URLService } from '../url.service';

//@Component({
//  selector: 'app-booking',
//  standalone: false,
//  templateUrl: './booking.component.html',
//  styleUrl: './booking.component.css'
//})
//export class BookingComponent {
//  guests: number = 1; // This stores the current number of guests
//  container: any;

//  constructor(private _url: URLService) { }
//  ngOnInit() { }

//  // Increase guest count
//  incrementGuests(): void {
//    if (this.guests < 20) {
//      this.guests++;
//    }
//  }

//  // Decrease guest count
//  decrementGuests(): void {
//    if (this.guests > 1) {
//      this.guests--;
//    }
//  }

//  // Handle form submission
//  onSubmit(data: any): void {
//    var formData: any = new FormData();
//    formData.append("BookingDate", data.BookingDate);
//    formData.append("NumberOfGuests", data.NumberOfGuests);
//    formData.append("TimeSlot", data.TimeSlot);
//    formData.append("NumberOfGuests", data.NumberOfGuests);

//    this._url.addBook(formData).subscribe(() => {
//      alert('Booking request submitted! We will contact you shortly to confirm details.')
//    });

//    // You can reset the guest count here if desired:
//    // this.guests = 1;
//  }
//}

import { Component, OnInit } from '@angular/core';
import { URLService } from '../url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  guests: number = 1;
  ID: any;
  CategoryID: any;
  // Data for dropdowns
  chefs: any;
  foods: any;
  services: any;


  // Form data model
  formData: any = {
    UserId: 1, // This should come from login in real app
    ChefId: null,
    FoodId: null,
    ServiceId: null,
    BookingDate: '',
    NumberOfGuests: 1,
    TimeSlot: ''
  };

  constructor(private _url: URLService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    var routing = this.route.params.subscribe(params => {
      this.ID = +params['chefId'];
      this.CategoryID = +params['categoryId'];
      this.loadFoods(this.ID, this.CategoryID);
    });
    this.loadChefs();
    this.loadServices();
    this.loadFoods(this.ID, this.CategoryID);
  }

  // Load dropdown data
  loadChefs(): void {
    this._url.getAllChefs().subscribe(data => {
      this.chefs = data;
    });
  }

  loadServices(): void {
    this._url.getAllServices().subscribe(data => {
      this.services = data;
    });
  }

  loadFoods(cID: number, CategoryID: number): void {
    this._url.getAllFoods(cID, CategoryID).subscribe(data => {
      this.foods = data;
    });
  }

  // Increment guest count
  incrementGuests(): void {
    if (this.guests < 20) {
      this.guests++;
      this.formData.NumberOfGuests = this.guests;
    }
  }

  // Decrement guest count
  decrementGuests(): void {
    if (this.guests > 1) {
      this.guests--;
      this.formData.NumberOfGuests = this.guests;
    }
  }

  // Submit form
  //onSubmit(data: any): void {
  //  const dataToSend = new FormData();
  //  dataToSend.append("UserId", data.UserId);
  //  dataToSend.append("ChefId", data.ChefId);
  //  dataToSend.append("FoodId", data.FoodId);
  //  dataToSend.append("ServiceId", data.ServiceId);
  //  dataToSend.append("BookingDate", data.BookingDate);
  //  dataToSend.append("NumberOfGuests", data.NumberOfGuests.toString());
  //  dataToSend.append("TimeSlot", data.TimeSlot);

  //  this._url.addBook(dataToSend).subscribe(() => {
  //    alert('Booking request submitted! We will contact you shortly to confirm details.');
  //    this.resetForm();
  //  });
  //}
  onSubmit(data: any) {
    const formData = new FormData();
    formData.append("BookingDate", this.formData.BookingDate);
    formData.append("ChefId", this.formData.ChefId);
    formData.append("TimeSlot", this.formData.TimeSlot);
    formData.append("NumberOfGuests", this.formData.NumberOfGuests);
    formData.append("Location", this.formData.Location);

    this._url.addBook(formData).subscribe({
      next: () => {
        alert('Booking request submitted! We will contact you shortly to confirm details.');
      },
      error: (err) => {
        console.error('Error during booking:', err);
        alert('Something went wrong. Please try again.');
      }
    });
  }

  // Optional: reset form after submission
  resetForm(): void {
    this.guests = 1;
    this.formData = {
      UserId: 1, // keep UserId
      ChefId: null,
      FoodId: null,
      ServiceId: null,
      BookingDate: '',
      NumberOfGuests: 1,
      TimeSlot: ''
    };
  }
}
