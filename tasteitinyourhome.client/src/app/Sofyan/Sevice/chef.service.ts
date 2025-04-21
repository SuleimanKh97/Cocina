import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

export interface Chef {
  id: number;
  fullName: string;
  bio?: string;
  experienceYears?: number;
  email?: string;
  phoneNumber?: string;
  availabilitySchedule?: string;
  imageUrl?: string;
  createdAt?: Date;
  foodCategories?: number[]; // IDs of food categories the chef specializes in
}

export interface FoodCategory {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChefService {
  private baseUrl = 'https://localhost:7132/api';

  // Sample chef image URLs
  private chefImages: string[] = [
    'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=600',
    'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600',
    'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=600',
    'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?q=80&w=600',
    'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600',
    'https://images.unsplash.com/photo-1607631568010-a87245c0dbd6?q=80&w=600',
    'https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?q=80&w=600',
    'https://images.unsplash.com/photo-1595273670150-bd0c3c392c46?q=80&w=600',
    'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=600'
  ];

  constructor(private http: HttpClient) { }

  /**
   * Get all chefs from the API
   * @returns Observable with list of chefs
   */
  getAllChefs(): Observable<Chef[]> {
    return this.http.get<Chef[]>(`${this.baseUrl}/Chefs/ShowAllChefs`).pipe(
      map(chefs => {
        // Add images to chefs that don't have one
        return chefs.map((chef, index) => ({
          ...chef,
          imageUrl: chef.imageUrl || this.chefImages[index % this.chefImages.length]
        }));
      }),
      catchError(error => {
        console.error('Error fetching chefs:', error);
        return of([]);
      })
    );
  }

  /**
   * Get all food categories
   * @returns Observable with list of food categories
   */
  getAllFoodCategories(): Observable<FoodCategory[]> {
    // Try multiple endpoints if the first one fails
    return this.http.get<FoodCategory[]>(`${this.baseUrl}/FoodCategories`).pipe(
      catchError(error => {
        console.warn('Error fetching from /FoodCategories, trying alternate endpoint', error);
        return this.http.get<FoodCategory[]>(`${this.baseUrl}/Ammar/GetAllCategory`).pipe(
          catchError(err => {
            console.warn('Error fetching from alternate endpoint, trying another', err);
            return this.http.get<FoodCategory[]>(`${this.baseUrl}/Sajeda/getCategory`).pipe(
              catchError(finalError => {
                console.error('All category endpoints failed:', finalError);

                // Return fallback categories if all API calls fail
                return of(this.getFallbackCategories());
              })
            );
          })
        );
      })
    );
  }

  /**
   * Provide fallback categories when API fails
   */
  private getFallbackCategories(): FoodCategory[] {
    return [
      { id: 1, name: 'Italian', description: 'Italian cuisine' },
      { id: 2, name: 'Asian', description: 'Asian cuisine' },
      { id: 3, name: 'Mediterranean', description: 'Mediterranean cuisine' },
      { id: 4, name: 'Mexican', description: 'Mexican cuisine' },
      { id: 5, name: 'Middle Eastern', description: 'Middle Eastern cuisine' }
    ];
  }

  /**
   * Filter chefs by food category
   * @param chefs List of all chefs
   * @param categoryId Food category ID to filter by
   * @returns Filtered list of chefs
   */
  filterChefsByFoodCategory(chefs: Chef[], categoryId: number | null): Chef[] {
    if (!categoryId) {
      return chefs;
    }

    // Add logging to debug the filtering
    console.log('Filtering chefs by category ID:', categoryId);
    console.log('Chefs before filtering:', chefs.length);

    const filtered = chefs.filter(chef =>
      chef.foodCategories?.includes(categoryId)
    );

    console.log('Chefs after filtering:', filtered.length);
    return filtered;
  }

  /**
   * Get chef details by ID
   * @param id Chef ID
   * @returns Observable with chef details
   */
  getChefById(id: number): Observable<Chef> {
    return this.http.get<Chef>(`${this.baseUrl}/Chefs/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching chef with ID ${id}:`, error);
        return of({} as Chef);
      })
    );
  }
}
