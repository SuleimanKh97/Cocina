import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor() { }

    /**
     * Display a success message with SweetAlert
     */
    success(message: string, title: string = 'Success'): void {
        Swal.fire({
            title: title,
            text: message,
            icon: 'success',
            confirmButtonColor: '#C5705D',
            confirmButtonText: 'OK'
        });
    }

    /**
     * Display an error message with SweetAlert
     */
    error(message: string, title: string = 'Error'): void {
        Swal.fire({
            title: title,
            text: message,
            icon: 'error',
            confirmButtonColor: '#C5705D',
            confirmButtonText: 'OK'
        });
    }

    /**
     * Display a warning message with SweetAlert
     */
    warning(message: string, title: string = 'Warning'): void {
        Swal.fire({
            title: title,
            text: message,
            icon: 'warning',
            confirmButtonColor: '#C5705D',
            confirmButtonText: 'OK'
        });
    }

    /**
     * Display an information message with SweetAlert
     */
    info(message: string, title: string = 'Information'): void {
        Swal.fire({
            title: title,
            text: message,
            icon: 'info',
            confirmButtonColor: '#C5705D',
            confirmButtonText: 'OK'
        });
    }

    /**
     * Display a confirmation dialog with SweetAlert
     * Returns a Promise that resolves to true if confirmed, false otherwise
     */
    confirm(message: string, title: string = 'Are you sure?', confirmText: string = 'Yes', cancelText: string = 'No'): Promise<boolean> {
        return Swal.fire({
            title: title,
            text: message,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#C5705D',
            cancelButtonColor: '#6c757d',
            confirmButtonText: confirmText,
            cancelButtonText: cancelText
        }).then((result) => {
            return result.isConfirmed;
        });
    }
} 