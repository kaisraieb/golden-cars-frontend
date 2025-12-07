import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarsService } from '../../services/cars.service';
import { FavoritesCartService } from '../../../../core/services/favorites-cart.service';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit {
  car: Car | null = null;
  loading = true;
  error = false;
  relatedCars: Car[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carsService: CarsService,
    private favoritesCartService: FavoritesCartService
  ) {}

  ngOnInit() {
    const carId = this.route.snapshot.paramMap.get('id');
    if (carId) {
      this.loadCarDetails(carId);
    } else {
      this.error = true;
      this.loading = false;
    }
  }

  loadCarDetails(id: string) {
    this.loading = true;
    this.carsService.getCarById(id).subscribe({
      next: (car) => {
        this.car = car;
        this.loadRelatedCars(car);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading car details:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  loadRelatedCars(car: Car) {
    // Load cars from same category or brand
    const category = car.category || car.type;
    if (category) {
      this.carsService.getCarsByCategory(category).subscribe({
        next: (cars) => {
          this.relatedCars = cars.filter(c => c.id !== car.id).slice(0, 3);
        }
      });
    }
  }

  toggleFavorite() {
    if (this.car) {
      this.favoritesCartService.toggleFavorite(this.car);
    }
  }

  toggleCart() {
    if (this.car) {
      this.favoritesCartService.toggleCart(this.car);
    }
  }

  isFavorite(): boolean {
    return this.car ? this.favoritesCartService.isInFavorites(this.car.id) : false;
  }

  isInCart(): boolean {
    return this.car ? this.favoritesCartService.isInCart(this.car.id) : false;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  }
}

