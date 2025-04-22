import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

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
        private router: Router,
        private alertService: AlertService
    ) { }

    /**
     * Initialize component data
     */
    ngOnInit(): void {
        this.userId = Number(sessionStorage.getItem('userId'));
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
     * Format date string to a user-friendly format
     */
    formatDate(dateString: string): string {
        if (!dateString) return '';

        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                // If date parsing fails, try to parse the string manually
                // This handles formats like "yyyy-MM-dd"
                if (dateString.includes('-')) {
                    const [year, month, day] = dateString.split('-').map(Number);
                    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
                        return new Date(year, month - 1, day).toLocaleDateString();
                    }
                }
                return dateString; // Return original if parsing fails
            }
            return date.toLocaleDateString();
        } catch (error) {
            console.error('Error formatting date:', error);
            return dateString;
        }
    }

    /**
     * Load user booking history with proper date formatting
     */
    loadBookingHistory(): void {
        if (!this.userId) return;

        this.api.getUserBookingHistory(this.userId).subscribe({
            next: (data: any) => {
                console.log('Raw booking history data:', data);

                if (!data || data.length === 0) {
                    console.log('No booking data received from server');
                    this.bookingHistory = [];
                    return;
                }

                // Log all status values to help with debugging
                console.log('All booking statuses:');
                data.forEach((booking: any) => {
                    console.log(`Booking #${booking.id}: Status = "${booking.status}" (${typeof booking.status})`);
                });

                // Ensure dates are properly formatted and normalize status strings
                this.bookingHistory = data.map((booking: any) => {
                    // Make a copy of the booking and ensure status is a string
                    const processedBooking = { ...booking };

                    // Ensure status is a string
                    if (processedBooking.status === null || processedBooking.status === undefined) {
                        processedBooking.status = 'Unknown';
                    }

                    // Convert status to string if it's not already
                    processedBooking.status = String(processedBooking.status);

                    // Normalize the status string to handle case inconsistencies
                    processedBooking.normalizedStatus = processedBooking.status.toLowerCase().trim();

                    // Add formatted date
                    processedBooking.formattedDate = this.formatDate(booking.bookingDate);

                    return processedBooking;
                });

                console.log('Processed booking history:', this.bookingHistory);
            },
            error: (error: any) => {
                if (error.status === 404) {
                    console.log('404 error - No bookings found');
                    this.bookingHistory = [];
                } else {
                    console.error('Error loading booking history:', error);
                    this.alertService.error('Failed to load booking history. Please try again later.');
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
                this.alertService.success('Password changed successfully.');
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
        // Verifica el estado del booking antes de permitir enviar feedback
        if (booking.status !== 'Completed' && booking.status !== 'Accepted' &&
            booking.normalizedStatus !== 'completed' && booking.normalizedStatus !== 'accepted') {
            this.alertService.warning('Feedback can only be submitted for bookings with status "Completed" or "Accepted".');
            return;
        }

        this.selectedBooking = booking;
        this.selectedBookingId = booking.id;

        // Log del estado del booking para depuración
        console.log(`Opening feedback form for booking #${booking.id} with status: "${booking.status}"`);

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
            this.alertService.warning('Please provide both rating and comment.');
            return;
        }

        if (!this.selectedBookingId) {
            this.alertService.error('No booking selected for feedback.');
            return;
        }

        // First check if feedback already exists for this booking
        this.api.checkFeedbackExists(this.selectedBookingId).subscribe({
            next: (response: any) => {
                if (response && response.exists) {
                    this.alertService.warning(response.message || 'Feedback already exists for this booking.');
                    this.closeModal();
                    return;
                } else {
                    // Proceed with submitting feedback
                    this.submitFeedbackNow();
                }
            },
            error: (err) => {
                console.error('Error checking if feedback exists:', err);
                // Proceed anyway, the server will validate again
                this.submitFeedbackNow();
            }
        });
    }

    /**
     * Actually submit the feedback after validation
     */
    private submitFeedbackNow(): void {
        if (!this.selectedBookingId) return;

        // إعداد كائن الملاحظات
        const feedback = {
            bookingId: this.selectedBookingId,
            rating: this.feedbackData.rating,
            comment: this.feedbackData.comment
        };

        console.log('Submitting feedback data:', feedback);

        this.api.submitFeedback(feedback).subscribe({
            next: (response: any) => {
                console.log('Feedback submission successful:', response);
                this.alertService.success(response.message || 'Feedback submitted successfully');
                this.closeModal();
                // Refresh booking history to update UI
                this.loadBookingHistory();
            },
            error: (err) => {
                console.error('Error submitting feedback:', err);

                // تسجيل تفاصيل أكثر عن الخطأ
                console.error('Error status:', err.status);
                console.error('Error message:', err.message);
                console.error('Error details:', err.error);

                // عرض رسالة خطأ تفصيلية للمستخدم
                if (err.error && err.error.message) {
                    this.alertService.error(err.error.message);
                } else if (err.status === 0) {
                    this.alertService.error('Cannot connect to the server. Please check your internet connection.');
                } else if (err.status === 400) {
                    this.alertService.error('The booking status may not be eligible for feedback or feedback already exists.');
                } else if (err.status === 404) {
                    this.alertService.error('Booking not found.');
                } else {
                    this.alertService.error('Failed to submit feedback. Please try again.');
                }
            }
        });
    }

    /**
     * Toggle booking history section visibility
     */
    toggleBookingHistory(): void {
        this.showBookingHistory = !this.showBookingHistory;
    }

    /**
     * Cancel a booking
     */
    cancelBooking(bookingId: number): void {
        this.alertService.confirm('Are you sure you want to cancel this booking?').then(confirmed => {
            if (confirmed) {
                this.api.cancelBooking(bookingId).subscribe({
                    next: (response) => {
                        this.alertService.success('Booking cancelled successfully');
                        // Refresh booking history
                        this.loadBookingHistory();
                    },
                    error: (error) => {
                        console.error('Error cancelling booking:', error);

                        // Check for specific error messages
                        if (error.status === 404) {
                            this.alertService.error('Booking not found or already cancelled.');
                        } else if (error.status === 400) {
                            this.alertService.error('Cannot cancel this booking. It may be completed or already cancelled.');
                        } else {
                            this.alertService.error('Failed to cancel booking. Please try again later.');
                        }
                    }
                });
            }
        });
    }
}
