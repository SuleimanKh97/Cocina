import { Component, OnInit } from '@angular/core';
import { ChefService, Chef, FoodCategory } from '../Sevice/chef.service';

@Component({
  selector: 'app-chef-list',
  standalone: false,
  templateUrl: './chef-list.component.html',
  styleUrl: './chef-list.component.css'
})
export class ChefListComponent implements OnInit {
  chefs: Chef[] = [];
  filteredChefs: Chef[] = []; // Chefs filtered by food category
  paginatedChefs: Chef[] = [];
  foodCategories: FoodCategory[] = [];
  selectedCategoryId: number | null = null;
  loading = false;
  error = '';
  
  // Pagination properties
  currentPage = 1;
  pageSize = 9; // 9 chefs per page
  totalPages = 1;

  constructor(private chefService: ChefService) { }

  ngOnInit(): void {
    this.loadFoodCategories();
    this.loadChefs();
  }

  /**
   * Load all food categories from the API
   */
  loadFoodCategories(): void {
    this.chefService.getAllFoodCategories().subscribe({
      next: (data) => {
        this.foodCategories = data;
        console.log('Food categories loaded:', data);
      },
      error: (err) => {
        console.error('Error loading food categories:', err);
      }
    });
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
        this.applyFilter();
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
   * Apply filter by food category
   */
  applyFilter(): void {
    this.filteredChefs = this.chefService.filterChefsByFoodCategory(this.chefs, this.selectedCategoryId);
    this.currentPage = 1; // Reset to first page
    this.calculateTotalPages();
    this.updatePaginatedChefs();
    this.loading = false;
  }

  /**
   * Handle category filter change
   * @param categoryId The selected food category ID
   */
  onCategoryChange(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.applyFilter();
  }

  /**
   * Get the name of the selected food category
   * @returns The name of the selected category or empty string
   */
  getSelectedCategoryName(): string {
    if (!this.selectedCategoryId) return '';
    const category = this.foodCategories.find(c => c.id === this.selectedCategoryId);
    return category ? category.name : '';
  }

  /**
   * Calculate total number of pages based on the page size
   */
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredChefs.length / this.pageSize);
  }

  /**
   * Update the paginated chefs array based on current page
   */
  updatePaginatedChefs(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize - 1, this.filteredChefs.length - 1);
    this.paginatedChefs = this.filteredChefs.slice(startIndex, endIndex + 1);
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
