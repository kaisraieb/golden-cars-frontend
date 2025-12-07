import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, style, transition, animate } from '@angular/animations';

export interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  price?: number;
  year?: number;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  animations: [
    trigger('slideTransition', [
      transition('* => next', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('600ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition('* => prev', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('600ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit, OnDestroy {
  carouselItems: CarouselItem[] = [
    {
      id: '1',
      title: '1969 Ford Mustang',
      subtitle: 'Classic American Muscle',
      description: 'Experience the power and elegance of this iconic American classic. Fully restored with original features.',
      image: 'assets/carousel/mustang.jpg',
      price: 85000,
      year: 1969
    },
    {
      id: '2',
      title: '1970 Chevrolet Camaro',
      subtitle: 'Legendary Performance',
      description: 'A true collector\'s dream. This pristine Camaro represents the golden age of American automotive excellence.',
      image: 'assets/carousel/camaro.jpg',
      price: 92000,
      year: 1970
    },
    {
      id: '3',
      title: '1973 Porsche 911',
      subtitle: 'Timeless German Engineering',
      description: 'The epitome of classic sports car design. This beautifully maintained 911 offers an unparalleled driving experience.',
      image: 'assets/carousel/porsche.jpg',
      price: 125000,
      year: 1973
    },
    {
      id: '4',
      title: '1967 Shelby GT500',
      subtitle: 'Racing Heritage',
      description: 'Rare and powerful, this Shelby GT500 is a true piece of automotive history. Perfect for the serious collector.',
      image: 'assets/carousel/shelby.jpg',
      price: 150000,
      year: 1967
    },
    {
      id: '5',
      title: '1971 Dodge Charger',
      subtitle: 'Mighty V8 Power',
      description: 'Bold, powerful, and unmistakable. This Charger embodies the spirit of the muscle car era.',
      image: 'assets/carousel/charger.jpg',
      price: 78000,
      year: 1971
    }
  ];

  currentIndex = 0;
  direction: 'next' | 'prev' = 'next';
  autoPlayInterval: any;
  isAutoPlaying = true;
  touchStartX = 0;
  touchEndX = 0;
  private isTransitioning = false;

  get currentItem(): CarouselItem {
    return this.carouselItems[this.currentIndex];
  }

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    // Always clear any existing interval first to prevent duplicates
    this.stopAutoPlay();
    
    if (this.isAutoPlaying) {
      this.autoPlayInterval = setInterval(() => {
        if (this.isAutoPlaying) {
          this.nextSlide();
        }
      }, 3000); // Change slide every 3 seconds
    }
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  nextSlide() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.direction = 'next';
    this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length;
    if (this.isAutoPlaying) {
      this.restartAutoPlay();
    }
    setTimeout(() => {
      this.isTransitioning = false;
    }, 600);
  }

  prevSlide() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.direction = 'prev';
    this.currentIndex = (this.currentIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
    if (this.isAutoPlaying) {
      this.restartAutoPlay();
    }
    setTimeout(() => {
      this.isTransitioning = false;
    }, 600);
  }

  goToSlide(index: number) {
    if (this.isTransitioning || index === this.currentIndex) return;
    this.isTransitioning = true;
    this.direction = index > this.currentIndex ? 'next' : 'prev';
    this.currentIndex = index;
    if (this.isAutoPlaying) {
      this.restartAutoPlay();
    }
    setTimeout(() => {
      this.isTransitioning = false;
    }, 600);
  }

  restartAutoPlay() {
    this.stopAutoPlay();
    if (this.isAutoPlaying) {
      this.startAutoPlay();
    }
  }

  toggleAutoPlay() {
    this.isAutoPlaying = !this.isAutoPlaying;
    if (this.isAutoPlaying) {
      // Only start if not already running
      if (!this.autoPlayInterval) {
        this.startAutoPlay();
      }
    } else {
      // Force stop when pausing
      this.stopAutoPlay();
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    // Only pause on hover if auto-play is currently active
    // This prevents conflicts with manual pause
    if (this.isAutoPlaying && this.autoPlayInterval) {
      this.stopAutoPlay();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    // Only resume if auto-play should be active and was paused by hover
    if (this.isAutoPlaying && !this.autoPlayInterval) {
      this.startAutoPlay();
    }
  }

  formatPrice(price?: number): string {
    if (!price) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=800&fit=crop';
  }
}

