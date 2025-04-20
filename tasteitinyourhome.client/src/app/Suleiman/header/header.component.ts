import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SondosComponent } from '../../Sondos/sondos/sondos.component';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  userId: string | null = null;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log('HeaderComponent - ngOnInit');
    // Subscribe to auth state changes
    this.subscriptions.push(
      this.authService.userId$.subscribe(userId => {
        console.log('HeaderComponent - userId update:', userId);
        this.userId = userId;
        this.cdr.detectChanges();
      }),

      this.authService.isLoggedIn$.subscribe(isLoggedIn => {
        console.log('HeaderComponent - isLoggedIn update:', isLoggedIn);
        this.isLoggedIn = isLoggedIn;
        this.cdr.detectChanges();
      }),

      this.authService.isAdmin$.subscribe(isAdmin => {
        console.log('HeaderComponent - isAdmin update:', isAdmin);
        this.isAdmin = isAdmin;
        this.cdr.detectChanges();
      })
    );

    // Force a check of auth state
    this.authService.checkAuthState();
  }

  ngOnDestroy() {
    console.log('HeaderComponent - ngOnDestroy');
    // Clean up subscriptions to prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  logout() {
    console.log('HeaderComponent - logout');
    this.authService.logout();
  }
}
