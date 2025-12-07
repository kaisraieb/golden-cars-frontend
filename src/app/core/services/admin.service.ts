import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface Admin {
  id: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private currentAdminSubject = new BehaviorSubject<Admin | null>(this.loadAdminFromStorage());
  currentAdmin$: Observable<Admin | null> = this.currentAdminSubject.asObservable();

  get isAuthenticated(): boolean {
    return this.currentAdminSubject.value !== null;
  }

  get currentAdmin(): Admin | null {
    return this.currentAdminSubject.value;
  }

  constructor() {
    const admin = this.loadAdminFromStorage();
    if (admin) {
      this.currentAdminSubject.next(admin);
    }
  }

  login(username: string, password: string): Observable<boolean> {
    // Simulate API call
    return of(true).pipe(
      delay(500),
      map(() => {
        // Default admin credentials (in production, this would be an API call)
        if (username === 'admin' && password === 'admin123') {
          const admin: Admin = {
            id: 'admin-1',
            username: 'admin',
            email: 'admin@goldencars.fr'
          };
          this.currentAdminSubject.next(admin);
          this.saveAdminToStorage(admin);
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    this.currentAdminSubject.next(null);
    localStorage.removeItem('admin');
  }

  private loadAdminFromStorage(): Admin | null {
    try {
      const admin = localStorage.getItem('admin');
      return admin ? JSON.parse(admin) : null;
    } catch {
      return null;
    }
  }

  private saveAdminToStorage(admin: Admin): void {
    try {
      localStorage.setItem('admin', JSON.stringify(admin));
    } catch (error) {
      console.error('Error saving admin to storage:', error);
    }
  }
}

