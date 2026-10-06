import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { BookingPageComponent } from './booking-page.component';
import { MyBookingsPageComponent } from './my-bookings-page.component';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'agendamento', component: BookingPageComponent, canActivate: [authGuard] },
  { path: 'meus-agendamentos', component: MyBookingsPageComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
