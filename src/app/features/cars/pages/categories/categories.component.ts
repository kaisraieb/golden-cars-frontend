import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CarsService } from '../../services/cars.service';
import { Car } from '../../models/car.model';

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  count?: number;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [
    {
      id: 'antique',
      name: 'Antique',
      image: 'assets/carousel/mustang.jpg',
      description: 'Voitures de collection avant 1950',
      count: 0
    },
    {
      id: 'classic',
      name: 'Classic',
      image: 'assets/carousel/camaro.jpg',
      description: 'Classiques des années 50-70',
      count: 0
    },
    {
      id: 'sport',
      name: 'Sport',
      image: 'assets/carousel/porsche.jpg',
      description: 'Voitures de sport légendaires',
      count: 0
    },
    {
      id: 'luxury',
      name: 'Luxury',
      image: 'assets/carousel/shelby.jpg',
      description: 'Luxe et élégance intemporelle',
      count: 0
    }
  ];

  constructor(
    private carsService: CarsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCategoryCounts();
  }

  loadCategoryCounts() {
    this.categories.forEach(category => {
      this.carsService.getCarsByCategory(category.name).subscribe({
        next: (cars) => {
          category.count = cars.length;
        }
      });
    });
  }

  viewCategory(category: Category) {
    this.router.navigate(['/cars'], {
      queryParams: { category: category.name }
    });
  }
}

