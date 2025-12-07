import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.loadUserFromStorage());
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  get isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  constructor() {
    // Load user from storage on init
    const user = this.loadUserFromStorage();
    if (user) {
      this.currentUserSubject.next(user);
    }
  }

  login(email: string, password: string): Observable<boolean> {
    // Simulate API call
    return of(true).pipe(
      delay(500),
      map(() => {
        // In a real app, this would be an API call
        // For demo purposes, we'll check localStorage for existing users
        const users = this.getUsersFromStorage();
        const user = users.find(u => u.email === email);
        
        if (user) {
          // In a real app, verify password here
          this.currentUserSubject.next(user);
          this.saveUserToStorage(user);
          return true;
        }
        return false;
      })
    );
  }

  signup(data: SignupData): Observable<boolean> {
    // Simulate API call
    return of(true).pipe(
      delay(500),
      map(() => {
        const users = this.getUsersFromStorage();
        
        // Check if user already exists
        if (users.some(u => u.email === data.email)) {
          return false;
        }

        // Create new user
        const newUser: User = {
          id: `user-${Date.now()}`,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
        };

        // Save user
        users.push(newUser);
        this.saveUsersToStorage(users);
        
        // Auto-login
        this.currentUserSubject.next(newUser);
        this.saveUserToStorage(newUser);
        
        return true;
      })
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  private loadUserFromStorage(): User | null {
    try {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }

  private saveUserToStorage(user: User): void {
    try {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  }

  private getUsersFromStorage(): User[] {
    try {
      const users = localStorage.getItem('users');
      return users ? JSON.parse(users) : [];
    } catch {
      return [];
    }
  }

  private saveUsersToStorage(users: User[]): void {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users to storage:', error);
    }
  }
}

