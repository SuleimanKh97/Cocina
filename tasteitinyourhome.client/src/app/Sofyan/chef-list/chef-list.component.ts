import { Component, OnInit } from '@angular/core';
import { ChefService, Chef } from '../Sevice/chef.service';

@Component({
  selector: 'app-chef-list',
  standalone: false,
  templateUrl: './chef-list.component.html',
  styleUrl: './chef-list.component.css'
})
export class ChefListComponent implements OnInit {
  chefs: Chef[] = [];
  paginatedChefs: Chef[] = [];
  loading = false;
  error = '';
  
  // Pagination properties
  currentPage = 1;
  pageSize = 9; // 9 chefs per page
  totalPages = 1;

  constructor(private chefService: ChefService) { }

  ngOnInit(): void {
    this.loadChefs();
  }

  /**
   * Load all chefs from the API
   */
  loadChefs(): void {
    this.loading = true;
    this.error = '';

    this.chefService.getAllChefs().subscribe({
      next: (data) => {
        this.chefs = data;
        this.calculateTotalPages();
        this.updatePaginatedChefs();
        this.loading = false;
        console.log('Chefs loaded:', data);
      },
      error: (err) => {
        console.error('Error loading chefs:', err);
        this.error = 'Failed to load chefs. Please try again later.';
        this.loading = false;
      }
    });
  }

  /**
   * Calculate total number of pages based on the page size
   */
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.chefs.length / this.pageSize);
  }

  /**
   * Update the paginated chefs array based on current page
   */
  updatePaginatedChefs(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize - 1, this.chefs.length - 1);
    this.paginatedChefs = this.chefs.slice(startIndex, endIndex + 1);
  }

  /**
   * Set the current page
   * @param page Page number to set
   */
  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePaginatedChefs();
    
    // Scroll to top of chefs grid
    const element = document.querySelector('.chefs-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * Get an array of page numbers to display in pagination
   * @returns Array of page numbers
   */
  getPageNumbers(): number[] {
    const pageNumbers: number[] = [];
    
    // Show maximum 5 page numbers
    const maxPages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPages - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  }
}
