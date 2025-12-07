import { Component, OnInit, OnDestroy } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf} from "@angular/common";
import { CommonModule } from '@angular/common';
import { FavoritesCartService } from '../../../core/services/favorites-cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  isMobileopen = false;
  darkMode = false;
  favoritesCount = 0;
  cartCount = 0;
  private subscriptions = new Subscription();

  constructor(
    private favoritesCartService: FavoritesCartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const savedTheme = localStorage.getItem('darkMode');
    this.darkMode = savedTheme === 'true';
    this.updateHtmlClass();

    // Subscribe to authentication state
    this.subscriptions.add(
      this.authService.currentUser$.subscribe(user => {
        this.isAuthenticated = !!user;
      })
    );

    // Subscribe to favorites and cart counts
    this.subscriptions.add(
      this.favoritesCartService.favorites$.subscribe(favorites => {
        this.favoritesCount = favorites.length;
      })
    );

    this.subscriptions.add(
      this.favoritesCartService.cart$.subscribe(cart => {
        this.cartCount = cart.length;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', String(this.darkMode));
    this.updateHtmlClass();
  }

  toggleMobileMenu() {
    this.isMobileopen = !this.isMobileopen;
  }

  private updateHtmlClass() {
    const html = document.documentElement;
    if (this.darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
}
