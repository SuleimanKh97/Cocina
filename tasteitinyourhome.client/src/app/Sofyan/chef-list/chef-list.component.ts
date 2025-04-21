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
  loading = true;
  loadingCategories = true;
  error = '';
  categoryError = '';

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
    this.loadingCategories = true;
    this.categoryError = '';

    this.chefService.getAllFoodCategories().subscribe({
      next: (data) => {
        this.foodCategories = data;
        this.loadingCategories = false;
        console.log('Food categories loaded:', data);
      },
      error: (err) => {
        console.error('Error loading food categories:', err);
        this.categoryError = 'Failed to load food categories. Using default categories instead.';
        this.loadingCategories = false;

        // Set fallback categories
        this.foodCategories = [
          { id: 1, name: 'Italian', description: 'Italian cuisine' },
          { id: 2, name: 'Asian', description: 'Asian cuisine' },
          { id: 3, name: 'Mediterranean', description: 'Mediterranean cuisine' },
          { id: 4, name: 'Mexican', description: 'Mexican cuisine' },
          { id: 5, name: 'Middle Eastern', description: 'Middle Eastern cuisine' }
        ];
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

        // Add mock food categories to chefs for demo purposes if they don't have any
        this.chefs = this.chefs.map(chef => {
          if (!chef.foodCategories || chef.foodCategories.length === 0) {
            // Assign 1-3 random categories to each chef
            const numCategories = Math.floor(Math.random() * 3) + 1;
            const categories: number[] = [];

            for (let i = 0; i < numCategories; i++) {
              const categoryId = Math.floor(Math.random() * 5) + 1; // Random category ID between 1-5
              if (!categories.includes(categoryId)) {
                categories.push(categoryId);
              }
            }

            return { ...chef, foodCategories: categories };
          }
          return chef;
        });

        this.applyFilter();
        console.log('Chefs loaded:', this.chefs);
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
    console.log('Category changed to:', categoryId);
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
    if (this.totalPages === 0) this.totalPages = 1; // At least one page even if empty
  }

  /**
   * Update the paginated chefs array based on current page
   */
  updatePaginatedChefs(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize - 1, this.filteredChefs.length - 1);

    if (startIndex <= endIndex) {
      this.paginatedChefs = this.filteredChefs.slice(startIndex, endIndex + 1);
    } else {
      this.paginatedChefs = [];
    }
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
