import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeService, Service } from '../Services/home.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  services: Service[] = [];
  currentSlide = 0;

  constructor(
    private http: HttpClient,
    private homeService: HomeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchServices();
  }

  fetchServices(): void {
    this.homeService.getAllServices().subscribe({
      next: (data) => {
        this.services = data;
        console.log('Services loaded:', data);
      },
      error: (error) => {
        console.error('Error fetching services:', error);
      }
    });
  }

  prevSlide(): void {
    this.currentSlide = this.currentSlide === 0 ? this.services.length - 1 : this.currentSlide - 1;
  }

  nextSlide(): void {
    this.currentSlide = this.currentSlide === this.services.length - 1 ? 0 : this.currentSlide + 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  navigateToService(serviceId: number): void {
    this.router.navigate(['/service', serviceId]);
  }
}
