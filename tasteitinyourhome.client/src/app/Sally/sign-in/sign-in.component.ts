import { Component } from '@angular/core';
import { SallyServiceService } from '../sally-service.service';
import { loginUserDTO } from '../loginUserDTO';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

  constructor(private sallyService: SallyServiceService, private router: Router) { }

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
          size: 'large',
          theme: 'outline',
          shape: 'circle'
        }
      );

      google.accounts.id.prompt();
    } catch (error) {
      console.error('Google Sign-In initialization error:', error);
    }
  }

  handleGoogleResponse(response: any) {
    const token = response.credential;
    this.sallyService.googleLogin(token).subscribe({
      next: (res) => {
        console.log('Login success', res);
        Swal.fire({
          icon: 'success',
          title: 'تم تسجيل الدخول بنجاح!',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          this.router.navigate(['']);
        });
      },
      error: (err) => {
        console.error('Login failed', err);
        Swal.fire('فشل تسجيل الدخول', err.message, 'error');
      }
    });
  }

  onLogin() {
    if (!this.email || !this.password) {
      Swal.fire('خطأ!', 'يرجى إدخال البريد الإلكتروني وكلمة المرور', 'warning');
      return;
    }

    const user: loginUserDTO = {
      email: this.email.trim(),
      password: this.password
    };

    this.sallyService.login(user).subscribe({
      next: (response) => {
        if (response.status === 200) {
          const userId = response.body.userId;
          if (userId == 0) {
            this.router.navigate(['/dashboard']);
          }
          else {
            sessionStorage.setItem('userId', userId);

            Swal.fire({
              icon: 'success',
              title: 'تم تسجيل الدخول بنجاح!',
              showConfirmButton: false,
              timer: 2000
            }).then(() => {
              this.router.navigate(['/profile']);
            });
          }
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        if (err.status === 404) {
          Swal.fire('المستخدم غير موجود', '', 'error');
        } else if (err.status === 400) {
          Swal.fire('خطأ في البريد الإلكتروني أو كلمة المرور', '', 'error');
        } else {
          Swal.fire('حدث خطأ، حاول مرة أخرى لاحقًا', '', 'error');
        }
      }
    });
  }
}
