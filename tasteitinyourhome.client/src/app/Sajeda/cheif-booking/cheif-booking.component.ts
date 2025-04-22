import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { URLService } from '../url.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-cheif-booking',
  standalone: false,
  templateUrl: './cheif-booking.component.html',
  styleUrl: './cheif-booking.component.css'
})
export class CheifBookingComponent {
  guests: number = 1;
  ID: any;
  CategoryID: any;
  Category: any;

  // Data for dropdowns
  chefs: any = [];
  foods: any = [];
  services: any = [];
  filteredFoods: any[] = [];
  allFoods: any[] = [];
  categories: any = [];
  availableTimeSlots: string[] = [];
  TimeSlot: any;
  // Form data model
  formData: any = {
    UserId: 1, // Should come from login
    ChefId: null,
    FoodId: null,
    ServiceId: null,
    CategoryID: null,
    BookingDate: '',
    NumberOfGuests: 1,
    TimeSlot: '',
    Location: ''
  };

  constructor(
    private _url: URLService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ID = +params['chefId'];
      this.CategoryID = +params['CategoryID']
      this.TimeSlot = +params['TimeSlot'];

      // Initial data load
      this.loadChefs();
      this.loadCategory();
      this.loadFoods(this.ID, this.CategoryID);
      //this.loadServicesByChef(this.ID);
      this.loadService();
      this.loadTimeSlot(this.ID, this.TimeSlot);
    });
  }

  // Load all chefs
  loadChefs(): void {
    this._url.getAllChefs().subscribe(data => {
      this.chefs = data;
    });
  }

  // Load foods by chef and category
  loadFoods(chefId: number, categoryId: number): void {
    this._url.getAllFoods(chefId, categoryId).subscribe(data => {
      this.foods = data;
      //console.log("data : ");
    });

  }


  loadTimeSlot(chefId: number, date: string) {
    this._url.getAvailability(chefId, date).subscribe((data) => {
      this.TimeSlot = data;
    });
  }

  loadService() {
    this._url.getAllServices().subscribe((data) => {
      this.services = data;
    })
  }

  loadCategory() {
    this._url.getAllCategorires().subscribe((data) => {
      this.Category = data;

    })
  }


  onDateOrChefChange() {
    const { BookingDate, ChefId, CategoryID } = this.formData;

    console.log('onDateOrChefChange triggered:');
    console.log('- BookingDate:', BookingDate);
    console.log('- ChefId:', ChefId);
    console.log('- CategoryID:', CategoryID);

    // Load foods based on chef and category
    if (ChefId && CategoryID) {
      this.loadFoods(ChefId, CategoryID);
    }

    // Load time slots based on chef and date
    if (BookingDate && ChefId) {
      try {
        // Ensure BookingDate is properly formatted for the API
        let formattedDate = BookingDate;
        if (typeof BookingDate === 'string') {
          formattedDate = BookingDate.split('T')[0]; // In case there's a time component
        }

        console.log('Requesting availability with formatted date:', formattedDate);

        this._url.getAvailability(ChefId, formattedDate).subscribe({
          next: (res) => {
            console.log('Available time slots:', res);
            this.availableTimeSlots = res as string[];

            // Clear the selected time slot if it's no longer available
            if (this.formData.TimeSlot && !this.availableTimeSlots.includes(this.formData.TimeSlot)) {
              this.formData.TimeSlot = '';
            }
          },
          error: (error) => {
            console.error('Error fetching availability:', error);
            this.availableTimeSlots = [];
          }
        });
      } catch (error) {
        console.error('Error in date formatting:', error);
        this.availableTimeSlots = [];
      }
    } else {
      // Clear time slots if either chef or date is missing
      this.availableTimeSlots = [];
    }
  }





  filterFoodsByChef(): void {
    const selectedChefId = this.formData.ChefId;
    if (selectedChefId) {
      this.filteredFoods = this.allFoods.filter(food => food.chefId === selectedChefId);
    } else {
      this.filteredFoods = [];
    }
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

  // Submit booking
  onSubmit(data: any): void {
    // Validate required fields
    if (!this.formData.ChefId || !this.formData.FoodId || !this.formData.ServiceId ||
      !this.formData.BookingDate || !this.formData.TimeSlot || !this.formData.Location) {
      this.alertService.warning("Please fill in all required fields");
      return;
    }

    const selectedFood = this.foods.find((food: any) => food.id == this.formData.FoodId);

    if (!selectedFood) {
      this.alertService.warning("Please select a valid food item.");
      return;
    }

    const pricePerGuest = selectedFood.price;
    const numberOfGuests = this.formData.NumberOfGuests;
    const amount = pricePerGuest * numberOfGuests;

    const bookingData = {
      chefId: this.formData.ChefId,
      userId: this.formData.UserId,
      foodId: this.formData.FoodId,
      serviceId: this.formData.ServiceId,
      bookingDate: this.formData.BookingDate,
      numberOfGuests: this.formData.NumberOfGuests,
      timeSlot: this.formData.TimeSlot,
      location: this.formData.Location,
      amount: amount,
      notes: ''
    };

    console.log('Booking data being submitted:', bookingData);

    // Store booking
    this._url.addBook(bookingData).subscribe({
      next: (response) => {
        this.alertService.success("Booking Added Successfully");
        // Set booking data for future use
        this._url.setBookingData(bookingData);
        this.router.navigate(['/userPayment']);
      },
      error: (error) => {
        console.error('Error adding booking:', error);
        this.alertService.error("Error adding booking. Please try again.");
      }
    });
  }


  // Reset form to initial state
  resetForm(): void {
    this.guests = 1;
    this.formData = {
      UserId: 1,
      ChefId: null,
      FoodId: null,
      ServiceId: null,
      BookingDate: '',
      NumberOfGuests: 1,
      TimeSlot: '',
      Location: ''
    };
    this.availableTimeSlots = [];
    this.foods = [];
    this.services = [];
  }
}
