import { Component } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { SearchFilterComponent } from '../../components/search-filter/search-filter.component';
import { FeaturedCarsComponent } from '../../components/featured-cars/featured-cars.component';
import { TopCategoriesComponent } from '../../components/top-categories/top-categories.component';
import { SpecialOffersComponent } from '../../components/special-offers/special-offers.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { LatestNewsComponent } from '../../components/latest-news/latest-news.component';
import { AboutComponent } from '../../components/about/about.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent,
    SearchFilterComponent,
    FeaturedCarsComponent,
    TopCategoriesComponent,
    SpecialOffersComponent,
    TestimonialsComponent,
    LatestNewsComponent,
    AboutComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
