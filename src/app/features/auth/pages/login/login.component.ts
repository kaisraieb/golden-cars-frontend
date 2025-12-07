import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.error = 'Veuillez remplir tous les champs';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.router.navigate(['/']);
        } else {
          this.error = 'Email ou mot de passe incorrect';
          this.loading = false;
        }
      },
      error: (err: any) => {
        this.error = 'Une erreur est survenue. Veuillez réessayer.';
        this.loading = false;
        console.error('Login error:', err);
      }
    });
  }
}

