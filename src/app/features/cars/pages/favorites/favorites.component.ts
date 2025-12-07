import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoritesCartService } from '../../../../core/services/favorites-cart.service';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  favorites: Car[] = [];

  constructor(private favoritesCartService: FavoritesCartService) {}

  ngOnInit() {
    this.favoritesCartService.favorites$.subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  removeFromFavorites(car: Car) {
    this.favoritesCartService.removeFromFavorites(car.id);
  }

  addToCart(car: Car) {
    this.favoritesCartService.addToCart(car);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  }
}

