import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number;
  image: string;
  location?: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Jean Dupont',
      comment: 'Service exceptionnel ! J\'ai trouvé la Mustang de mes rêves. L\'équipe est très professionnelle et passionnée.',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Jean+Dupont&background=fbbf24&color=000',
      location: 'Paris, France'
    },
    {
      id: '2',
      name: 'Marie Martin',
      comment: 'Ma Porsche 911 est magnifique. Golden Cars a su répondre à toutes mes attentes avec une attention aux détails remarquable.',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Marie+Martin&background=fbbf24&color=000',
      location: 'Lyon, France'
    },
    {
      id: '3',
      name: 'Pierre Dubois',
      comment: 'Collectionneur depuis 20 ans, je recommande vivement Golden Cars. Leur expertise est incomparable.',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Pierre+Dubois&background=fbbf24&color=000',
      location: 'Marseille, France'
    },
    {
      id: '4',
      name: 'Sophie Bernard',
      comment: 'Mon Camaro 1970 est parfait. Un achat en toute confiance grâce à leur transparence et leur professionnalisme.',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Sophie+Bernard&background=fbbf24&color=000',
      location: 'Toulouse, France'
    }
  ];
}

