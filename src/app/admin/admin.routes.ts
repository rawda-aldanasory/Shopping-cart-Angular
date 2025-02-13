import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ProductListComponent } from './components/product-list/product-list.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: 'products', component: ProductListComponent },
    ]
  }
];