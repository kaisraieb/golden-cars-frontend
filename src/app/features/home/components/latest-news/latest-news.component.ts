import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  category: string;
}

@Component({
  selector: 'app-latest-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './latest-news.component.html',
  styleUrl: './latest-news.component.css'
})
export class LatestNewsComponent {
  articles: NewsArticle[] = [
    {
      id: '1',
      title: 'Les 10 Mustang les plus rares de l\'histoire',
      date: '15 Janvier 2024',
      image: 'assets/carousel/mustang.jpg',
      excerpt: 'Découvrez les modèles de Mustang les plus recherchés par les collectionneurs...',
      category: 'Classic'
    },
    {
      id: '2',
      title: 'Guide d\'entretien pour voitures anciennes',
      date: '10 Janvier 2024',
      image: 'assets/carousel/camaro.jpg',
      excerpt: 'Conseils d\'experts pour maintenir votre voiture de collection en parfait état...',
      category: 'Conseils'
    },
    {
      id: '3',
      title: 'L\'histoire de la Porsche 911',
      date: '5 Janvier 2024',
      image: 'assets/carousel/porsche.jpg',
      excerpt: 'Plongez dans l\'histoire fascinante de cette icône automobile allemande...',
      category: 'Histoire'
    }
  ];
}

