import { Component } from '@angular/core';
import { URLService } from '../../Sajeda/url.service';
import { UrlserviceService } from '../../Ammar/urlservice.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-chefs',
  standalone: false,
  templateUrl: './chefs.component.html',
  styleUrl: './chefs.component.css'
})
export class ChefsComponent {
  selectedChef: any = {}; // ✅ Add this line

  constructor(
    private TheService: UrlserviceService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getAllChefs();
  }

  allchefs: any
  getAllChefs() {
    this.TheService.getAllChefs().subscribe((data) => {
      this.allchefs = data;
    });
  }

  addCheff(data: any) {
    this.TheService.addChef(data).subscribe(() => {
      this.alertService.success("Chef added successfully");
      this.getAllChefs();
    });
  }

  editChef(id: number, data: any) {
    this.TheService.editChef(id, data).subscribe(() => {
      this.alertService.success("Chef updated successfully");
      this.getAllChefs();
    });
  }

  deleteChef(id: number) {
    this.alertService.confirm("Are you sure you want to delete this chef?").then(confirmed => {
      if (confirmed) {
        this.TheService.deleteChef(id).subscribe(() => {
          this.alertService.success("Chef deleted successfully");
          this.getAllChefs();
        });
      }
    });
  }

  openEditModal(chef: any) {
    this.selectedChef = { ...chef }; // this loads the selected chef into the edit modal
  }
}
