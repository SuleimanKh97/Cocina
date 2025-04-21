import { Component } from '@angular/core';
import { UrlserviceService } from '../../Ammar/urlservice.service';

@Component({
  selector: 'app-food',
  standalone: false,
  templateUrl: './food.component.html',
  styleUrl: './food.component.css'
})
export class FoodComponent {
  allFoods: any[] = [];
  selectedFood: any = {};

  constructor(private TheService: UrlserviceService) { }

  ngOnInit() {
    this.getAllFood();
  }

  allfood: any
  getAllFood() {
     this.TheService.getallFood().subscribe((data) => {
       this.allfood = data;
     })
  }

  addFood(data: any) {
     this.TheService.addFood(data).subscribe(() => {
       alert("Food added successfully");
       this.getAllFood();
     })
  }
  editFood(id: number, data: any) {
     this.TheService.editFood(id, data).subscribe(() => {
       alert("Food updated successfully");
       this.getAllFood();
     })
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
         }
       });
    }
  }

  openEditFoodModal(food: any) {
    this.selectedFood = { ...food }; // clone the food object
  }




}
