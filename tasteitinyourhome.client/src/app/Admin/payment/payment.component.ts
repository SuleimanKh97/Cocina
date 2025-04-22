import { Component, OnInit, OnDestroy } from '@angular/core';
import { SaraService } from '../../Sarah/sara.service';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit, OnDestroy {
  // Data
  payments: any[] = [];
  filteredPayments: any[] = [];
  selectedPayment: any = null;
  refreshInterval: any;

  // Filters
  searchTerm: string = '';

  constructor(private saraService: SaraService) { }

  ngOnInit(): void {
    this.loadPayments();
    this.setupAutoRefresh();
  }

  ngOnDestroy(): void {
    this.clearRefreshInterval();
  }

  loadPayments(): void {
    this.saraService.getAllPayments().subscribe({
      next: (data: any) => {
        this.payments = data;
        this.filteredPayments = [...this.payments];
        console.log('Payments loaded:', this.payments);
      },
      error: (error: any) => {
        console.error('Error loading payments:', error);
      }
    });
  }

  refreshData(): void {
    console.log('Refreshing payment data...');
    this.loadPayments();
  }

  setupAutoRefresh(): void {
    // Auto refresh every 30 seconds
    this.refreshInterval = setInterval(() => {
      this.refreshData();
    }, 30000);
  }

  clearRefreshInterval(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  filterPayments(): void {
    if (!this.searchTerm.trim()) {
      this.filteredPayments = [...this.payments];
      return;
    }

    const search = this.searchTerm.toLowerCase().trim();
    this.filteredPayments = this.payments.filter(payment => {
      return (
        (payment.userName && payment.userName.toLowerCase().includes(search)) ||
        (payment.serviceName && payment.serviceName.toLowerCase().includes(search)) ||
        (payment.id && payment.id.toString().includes(search)) ||
        (payment.amount && payment.amount.toString().includes(search)) ||
        (payment.status && payment.status.toLowerCase().includes(search)) ||
        (payment.paymentMethod && payment.paymentMethod.toLowerCase().includes(search))
      );
    });
  }

  viewPaymentDetails(payment: any): void {
    this.selectedPayment = payment;
    // Use Bootstrap 5 modal
    const modal = new bootstrap.Modal(document.getElementById('paymentDetailModal'));
    modal.show();
  }

  approvePayment(paymentId: number): void {
    // Find the related booking ID
    const payment = this.payments.find(p => p.id === paymentId);
    if (!payment) return;

    // Using booking ID from payment object or if unavailable, using the payment ID
    const bookingId = payment.bookingId || paymentId;

    this.saraService.acceptBooking(bookingId).subscribe({
      next: () => {
        console.log('Payment approved successfully');
        // Update the payment status in the UI
        payment.status = 'Completed';
        // Refresh the data to ensure everything is up to date
        this.refreshData();
      },
      error: (error: any) => {
        console.error('Error approving payment:', error);
      }
    });
  }

  exportPaymentsCSV(): void {
    // Create CSV content
    const headers = ['ID', 'Customer', 'Service', 'Amount', 'Method', 'Date', 'Status'];
    const csvRows = [
      headers.join(','),
      ...this.filteredPayments.map(p => [
        p.id,
        this.escapeCsvValue(p.userName || 'N/A'),
        this.escapeCsvValue(p.serviceName || 'N/A'),
        p.amount,
        this.escapeCsvValue(p.paymentMethod || 'Unknown'),
        this.formatDateForCsv(p.paymentDate),
        this.escapeCsvValue(p.status || 'Unknown')
      ].join(','))
    ];
    const csvContent = csvRows.join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `payments-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private escapeCsvValue(value: string): string {
    if (!value) return '';
    // Escape quotes and wrap in quotes if contains comma
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return '"' + value.replace(/"/g, '""') + '"';
    }
    return value;
  }

  private formatDateForCsv(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
  }
}
