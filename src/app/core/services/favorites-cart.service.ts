import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Car } from '../../features/cars/models/car.model';

export interface Order {
  id: string;
  date: Date;
  items: Car[];
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesCartService {
  private favoritesSubject = new BehaviorSubject<Car[]>(this.loadFromStorage('favorites', []));
  private cartSubject = new BehaviorSubject<Car[]>(this.loadFromStorage('cart', []));
  private ordersSubject = new BehaviorSubject<Order[]>(this.loadFromStorage('orders', []));

  favorites$: Observable<Car[]> = this.favoritesSubject.asObservable();
  cart$: Observable<Car[]> = this.cartSubject.asObservable();
  orders$: Observable<Order[]> = this.ordersSubject.asObservable();

  get favorites(): Car[] {
    return this.favoritesSubject.value;
  }

  get cart(): Car[] {
    return this.cartSubject.value;
  }

  get favoritesCount(): number {
    return this.favorites.length;
  }

  get cartCount(): number {
    return this.cart.length;
  }

  // Favorites methods
  addToFavorites(car: Car): void {
    if (!this.isInFavorites(car.id)) {
      const updated = [...this.favorites, car];
      this.favoritesSubject.next(updated);
      this.saveToStorage('favorites', updated);
    }
  }

  removeFromFavorites(carId: string): void {
    const updated = this.favorites.filter(car => car.id !== carId);
    this.favoritesSubject.next(updated);
    this.saveToStorage('favorites', updated);
  }

  isInFavorites(carId: string): boolean {
    return this.favorites.some(car => car.id === carId);
  }

  toggleFavorite(car: Car): void {
    if (this.isInFavorites(car.id)) {
      this.removeFromFavorites(car.id);
    } else {
      this.addToFavorites(car);
    }
  }

  clearFavorites(): void {
    this.favoritesSubject.next([]);
    this.saveToStorage('favorites', []);
  }

  // Cart methods
  addToCart(car: Car): void {
    if (!this.isInCart(car.id)) {
      const updated = [...this.cart, car];
      this.cartSubject.next(updated);
      this.saveToStorage('cart', updated);
    }
  }

  removeFromCart(carId: string): void {
    const updated = this.cart.filter(car => car.id !== carId);
    this.cartSubject.next(updated);
    this.saveToStorage('cart', updated);
  }

  isInCart(carId: string): boolean {
    return this.cart.some(car => car.id === carId);
  }

  toggleCart(car: Car): void {
    if (this.isInCart(car.id)) {
      this.removeFromCart(car.id);
    } else {
      this.addToCart(car);
    }
  }

  clearCart(): void {
    this.cartSubject.next([]);
    this.saveToStorage('cart', []);
  }

  getCartTotal(): number {
    return this.cart.reduce((total, car) => total + car.price, 0);
  }

  // Orders/History methods
  get orders(): Order[] {
    return this.ordersSubject.value;
  }

  addOrder(items: Car[], total: number): void {
    const order: Order = {
      id: `order-${Date.now()}`,
      date: new Date(),
      items: [...items],
      total,
      status: 'completed'
    };
    const updated = [order, ...this.orders];
    this.ordersSubject.next(updated);
    this.saveToStorage('orders', updated);
  }

  getOrders(): Observable<Order[]> {
    return this.orders$;
  }

  // Storage methods
  private loadFromStorage(key: string, defaultValue: any): any {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return defaultValue;
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects for orders
      if (key === 'orders' && Array.isArray(parsed)) {
        return parsed.map((order: any) => ({
          ...order,
          date: new Date(order.date)
        }));
      }
      return parsed;
    } catch {
      return defaultValue;
    }
  }

  private saveToStorage(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
}

