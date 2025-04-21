import { Component } from '@angular/core';
import { SaraService, Service, Feedback as FeedbackModel } from '../../Sarah/sara.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service',
  standalone: false,
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent {

  selectedService: any = {
    id: 0,
    Name: '',
    Description: '',
    ImageUrl: ''
  };

  services: any = [];
  bookings: any = [];
  payments: any = [];
  contactMessages: any = [];
  feedbacks: any = [];

  constructor(private saraService: SaraService) { }

  ngOnInit(): void {
    this.loadServices();
   
  }

  loadServices(): void {
    this.saraService.getAllServices().subscribe({
      next: (data :any) => {
        this.services = data;
        console.log('Services loaded:', this.services);
      },
      error: (error:any) => {
        console.error('Error loading services:', error);
      }
    });
  }



  // Form handling methods
  addServiceFromForm(form: NgForm, fileInput: HTMLInputElement): void {
    if (form.valid && fileInput.files && fileInput.files.length > 0) {
      const formData = new FormData();

      formData.append('Name', form.value.title);
      formData.append('Description', form.value.description);

      formData.append('ImageUrl', fileInput.files[0]);

      this.saraService.addService(formData).subscribe({
        next: () => {
          console.log('Service added successfully');
          // Close modal and reset form
          form.resetForm();
          fileInput.value = '';
          document.getElementById('addServiceModal')?.dispatchEvent(new Event('click'));
          // Reload services
          this.loadServices();
        },
        error: (error) => {
          console.error('Error adding service:', error);
        }
      });
    } else {
      console.error('Form is invalid or no image selected');
    }
  }

  // For opening edit modal with service data
  selectServiceToEdit(service: Service): void {
    // This method would be called when clicking the edit button
    this.selectedService = {
      id: service.id,
      Name: service.name,
      Description: service.description,
      ImageUrl: service.image
    };

  }

  updateServiceFromForm(form: NgForm, fileInput: HTMLInputElement): void {

    const serviceId = this.selectedService?.id;

    console.log('Editing service with ID:', serviceId); // أضيفي هذا السطر للتأكد

    // تأكدي إنه فعلاً موجود
    if (!serviceId) {
      console.error("Service ID is missing!");
      return;
    }
    if (form.valid) {
      const formData = new FormData();


      formData.append('Id', serviceId.toString());
      formData.append('Name', form.value.Name);
      formData.append('Description', form.value.Description);
      formData.append('ImageUrl', form.value.ImageUrl);

      this.saraService.updateService(serviceId, formData).subscribe({
        next: () => {
          console.log('Service updated successfully');
          // Close modal and reset form
          form.resetForm();
          fileInput.value = '';
          document.getElementById('editServiceModal')?.dispatchEvent(new Event('click'));
          // Reload services
          this.loadServices();
        },
        error: (error) => {
          console.error('Error updating service:', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }



  deleteService(id: number): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.saraService.deleteService(id).subscribe({
        next: (response) => {
          console.log('Response:', response);
          if (response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: "Deleted successfully",
              confirmButtonColor: '#3085d6'
            });
            this.loadServices();
          }
        },
        error: (error :any) => {
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: typeof error.error === 'string' ? error.error : error.error?.message || 'An unexpected error occurred',
            confirmButtonColor: '#d33'
          });
        }
      });
    }
  }












}
