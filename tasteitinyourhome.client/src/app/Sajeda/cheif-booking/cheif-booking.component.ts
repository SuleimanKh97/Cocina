import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { URLService } from '../url.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

constructor(private _url: URLService, private route: ActivatedRoute, private router: Router) { }

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
  const { BookingDate, ChefId, CategoryID, ServiceId, FoodId, availableTimeSlots } = this.formData;

  console.log('--- onDateOrChefChange triggered ---');
  console.log('Raw BookingDate:', BookingDate, '| Type:', typeof BookingDate);
  console.log('Raw ChefId:', ChefId, '| Type:', typeof ChefId);
  console.log('Raw CategoryId:', CategoryID, '| Type:', typeof CategoryID);
  console.log('Raw ServiceId:', ServiceId, '| Type:', typeof ServiceId);
  console.log('Raw FoodId:', FoodId, '| Type:', typeof FoodId);
  console.log('Raw availableTimeSlots:', availableTimeSlots, '| Type:', typeof availableTimeSlots);
  this.loadFoods(ChefId, CategoryID)
  this.loadTimeSlot(ChefId, BookingDate);
  if (!BookingDate) {
    console.warn('⚠️ BookingDate is missing or invalid.');
  }
  if (!ChefId) {
    console.warn('⚠️ ChefId is missing or invalid.');
  }
  if (!CategoryID) {
    console.warn('⚠️ CategoryId is missing or not selected.');
  }
  if (!ServiceId) {
    console.warn('⚠️ ServiceId is missing or not selected.');
  }

  if (BookingDate && ChefId) {
    const formattedDate = new Date(BookingDate).toISOString().split('T')[0];
    console.log('Formatted BookingDate (YYYY-MM-DD):', formattedDate);

    this._url.getAvailability(ChefId, formattedDate).subscribe(
      (res) => {
        console.log(`API Response for ChefId=${ChefId} on ${formattedDate}:`, res);
        //debugger
        this.availableTimeSlots = res as string[];
      },
      (error) => {
        console.error('❌ Error fetching availability:', error);
      }
    );
  }
}





filterFoodsByChef(): void {
  const selectedChefId = this.formData.ChefId;
  if(selectedChefId) {
    this.filteredFoods = this.allFoods.filter(food => food.chefId === selectedChefId);
  } else {
    this.filteredFoods = [];
  }
}



// Increment guest count
incrementGuests(): void {
  if(this.guests < 20) {
  this.guests++;
  this.formData.NumberOfGuests = this.guests;
}
  }

// Decrement guest count
decrementGuests(): void {
  if(this.guests > 1) {
  this.guests--;
  this.formData.NumberOfGuests = this.guests;
}
  }

// Submit booking
  onSubmit(data: any): void {
    debugger
  const selectedFood = this.foods.find((food: any) => food.id === this.formData.FoodId);

  if(!selectedFood) {
    alert("Please select a valid food item.");
    return;
  }

    const pricePerGuest = selectedFood.price;
  const numberOfGuests = this.formData.NumberOfGuests;
  const amount = pricePerGuest * numberOfGuests;

  const bookingData = {
    chefId: this.formData.ChefId,
    userId: this.formData.UserId,
    date: this.formData.BookingDate,
    time: this.formData.TimeSlot,
    guests: numberOfGuests,
    foodId: this.formData.FoodId,
    serviceId: this.formData.ServiceId,
    location: this.formData.Location,
    amount: amount,
    notes: '' // You can add custom notes here
  };

  console.log('Navigating to payment with:', bookingData);

  // Navigate to payment and pass data
    this._url.addBook(data).subscribe(() => {
    alert("Booked Added")
  });
  this._url.setBookingData(bookingData);
  //this._url.addBook(data).subscribe(() => {
  //  alert("Booked Added")
  //});
  // We’ll define this next in the URLService
  // Or you could use router navigation with queryParams if preferred

  //this.router.navigate(['/userPayment']); // or the correct route for your payment component

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
