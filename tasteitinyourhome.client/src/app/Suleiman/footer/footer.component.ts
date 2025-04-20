import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  private subscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log('FooterComponent - ngOnInit');
    // Subscribe to auth state changes
    this.subscription = this.authService.isAdmin$.subscribe(isAdmin => {
      console.log('FooterComponent - isAdmin update:', isAdmin);
      this.isAdmin = isAdmin;
      this.cdr.detectChanges();
    });

    // Force a check of auth state
    this.authService.checkAuthState();
  }

  ngOnDestroy() {
    console.log('FooterComponent - ngOnDestroy');
    // Clean up subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
