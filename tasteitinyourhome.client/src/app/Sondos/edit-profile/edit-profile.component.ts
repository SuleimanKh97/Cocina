import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-edit-profile',
    standalone: false,
    templateUrl: './edit-profile.component.html',
    styleUrl: './edit-profile.component.css',

})
export class EditProfileComponent {
    userId: number;
    user: any = {};
    profileForm: FormGroup;
    imageFile: File | null = null;
    imagePreview: string | null = null;

    constructor(
        private api: ApiService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder
    ) {
        this.userId = Number(this.route.snapshot.paramMap.get('id')) || Number(sessionStorage.getItem('userId'));

        this.profileForm = this.fb.group({
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', Validators.required],
            address: [''],
            imageUrl: ['']
        });
    }

    ngOnInit(): void {
        this.loadUserData();
    }

    loadUserData(): void {
        this.api.getUserById(this.userId).subscribe(
            (data:any) => {
                this.user = data;
                this.profileForm.patchValue({
                    fullName: this.user.fullName,
                    email: this.user.email,
                    phoneNumber: this.user.phoneNumber,
                    address: this.user.address,
                    imageUrl: this.user.imageUrl
                });
                this.imagePreview = this.user.imageUrl;
            },
            (error : any) => {
                console.error('Error loading user data:', error);
            }
        );
    }

    onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length) {
            this.imageFile = input.files[0];

            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result as string;
                this.profileForm.patchValue({
                    imageUrl: this.imagePreview
                });
            };
            reader.readAsDataURL(this.imageFile);
        }
    }

    onSubmit(profileForm: any): void {


        this.api.updateProfile(profileForm, this.userId).subscribe(() => {
            alert("profile has been updated succssfully");
        })

       
    }



    cancel(): void {
        this.router.navigate(['/profile', this.userId]);
    }
}

