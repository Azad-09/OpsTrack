import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UserComponent } from './pages/components/user/user.component';
import { authGuard } from './core/guards/auth.guard';
import { AdminComponent } from './pages/components/admin/admin.component';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent, canActivate: [authGuard] },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard, roleGuard('ADMIN')],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
