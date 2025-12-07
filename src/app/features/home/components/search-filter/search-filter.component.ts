import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarsService } from '../../../cars/services/cars.service';

export interface SearchFilters {
  searchTerm: string;
  brand: string;
  type: string;
  minPrice: number | null;
  maxPrice: number | null;
}

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.css'
})
export class SearchFilterComponent {
  searchTerm = '';
  selectedBrand = '';
  selectedType = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  brands = ['Ford', 'Chevrolet', 'Porsche', 'Dodge', 'Shelby', 'BMW', 'Mercedes', 'Ferrari', 'Jaguar', 'Rolls-Royce'];
  types = ['Antique', 'Classic', 'Sport', 'Luxury', 'Muscle', 'Vintage'];

  constructor(
    private carsService: CarsService,
    private router: Router
  ) {}

  onSearch() {
    const filters: SearchFilters = {
      searchTerm: this.searchTerm,
      brand: this.selectedBrand,
      type: this.selectedType,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    };
    
    // Search cars using the service
    this.carsService.searchCars({
      searchTerm: filters.searchTerm || undefined,
      brand: filters.brand || undefined,
      type: filters.type || undefined,
      minPrice: filters.minPrice || undefined,
      maxPrice: filters.maxPrice || undefined
    }).subscribe({
      next: (cars) => {
        console.log('Search results:', cars);
        // Navigate to cars list with results or pass data via service/state
        this.router.navigate(['/cars'], { 
          queryParams: {
            search: filters.searchTerm,
            brand: filters.brand,
            type: filters.type,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice
          }
        });
      },
      error: (error) => {
        console.error('Search error:', error);
      }
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedBrand = '';
    this.selectedType = '';
    this.minPrice = null;
    this.maxPrice = null;
  }
}

