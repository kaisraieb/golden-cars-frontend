import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoritesCartService, Order } from '../../../../core/services/favorites-cart.service';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: Car[] = [];
  total = 0;
  orders: Order[] = [];
  showHistory = false;

  constructor(private favoritesCartService: FavoritesCartService) {}

  ngOnInit() {
    this.favoritesCartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.total = this.favoritesCartService.getCartTotal();
    });

    this.favoritesCartService.orders$.subscribe(orders => {
      this.orders = orders;
    });
  }

  removeFromCart(car: Car) {
    this.favoritesCartService.removeFromCart(car.id);
  }

  clearCart() {
    this.favoritesCartService.clearCart();
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  }
}

