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

  ngOnInit() {
    this.userId = (sessionStorage.getItem('userId'));

        this.loadUserData();
        this.loadBookingHistory();
        //sessionStorage.setItem('userId', "8");//this line is only for testing 


    }

    user: any = {};
    bookingHistory: any[] = [];
    showChangePasswordForm = false;
    passwordData = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    };
    passwordError = '';

    loadUserData(): void {
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
}
