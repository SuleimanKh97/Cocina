import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-ptofile',
    templateUrl: './ptofile.component.html',
    styleUrl: './ptofile.component.css',
    standalone: false
})
export class PtofileComponent {

    constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }


    userId: any;
    user: any = {};
    bookingHistory: any[] = [];
    showChangePasswordForm = false;
    passwordError = '';
    showModal = false;
    selectedBookingId: number | null = null;
    selectedBooking: any = null;

    passwordData = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    };
    
    feedbackData = {
        rating: 0,
        comment: ''
    };

    ngOnInit() {

        this.userId = sessionStorage.getItem('userId');
        this.loadUserData();
        this.loadBookingHistory();
      

    }

    loadUserData(): void {
        console.log('Trying to call getUserById with:', this.userId);
        this.api.getUserById(this.userId).subscribe(
            (data: any) => {
                this.user = data;
            },
            (error: any) => {
                console.error('Error loading user data:', error);
            }
        );
    }

    loadBookingHistory(): void {
        console.log('Trying to call getUserById with:', this.userId);
        this.api.getUserBookingHistory(this.userId).subscribe(
            (data: any) => {
                this.bookingHistory = data;
            },
            (error: any) => {
                if (error.status === 404) {
                    this.bookingHistory = [];
                } else {
                    console.error('Error loading booking history:', error);
                }
            }
        );
    }
    //submitFeedback(booking: any): void {
    //    this.api.submitFeedback(booking.id).subscribe({
    //        next: (response) => {
    //            console.log('Feedback submitted successfully', response);
              
    //        },
    //        error: (error) => {
    //            console.error('Error submitting feedback', error);
    //        }
    //    });
    //}


    navigateToEdit(): void {
        this.router.navigate(['edit-profile', this.userId]);
    }

    toggleChangePasswordForm(): void {
        this.showChangePasswordForm = !this.showChangePasswordForm;
        this.passwordData = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        };
        this.passwordError = '';
    }

    changePassword(): void {
        if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
            this.passwordError = 'New password and confirmation do not match.';
            return;
        }
        console.log('Current:', this.passwordData.currentPassword);
        console.log('New:', this.passwordData.newPassword);
        console.log('UserId:', this.userId);

        var passwordChangeRequest = {
            currentPassword: this.passwordData.currentPassword,
            newPassword: this.passwordData.newPassword
        };

        this.api.changePassword(passwordChangeRequest, this.userId).subscribe(
            () => {
                alert('Password changed successfully.');
                this.toggleChangePasswordForm();
            },
            (error) => {
                this.passwordError = 'Failed to change password. Please check your current password.';
                console.error('Error changing password:', error);
            }
        );
    }


   

    openFeedbackModal(booking: any) {
        this.selectedBookingId = booking.id;
        this.feedbackData = { rating: 0, comment: '' };
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }


    
    submitFeedback(booking: any) {
        this.selectedBooking = booking;
        this.selectedBookingId = booking.id;
        this.showModal = true;
    }
    submitFeedbackToServer() {
        if (this.api && this.feedbackData.rating && this.feedbackData.comment) {
            const feedback = {
                bookingId: this.selectedBookingId,
                    rating: this.feedbackData.rating,
                comment: this.feedbackData.comment,
                };

                this.api.submitFeedback(feedback).subscribe({
                    next: (response: any) => alert(response.message),
                    error: (err) => console.error('Error submitting feedback:', err)
                });
            console.log('Feedback submitted for:', this.selectedBooking);
            console.log('Rating:', this.feedbackData.rating);
            console.log('Comment:', this.feedbackData.comment);

            // إغلاق المودال وتنظيف البيانات
            this.showModal = false;
            this.feedbackData = { rating: 0, comment: '' };
            this.selectedBooking = null;
        }
    }


}
