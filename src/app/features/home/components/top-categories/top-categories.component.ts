import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-top-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './top-categories.component.html',
  styleUrl: './top-categories.component.css'
})
export class TopCategoriesComponent {
  categories: Category[] = [
    {
      id: '1',
      name: 'Antique',
      image: 'assets/carousel/mustang.jpg',
      description: 'Voitures de collection avant 1950'
    },
    {
      id: '2',
      name: 'Classic',
      image: 'assets/carousel/camaro.jpg',
      description: 'Classiques des années 50-70'
    },
    {
      id: '3',
      name: 'Sport',
      image: 'assets/carousel/porsche.jpg',
      description: 'Voitures de sport légendaires'
    },
    {
      id: '4',
      name: 'Luxury',
      image: 'assets/carousel/shelby.jpg',
      description: 'Luxe et élégance intemporelle'
    }
  ];

  constructor(private router: Router) {}

  viewCategory(category: Category) {
    this.router.navigate(['/categories']);
  }
}

