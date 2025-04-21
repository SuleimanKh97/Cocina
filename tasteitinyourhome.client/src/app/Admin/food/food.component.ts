import { Component } from '@angular/core';
import { UrlserviceService } from '../../Ammar/urlservice.service';

@Component({
  selector: 'app-food',
  standalone: false,
  templateUrl: './food.component.html',
  styleUrl: './food.component.css'
})
export class FoodComponent {
  allfood: any[] = [];
  allCategories: any[] = [];
  allchefs: any[] = [];
  selectedFood: any = {};

  constructor(private TheService: UrlserviceService) { }

  ngOnInit() {
    this.getAllFood();
    this.getAllChefs();
    this.getAllCategories();
  }

  getAllCategories() {
    this.TheService.getallcategory().subscribe({
      next: (data: any) => {
        this.allCategories = data;
        console.log('Categories loaded:', this.allCategories);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  getAllChefs() {
    this.TheService.getAllChefs().subscribe({
      next: (data: any) => {
        this.allchefs = data;
        console.log('Chefs loaded:', this.allchefs);
      },
      error: (err) => {
        console.error('Error loading chefs:', err);
      }
    });
  }

  getAllFood() {
    this.TheService.getallFood().subscribe({
      next: (data: any) => {
        this.allfood = data;
        console.log('Foods loaded:', this.allfood);
      },
      error: (err) => {
        console.error('Error loading foods:', err);
      }
    });
  }

  addFood(data: any) {
    console.log('Adding food with data:', data);

    // Convert price to number if it's a string
    if (data.price && typeof data.price === 'string') {
      data.price = parseFloat(data.price);
    }

    // Convert categoryId and chefId to numbers if they're strings
    if (data.categoryId && typeof data.categoryId === 'string') {
      data.categoryId = parseInt(data.categoryId, 10);
    }

    if (data.chefId && typeof data.chefId === 'string') {
      data.chefId = parseInt(data.chefId, 10);
    }

    this.TheService.addFood(data).subscribe({
      next: () => {
        alert("Food added successfully");
        this.getAllFood();
      },
      error: (err) => {
        console.error('Error adding food:', err);
        alert(`Error adding food: ${err.message || 'Unknown error'}`);
      }
    });
  }

  editFood(id: number, data: any) {
    console.log('Editing food with ID:', id, 'Data:', data);

    // Convert price to number if it's a string
    if (data.price && typeof data.price === 'string') {
      data.price = parseFloat(data.price);
    }

    this.TheService.editFood(id, data).subscribe({
      next: () => {
        alert("Food updated successfully");
        this.getAllFood();
      },
      error: (err) => {
        console.error('Error updating food:', err);
        alert(`Error updating food: ${err.message || 'Unknown error'}`);
      }
    });
  }

  deleteFood(id: number) {
    const confirmed = confirm('Are you sure you want to delete this food?');
    if (confirmed) {
      this.TheService.deleteFood(id).subscribe({
        next: () => {
          alert("Food deleted successfully");
          this.getAllFood(); // Refresh the list
        },
        error: (err) => {
          console.error('Error deleting food:', err);
          alert(`Error deleting food: ${err.message || 'Unknown error'}`);
        }
      });
    }
  }

  openEditFoodModal(food: any) {
    this.selectedFood = { ...food }; // clone the food object
  }
}
