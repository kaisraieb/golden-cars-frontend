import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarsService } from '../../../cars/services/cars.service';
import { FavoritesCartService } from '../../../../core/services/favorites-cart.service';
import { Car } from '../../../cars/models/car.model';

@Component({
  selector: 'app-special-offers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './special-offers.component.html',
  styleUrl: './special-offers.component.css'
})
export class SpecialOffersComponent implements OnInit {
  offers: Car[] = [];
  loading = true;

  constructor(
    private carsService: CarsService,
    private favoritesCartService: FavoritesCartService
  ) {}

  ngOnInit() {
    this.loadOffers();
  }

  loadOffers() {
    this.loading = true;
    this.carsService.getCarsWithDiscount().subscribe({
      next: (cars) => {
        this.offers = cars.slice(0, 3); // Limit to 3 offers
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading offers:', error);
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

