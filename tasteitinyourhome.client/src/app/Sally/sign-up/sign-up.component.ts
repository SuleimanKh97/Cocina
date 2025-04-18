import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SallyServiceService } from '../sally-service.service';
import { addUserDTO } from '../addUserDTO';


@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  registerForm: FormGroup;
  selectedFile: File | null = null; // ✅ هنا تعريف المتغير

  constructor(private fb: FormBuilder, private sallyService: SallyServiceService) {
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
      },
      error: (error) => {
        console.error('Registration failed:', error);
      }
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }


  

}
