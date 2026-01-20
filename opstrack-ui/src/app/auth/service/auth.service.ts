import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserStorageService } from '../../core/storage/browser-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private storage = inject(BrowserStorageService);

  private apiUrl = 'http://localhost:9090/auth';

  login(email: string, password: string): Observable<string> {
    return this.http.post(
      `${this.apiUrl}/login`,
      { email, password },
      { responseType: 'text' },
    );
  }

  saveToken(token: string): void {
    this.storage.set('token', token);
  }

  getToken(): string | null {
    return this.storage.get('token');
  }

  logout(): void {
    this.storage.remove('token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));

    return payload.role || null;
  }
}
