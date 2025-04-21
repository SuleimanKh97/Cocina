 import { Component } from '@angular/core';
import { URLService } from '../../Sajeda/url.service';
import { UrlserviceService } from '../../Ammar/urlservice.service';

@Component({
  selector: 'app-chefs',
  standalone: false,
  templateUrl: './chefs.component.html',
  styleUrl: './chefs.component.css'
})
export class ChefsComponent {
  selectedChef: any = {}; // ✅ Add this line

  constructor(private TheService: UrlserviceService) { }

  ngOnInit() {
    this.getAllChefs();

  }

  allchefs: any
  getAllChefs() {
    this.TheService.getAllChefs().subscribe((data) => {
      this.allchefs = data;

    })
  }
  
  addCheff(data: any) {
    this.TheService.addChef(data).subscribe(() => {
      alert("Chef added successfully");
      this.getAllChefs();
    })


  }

  editChef(id: number, data: any) {
    this.TheService.editChef(id, data).subscribe(() => {
      alert("Chef updated successfully");
      this.getAllChefs();
    })
  }

  deleteChef(id: number) {
    const confirmed = confirm('Are you sure you want to delete this chef?');
    if (confirmed) {
      this.TheService.deleteChef(id).subscribe({
        next: () => {
          alert("Chef deleted successfully");
          this.getAllChefs(); // Refresh the list
        },
        error: (err) => {
          console.error('Error deleting chef:', err);
        }
      });
    }
  }



  

  openEditModal(chef: any) {
    this.selectedChef = { ...chef }; // this loads the selected chef into the edit modal
  }





  
}
