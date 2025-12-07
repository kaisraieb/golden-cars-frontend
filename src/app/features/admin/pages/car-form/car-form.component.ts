import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../../core/services/admin.service';
import { CarsService } from '../../../cars/services/cars.service';
import { Car } from '../../../cars/models/car.model';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.css'
})
export class CarFormComponent implements OnInit {
  car: Car = {
    id: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    description: '',
    imageUrl: '',
    type: '',
    category: '',
    engine: '',
    maxSpeed: '',
    fuelType: '',
    transmission: '',
    mileage: 0,
    color: '',
    featured: false
  };

  isEditMode = false;
  loading = false;

  brands = ['Ford', 'Chevrolet', 'Porsche', 'Dodge', 'Shelby', 'BMW', 'Mercedes', 'Ferrari', 'Aston Martin', 'Jaguar'];
  types = ['Sedan', 'SUV', 'Coupe', 'Convertible', 'Hatchback', 'Wagon'];
  categories = ['Antique', 'Classic', 'Sport', 'Luxury', 'Muscle', 'Vintage'];
  fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];
  transmissions = ['Manual', 'Automatic', 'Semi-Automatic'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private carsService: CarsService
  ) {}

  ngOnInit() {
    if (!this.adminService.isAuthenticated) {
      this.router.navigate(['/admin/login']);
      return;
    }

    const carId = this.route.snapshot.paramMap.get('id');
    if (carId && carId !== 'new') {
      this.isEditMode = true;
      this.loadCar(carId);
    }
  }

  loadCar(id: string) {
    this.loading = true;
    this.carsService.getCarById(id).subscribe({
      next: (car) => {
        this.car = car;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading car:', err);
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (!this.isFormValid()) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    this.loading = true;

    if (this.isEditMode) {
      this.carsService.updateCar(this.car.id, this.car).subscribe({
        next: () => {
          this.router.navigate(['/admin/dashboard']);
        },
        error: (err) => {
          console.error('Error updating car:', err);
          alert('Erreur lors de la mise à jour');
          this.loading = false;
        }
      });
    } else {
      this.car.id = `car-${Date.now()}`;
      this.carsService.createCar(this.car).subscribe({
        next: () => {
          this.router.navigate(['/admin/dashboard']);
        },
        error: (err) => {
          console.error('Error adding car:', err);
          alert('Erreur lors de l\'ajout');
          this.loading = false;
        }
      });
    }
  }

  isFormValid(): boolean {
    return !!(
      this.car.brand &&
      this.car.model &&
      this.car.year &&
      this.car.price &&
      this.car.description &&
      this.car.imageUrl &&
      this.car.category &&
      this.car.type
    );
  }
}

