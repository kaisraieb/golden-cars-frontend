import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../../core/services/admin.service';
import { CarsService } from '../../../cars/services/cars.service';
import { Car } from '../../../cars/models/car.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  cars: Car[] = [];
  loading = true;
  stats = {
    totalCars: 0,
    totalValue: 0,
    featuredCars: 0,
    onSale: 0
  };

  constructor(
    public adminService: AdminService,
    private carsService: CarsService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.adminService.isAuthenticated) {
      this.router.navigate(['/admin/login']);
      return;
    }

    this.loadCars();
  }

  loadCars() {
    this.loading = true;
    this.carsService.getAllCars().subscribe({
      next: (cars) => {
        this.cars = cars;
        this.calculateStats();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading cars:', err);
        this.loading = false;
      }
    });
  }

  deleteCar(id: string) {
    this.carsService.deleteCar(id).subscribe({
      next: () => {
        this.loadCars();
      },
      error: (err) => {
        console.error('Error deleting car:', err);
      }
    });
    this.loadCars();
  }

  calculateStats() {
    this.stats.totalCars = this.cars.length;
    this.stats.totalValue = this.cars.reduce((sum, car) => sum + car.price, 0);
    this.stats.featuredCars = this.cars.filter(car => car.featured).length;
    this.stats.onSale = this.cars.filter(car => car.discount && car.discount > 0).length;
  }

  logout() {
    this.adminService.logout();
    this.router.navigate(['/admin/login']);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  }
}

