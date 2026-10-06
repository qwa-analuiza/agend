import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'camila-nail-studio-auth';

  login(): void {
    localStorage.setItem(this.storageKey, 'true');
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.storageKey) === 'true';
  }
}
