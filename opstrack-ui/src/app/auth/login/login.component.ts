import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (token) => {
        this.authService.saveToken(token);

        setTimeout(() => {
          const role = this.authService.getUserRole();

          if (role === 'ADMIN') {
            this.router.navigateByUrl('/admin');
          } else {
            this.router.navigateByUrl('/user');
          }
        });
      },
      error: () => {
        alert('Invalid credentials');
      },
    });
  }
}
