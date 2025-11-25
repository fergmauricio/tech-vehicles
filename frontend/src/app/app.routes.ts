import { Routes } from '@angular/router';
import { VehiclesList } from './vehicles/vehicles-list/vehicles-list';

export const routes: Routes = [
  { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
  { path: 'vehicles', component: VehiclesList },
];
