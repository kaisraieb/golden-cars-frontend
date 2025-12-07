import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarsService } from '../../../cars/services/cars.service';
import { FavoritesCartService } from '../../../../core/services/favorites-cart.service';
import { Car } from '../../../cars/models/car.model';

@Component({
  selector: 'app-featured-cars',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './featured-cars.component.html',
  styleUrl: './featured-cars.component.css'
})
export class FeaturedCarsComponent implements OnInit {
  featuredCars: Car[] = [];
  loading = true;

  constructor(
    private carsService: CarsService,
    private favoritesCartService: FavoritesCartService
  ) {}

  ngOnInit() {
    this.loadFeaturedCars();
  }

  loadFeaturedCars() {
    this.loading = true;
    this.carsService.getFeaturedCars().subscribe({
      next: (cars) => {
        this.featuredCars = cars.slice(0, 6); // Limit to 6 cars
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading featured cars:', error);
        this.loading = false;
      }
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

