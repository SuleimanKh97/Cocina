import { Component } from '@angular/core';
import { SallyServiceService } from '../sally-service.service';
import { loginUserDTO } from '../loginUserDTO';
declare var google: any;

@Component({

  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})

export class SignInComponent {


  email: string = '';
  password: string = '';
  private googleInitialized = false;

  constructor(private sallyService: SallyServiceService) { }

  ngOnInit() {
    if (typeof google === 'undefined') {
      this.loadGoogleScript();
    } else {
      this.initializeGoogleButton();
    }
  }

  loadGoogleScript() {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('Google library loaded successfully');
      this.initializeGoogleButton();
    };
    script.onerror = (error) => {
      console.error('Failed to load Google library', error);
    };
    document.head.appendChild(script);
  }

  initializeGoogleButton() {
    try {
      google.accounts.id.initialize({
        client_id: '314461196829-kjsh2vunru3apb1hh1b7ofna265ok3q0.apps.googleusercontent.com',
        callback: (response: any) => {
          if (response && response.credential) {
            this.handleGoogleResponse(response);
          } else {
            console.error('Invalid Google response:', response);
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true
      });

      google.accounts.id.renderButton(
        document.getElementById('googleSignInContainer'),
        {
          type: 'icon',
          size: 'large', // للحصول على أيقونة كبيرة واضحة
          theme: 'outline', // تصميم أنيق
          shape: 'circle'
        }
      );
    } catch (error) {
      console.error('Google Sign-In initialization error:', error);
    }
  }

  handleGoogleResponse(response: any) {
    const token = response.credential;
    this.sallyService.googleLogin(token).subscribe({
      next: (res) => {
        console.log('Login success', res);
        alert('تم تسجيل الدخول بنجاح!');
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('فشل تسجيل الدخول: ' + err.message);
      }
    });
  }

  onLogin() {
    if (!this.email || !this.password) {
      alert('Please enter both email and password');
      return;
    }

    const user: loginUserDTO = {
      email: this.email.trim(),
      password: this.password
    };

    this.sallyService.login(user).subscribe({
      next: (response) => {
        if (response.status === 200) {
          alert('Login Successful!');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        if (err.status === 404) {
          alert('User not found.');
        } else if (err.status === 400) {
          alert('Invalid email or password.');
        } else {
          alert('An error occurred. Please try again later.');
        }
      }
    });
  }

  



}
