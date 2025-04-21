import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userIdSubject = new BehaviorSubject<string | null>(null);
    public userId$: Observable<string | null> = this.userIdSubject.asObservable();

    private isAdminSubject = new BehaviorSubject<boolean>(false);
    public isAdmin$: Observable<boolean> = this.isAdminSubject.asObservable();

    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

    constructor(private router: Router) {
        // Initialize on construction
        this.checkAuthState();

        // Monitor session storage changes from other tabs/windows
        window.addEventListener('storage', (event) => {
            if (event.key === 'userId' || event.key === null) {
                this.checkAuthState();
            }
        });
    }

    /**
     * Check the current authentication state from session storage
     */
    checkAuthState(): void {
        const userId = sessionStorage.getItem('userId');

        console.log('AuthService - checkAuthState - userId:', userId);

        this.userIdSubject.next(userId);
        this.isLoggedInSubject.next(!!userId);
        this.isAdminSubject.next(userId === "-1");
    }

    /**
     * Login a user with the given userId
     */
    login(userId: string): void {
        console.log('AuthService - login - userId:', userId);

        sessionStorage.setItem('userId', userId);

        // Update subjects
        this.userIdSubject.next(userId);
        this.isLoggedInSubject.next(true);
        this.isAdminSubject.next(userId === "-1");

        // Navigate based on user type
        if (userId === "-1") {
            this.router.navigate(['/admin']);
        } else {
            this.router.navigate(['/']);
        }
    }

    /**
     * Logout the current user
     */
    logout(): void {
        console.log('AuthService - logout');

        // First update subjects to ensure UI updates immediately
        this.userIdSubject.next(null);
        this.isLoggedInSubject.next(false);
        this.isAdminSubject.next(false);

        // Then remove from session storage
        sessionStorage.removeItem('userId');

        // Navigate to home page
        this.router.navigate(['/']);
    }

    /**
     * Get the current userId
     */
    getCurrentUserId(): string | null {
        return this.userIdSubject.value;
    }

    /**
     * Check if the current user is an admin
     */
    isCurrentUserAdmin(): boolean {
        return this.isAdminSubject.value;
    }

    /**
     * Check if a user is currently logged in
     */
    isUserLoggedIn(): boolean {
        return this.isLoggedInSubject.value;
    }
} 