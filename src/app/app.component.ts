import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./shared/components/navbar/navbar.component";
import { AuthService } from './core/services/auth.service';
import { AdminService } from './core/services/admin.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'golden-cars-frontend';

  constructor(private authService: AuthService, private adminService: AdminService) {}

  get isAdmin(): boolean {
    return this.adminService.isAuthenticated;
  }

  get isUser(): boolean {
    return this.authService.isAuthenticated;
  }

}
