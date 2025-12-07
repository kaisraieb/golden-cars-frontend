import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private apiUrl = 'http://localhost:3000/cars';

  constructor(private http: HttpClient) {}

  // Get all cars
  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  // Get car by ID
  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }

  // Get featured cars
  getFeaturedCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}?featured=true`);
  }

  // Search cars
  searchCars(params: {
    searchTerm?: string;
    brand?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    category?: string;
  }): Observable<Car[]> {
    let httpParams = new HttpParams();
    
    if (params.searchTerm) {
      httpParams = httpParams.set('q', params.searchTerm);
    }
    if (params.brand) {
      httpParams = httpParams.set('brand', params.brand);
    }
    if (params.type) {
      httpParams = httpParams.set('type', params.type);
    }
    if (params.category) {
      httpParams = httpParams.set('category', params.category);
    }
    if (params.minPrice) {
      httpParams = httpParams.set('price_gte', params.minPrice.toString());
    }
    if (params.maxPrice) {
      httpParams = httpParams.set('price_lte', params.maxPrice.toString());
    }

    return this.http.get<Car[]>(this.apiUrl, { params: httpParams });
  }

  // Get cars by category
  getCarsByCategory(category: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}?category=${category}`);
  }

  // Get cars with discount
  getCarsWithDiscount(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}?discount_gte=1`);
  }

  // Create car
  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }

  // Update car
  updateCar(id: string, car: Partial<Car>): Observable<Car> {
    return this.http.patch<Car>(`${this.apiUrl}/${id}`, car);
  }

  // Delete car
  deleteCar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

