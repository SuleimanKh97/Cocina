import { Component, ViewEncapsulation } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {

  constructor(private alertService: AlertService) { }

  addCategory() {
    this.alertService.success('Category added successfully!');
  }

  updateCategory() {
    this.alertService.success('Category updated successfully!');
  }

  deleteCategory() {
    this.alertService.confirm('Are you sure you want to delete this category?').then(confirmed => {
      if (confirmed) {
        this.alertService.success('Category deleted successfully!');
      }
    });
  }
}
