import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarsService } from '../../services/cars.service';
import { FavoritesCartService } from '../../../../core/services/favorites-cart.service';
import { ComingSoonComponent } from '../../../../shared/components/coming-soon/coming-soon.component';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-cars-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ComingSoonComponent],
  templateUrl: './cars-list.component.html',
  styleUrl: './cars-list.component.css'
})
export class CarsListComponent implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  loading = true;
  
  // Search and filters
  searchTerm = '';
  selectedBrand = '';
  selectedType = '';
  selectedCategory = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  brands: string[] = [];
  types: string[] = ['Antique', 'Classic', 'Sport', 'Luxury', 'Muscle', 'Vintage'];
  categories: string[] = ['Antique', 'Classic', 'Sport', 'Luxury'];

  constructor(
    private carsService: CarsService,
    private favoritesCartService: FavoritesCartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Load query params
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.selectedBrand = params['brand'] || '';
      this.selectedType = params['type'] || '';
      this.selectedCategory = params['category'] || '';
      this.minPrice = params['minPrice'] ? +params['minPrice'] : null;
      this.maxPrice = params['maxPrice'] ? +params['maxPrice'] : null;
      
      this.loadCars();
    });
  }

  loadCars() {
    this.loading = true;
    this.carsService.getAllCars().subscribe({
      next: (cars) => {
        this.cars = cars;
        this.extractBrands(cars);
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading cars:', error);
        this.loading = false;
      }
    });
  }

  extractBrands(cars: Car[]) {
    const uniqueBrands = [...new Set(cars.map(car => car.brand))];
    this.brands = uniqueBrands.sort();
  }

  applyFilters() {
    let filtered = [...this.cars];

    // Search term
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(car =>
        car.brand.toLowerCase().includes(term) ||
        car.model.toLowerCase().includes(term) ||
        car.year.toString().includes(term) ||
        car.description.toLowerCase().includes(term)
      );
    }

    // Brand filter
    if (this.selectedBrand) {
      filtered = filtered.filter(car => car.brand === this.selectedBrand);
    }

    // Type filter
    if (this.selectedType) {
      filtered = filtered.filter(car => car.type === this.selectedType);
    }

    // Category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(car => car.category === this.selectedCategory);
    }

    // Price filters
    if (this.minPrice !== null) {
      filtered = filtered.filter(car => car.price >= this.minPrice!);
    }
    if (this.maxPrice !== null) {
      filtered = filtered.filter(car => car.price <= this.maxPrice!);
    }

    this.filteredCars = filtered;
  }

  onSearch() {
    this.applyFilters();
    this.updateQueryParams();
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedBrand = '';
    this.selectedType = '';
    this.selectedCategory = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.applyFilters();
    this.updateQueryParams();
  }

  updateQueryParams() {
    const params: any = {};
    if (this.searchTerm) params.search = this.searchTerm;
    if (this.selectedBrand) params.brand = this.selectedBrand;
    if (this.selectedType) params.type = this.selectedType;
    if (this.selectedCategory) params.category = this.selectedCategory;
    if (this.minPrice) params.minPrice = this.minPrice;
    if (this.maxPrice) params.maxPrice = this.maxPrice;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params
    });
  }

  toggleFavorite(car: Car) {
    this.favoritesCartService.toggleFavorite(car);
  }

  toggleCart(car: Car) {
    this.favoritesCartService.toggleCart(car);
  }

  isFavorite(carId: string): boolean {
    return this.favoritesCartService.isInFavorites(carId);
  }

  isInCart(carId: string): boolean {
    return this.favoritesCartService.isInCart(carId);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  }
}
