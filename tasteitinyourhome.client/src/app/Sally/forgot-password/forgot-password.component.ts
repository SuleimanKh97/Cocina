import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordResetServiceService } from '../password-reset-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {


  currentStep = 1;
  userEmail = '';
  isLoading = false;
  errorMessage = '';

  // Forms
  emailForm: FormGroup;
  otpForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private passwordResetService: PasswordResetServiceService,
    private router: Router
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });

    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  submitEmail() {
    if (this.emailForm.invalid) return;

    this.isLoading = true;
    const email = this.emailForm.value.email;

    this.passwordResetService.sendResetCode(email).subscribe({
      next: () => {
        this.userEmail = email;
        this.currentStep = 2;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to send verification code';
        this.isLoading = false;
      }
    });
  }

  submitOtp() {
    if (this.otpForm.invalid) return;

    this.isLoading = true;
    const code = this.otpForm.value.code;

    this.passwordResetService.verifyResetCode(this.userEmail, code).subscribe({
      next: () => {
        this.currentStep = 3;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Invalid verification code';
        this.isLoading = false;
      }
    });
  }

  submitNewPassword() {
    if (this.passwordForm.invalid) return;

    this.isLoading = true;
    const newPassword = this.passwordForm.value.newPassword;

    this.passwordResetService.resetPassword(this.userEmail, newPassword).subscribe({
      next: () => {
        this.currentStep = 4;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to reset password';
        this.isLoading = false;
      }
    });
  }

  resendCode() {
    this.passwordResetService.sendResetCode(this.userEmail).subscribe({
      next: () => {
        // Show success message
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to resend code';
      }
    });
  }

  backToLogin() {
    this.router.navigate(['/Login']);
  }

}
