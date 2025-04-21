import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Profile component for user account management
 */
@Component({
    selector: 'app-ptofile',
    templateUrl: './ptofile.component.html',
    styleUrl: './ptofile.component.css',
    standalone: false
})
export class PtofileComponent implements OnInit {
    // User data
    userId: any | null = null;
    user: any = {};
    
    // Booking data
    bookingHistory: any[] = [];
    selectedBookingId: number | null = null;
    selectedBooking: any = null;
    
    // UI state
    showChangePasswordForm = false;
    showBookingHistory = false;
    showModal = false;
    passwordError = '';
    
    // Form data objects
    passwordData = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    };
    
    feedbackData = {
        rating: 0,
        comment: ''
    };

    constructor(
        private route: ActivatedRoute, 
        private api: ApiService, 
        private router: Router
    ) { }

    /**
     * Initialize component data
     */
    ngOnInit(): void {
        this.userId= Number(sessionStorage.getItem('userId'));
        if (this.userId) {
            this.loadUserData();
            this.loadBookingHistory();
        } else {
            console.error('No user ID found in session storage');
            // Redirect to login or handle appropriately
        }
    }

    /**
     * Load user profile data
     */
    loadUserData(): void {
        if (!this.userId) return;
        
        this.api.getUserById(this.userId).subscribe({
            next: (data: any) => {
                this.user = data;
            },
            error: (error: any) => {
                console.error('Error loading user data:', error);
            }
        });
    }

    /**
     * Load user booking history
     */
    loadBookingHistory(): void {
        if (!this.userId) return;
        
        this.api.getUserBookingHistory(this.userId).subscribe({
            next: (data: any) => {
                this.bookingHistory = data;
            },
            error: (error: any) => {
                if (error.status === 404) {
                    this.bookingHistory = [];
                } else {
                    console.error('Error loading booking history:', error);
                }
            }
        });
    }

    /**
     * Navigate to edit profile page
     */
    navigateToEdit(): void {
        this.router.navigate(['edit-profile', this.userId]);
    }

    /**
     * Toggle password change form visibility
     */
    toggleChangePasswordForm(): void {
        this.showChangePasswordForm = !this.showChangePasswordForm;
        
        // Reset form when toggling
        if (this.showChangePasswordForm) {
            this.passwordData = {
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            };
            this.passwordError = '';
        }
    }

    /**
     * Process password change request
     */
    changePassword(): void {
        // Validate passwords match
        if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
            this.passwordError = 'New password and confirmation do not match.';
            return;
        }
        
        // Validate password not empty
        if (!this.passwordData.newPassword || !this.passwordData.currentPassword) {
            this.passwordError = 'Please enter all required fields.';
            return;
        }

        const passwordChangeRequest = {
            currentPassword: this.passwordData.currentPassword,
            newPassword: this.passwordData.newPassword
        };

        this.api.changePassword(passwordChangeRequest, this.userId).subscribe({
            next: () => {
                alert('Password changed successfully.');
                this.toggleChangePasswordForm();
            },
            error: (error) => {
                this.passwordError = 'Failed to change password. Please check your current password.';
                console.error('Error changing password:', error);
            }
        });
    }

    /**
     * Open the feedback form for a booking
     */
    submitFeedback(booking: any): void {
        this.selectedBooking = booking;
        this.selectedBookingId = booking.id;
        
        // Reset feedback form data
        this.feedbackData = { 
            rating: 0, 
            comment: '' 
        };
        
        this.showModal = true;
    }

    /**
     * Close the feedback modal
     */
    closeModal(): void {
        this.showModal = false;
        this.selectedBooking = null;
    }

    /**
     * Submit feedback to the server
     */
    submitFeedbackToServer(): void {
        // Validate required fields
        if (!this.feedbackData.rating || !this.feedbackData.comment) {
            alert('Please provide both rating and comment.');
            return;
        }
        
        if (this.selectedBookingId) {
            const feedback = {
                bookingId: this.selectedBookingId,
                rating: this.feedbackData.rating,
                comment: this.feedbackData.comment,
            };

            this.api.submitFeedback(feedback).subscribe({
                next: (response: any) => {
                    alert(response.message || 'Feedback submitted successfully');
                    this.closeModal();
                },
                error: (err) => {
                    console.error('Error submitting feedback:', err);
                    alert('Failed to submit feedback. Please try again.');
                }
            });
        }
    }

    /**
     * Toggle booking history section visibility
     */
    toggleBookingHistory(): void {
        this.showBookingHistory = !this.showBookingHistory;
    }
}
