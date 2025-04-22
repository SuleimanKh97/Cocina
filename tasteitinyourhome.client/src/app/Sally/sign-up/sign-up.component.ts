import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SallyServiceService } from '../sally-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  registerForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private sallyService: SallyServiceService, private router: Router, private alertService: AlertService) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: [''],
      address: [''],
      image: [null]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      Swal.fire('خطأ!', 'يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('fullName', this.registerForm.get('fullName')?.value);
    formData.append('email', this.registerForm.get('email')?.value);
    formData.append('password', this.registerForm.get('password')?.value);
    formData.append('phoneNumber', this.registerForm.get('phoneNumber')?.value);
    formData.append('address', this.registerForm.get('address')?.value);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.sallyService.register(formData).subscribe({
      next: (response) => {
        console.log('User registered successfully:', response);
        Swal.fire({
          icon: 'success',
          title: 'تم إنشاء الحساب بنجاح!',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          this.router.navigate(['/Login']);
        });
        this.alertService.success('Registration successful!');
      },
      error: (error) => {
        console.error('Registration failed:', error);
        Swal.fire('فشل التسجيل', 'حدث خطأ أثناء إنشاء الحساب، حاول لاحقاً', 'error');
      }
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

}
