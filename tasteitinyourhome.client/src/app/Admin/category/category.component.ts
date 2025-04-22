import { Component } from '@angular/core';
import { UrlserviceService } from '../../Ammar/urlservice.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  constructor(
    private TheService: UrlserviceService,
    private alertService: AlertService
  ) { }

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
      this.alertService.success("Category added successfully");
      this.getAllCategories();
    })
  }
  editCategory(id: number, data: any) {
    this.TheService.editCategory(id, data).subscribe(() => {
      this.alertService.success("Category updated successfully");
      this.getAllCategories();
    })
  }

  deleteCategory(id: number) {
    this.alertService.confirm("Are you sure you want to delete this category?").then(confirmed => {
      if (confirmed) {
        this.TheService.deleteCategory(id).subscribe(() => {
          this.alertService.success("Category deleted successfully");
          this.getAllCategories();
        });
      }
    });
  }

  selectCategory(category: any) {
    this.selectedCategory = { ...category }; // use spread here, in TypeScript, NOT in HTML
  }


}
