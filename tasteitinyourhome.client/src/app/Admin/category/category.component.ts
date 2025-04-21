import { Component } from '@angular/core';
import { UrlserviceService } from '../../Ammar/urlservice.service';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  constructor(private TheService: UrlserviceService) { }

  selectedCategory: any = {}; // ✅ Add this line


  ngOnInit() {
    this.getAllCategories();
  }



  allCategories: any;
  getAllCategories() {
    this.TheService.getallcategory().subscribe((data) => {
      this.allCategories = data;
    })
  }
  addCategory(data: any) {
    this.TheService.addCategory(data).subscribe(() => {
      alert("Category added successfully");
      this.getAllCategories();
    })
  }
  editCategory(id: number, data: any) {
    this.TheService.editCategory(id, data).subscribe(() => {
      alert("Category updated successfully");
      this.getAllCategories();
    })
  }

  deleteCategory(id: number) {
    const confirmed = confirm('Are you sure you want to delete this category?');
    if (confirmed) {
      this.TheService.deleteCategory(id).subscribe({
        next: () => {
          alert("Category deleted successfully");
          this.getAllCategories(); // Refresh the list
        },
        error: (err) => {
          console.error('Error deleting category:', err);
        }
      });
    }
  }

  selectCategory(category: any) {
    this.selectedCategory = { ...category }; // use spread here, in TypeScript, NOT in HTML
  }


}
